import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import asyncHandler from '../middleware/asyncHandler.js';

export const getAllreponse = asyncHandler(async (req, res, next) => {
  const reponses = await prisma.reponse.findMany({
    include: {
      question: true,
      personne: {
        include: {
          beneficiaire: true,
        },
      },
    },
  });
  res.status(200).json(reponses);
});
export const updateReponse = asyncHandler(async (req, res, next) => {
  const { reponses } = req.body;
  const updateReponse = await prisma.reponse.update({
    where: {
      id: req.params.id,
    },
    data: { reponse: reponses },
  });
  res.status(200).json(updateReponse);
});

export const createManyreponse = asyncHandler(async (req, res, next) => {
  const { reponses } = req.body;
  const personneId = reponses[0].personneId; // Prenez le personneId du premier élément, car il devrait être le même pour tous
  const existingResponses = await prisma.reponse.findMany({
    where: {
      personneId: personneId,
    },
  });

  // Créez un ensemble (Set) pour stocker les IDs des questions déjà répondues
  const existingQuestionIds = new Set(
    existingResponses.map((response) => response.questionId)
  );

  // Vérifiez si les nouvelles réponses contiennent des questionIds déjà répondues
  for (const response of reponses) {
    if (existingQuestionIds.has(response.questionId)) {
      // Si la question a déjà été répondu, renvoyez une réponse d'erreur
      return res.status(400).json({
        error: 'La question a déjà été répondu pour cette personne.',
      });
    }
  }

  const tab = [];
  let obj = {};

  reponses.forEach((item) => {
    obj.questionId = item.questionId;
    obj.reponse = item.reponse;
    obj.personneId = item.personneId;
    tab.push(obj);
    obj = {};
  });

  // D'abord, enregistrez les réponses dans la base de données
  const reponseMany = await prisma.reponse.createMany({
    data: [...tab],
  });

  res.status(200).json(reponseMany);
  console.log(reponseMany);

  // Après avoir enregistré les réponses, obtenez l'ID de la personne qui répond
  const idPersonne = tab[0].personneId;
  console.log(idPersonne);

  // Ensuite, calculez la note du bénéficiaire en fonction des réponses
  const totalScore = await calculateBeneficiaryScore(idPersonne);
  console.log(totalScore);

  // Mettez à jour la note du bénéficiaire dans la base de données
  await updateBeneficiaryScore(idPersonne, totalScore);
});

// Fonction pour calculer la note du bénéficiaire en fonction des réponses
// Fonction pour calculer la note du bénéficiaire en fonction des réponses
const calculateBeneficiaryScore = async (personneId) => {
  const findUniquePersonne = await prisma.personne.findUnique({
    where: {
      id: personneId,
    },
    include: {
      beneficiaire: {
        include: {
          note: true, // Inclure la note du bénéficiaire
        },
      },
      reponse: {
        include: {
          question: true,
        },
      },
    },
  });

  let scoreOui = 0;
  let scoreNon = 0;

  findUniquePersonne.reponse.forEach((data) => {
    const question = data.question;

    if (data.reponse === 'oui') {
      scoreOui += question.scoreOui;
    } else if (data.reponse === 'non') {
      scoreNon += question.scoreNon;
    }
  });

  const totalScore = scoreNon + scoreOui;

  // Mettez à jour la note totale du bénéficiaire
  const beneficiaire = findUniquePersonne.beneficiaire;
  const currentTotalScore = beneficiaire.note
    ? beneficiaire.note.value || 0
    : 0; // Vérifier si beneficiaire.note est défini
  const newTotalScore = currentTotalScore + totalScore;

  return newTotalScore;
};

// Fonction pour mettre à jour la note du bénéficiaire
const updateBeneficiaryScore = async (personneId, totalScore) => {
  const findUniquePersonne = await prisma.personne.findUnique({
    where: {
      id: personneId,
    },
    include: {
      beneficiaire: true,
    },
  });

  const idBeneficiaire = findUniquePersonne.beneficiaire.id;

  await prisma.note.upsert({
    where: {
      beneficiaireId: idBeneficiaire,
    },
    update: {
      value: totalScore,
    },
    create: {
      value: totalScore,
      beneficiaireId: idBeneficiaire,
    },
  });
};

export const createMnyreponse = asyncHandler(async (req, res, next) => {
  try {
    const { reponses } = req.body;

    const personneId = reponses[0].personneId; // Prenez le personneId du premier élément, car il devrait être le même pour tous

    // Récupérez la dernière réponse de la personne à partir de la base de données
    const lastResponse = await prisma.reponse.findFirst({
      where: {
        personneId: personneId,
      },
      orderBy: {
        // Tri par timestamp ou date pour obtenir la dernière réponse enregistrée.
        timestamp: 'desc',
      },
    });

    if (lastResponse) {
      // Si une réponse précédente existe pour cette personne,
      // comparez la question de la dernière réponse avec la nouvelle réponse.
      if (lastResponse.questionId !== reponses[0].questionId) {
        // Si la question change, vous pouvez créer la nouvelle réponse.
        const tab = [];
        let obj = {};

        reponses.forEach((item) => {
          obj.questionId = item.questionId;
          obj.reponse = item.reponse;
          obj.personneId = item.personneId;
          tab.push(obj);
          obj = {};
        });

        // Enregistrez les réponses dans la base de données
        const reponseMany = await prisma.reponse.createMany({
          data: [...tab],
        });

        res.status(200).json(reponseMany);
        console.log(reponseMany);

        // Après avoir enregistré les réponses, obtenez l'ID de la personne qui répond
        const idPersonne = tab[0].personneId;
        console.log(idPersonne);

        // Ensuite, calculez la note du bénéficiaire en fonction des réponses
        const totalScore = await calculateBeneficiaryScore(idPersonne);
        console.log(totalScore);

        // Mettez à jour la note du bénéficiaire dans la base de données
        await updateBeneficiaryScore(idPersonne, totalScore);
      } else {
        // Si la question n'a pas changé, vous pouvez renvoyer une réponse d'erreur.
        res.status(400).json({ error: 'La question na pas changé.' });
      }
    } else {
      // Si aucune réponse précédente n'existe pour cette personne, créez simplement la nouvelle réponse.
      const tab = [];
      let obj = {};

      reponses.forEach((item) => {
        obj.questionId = item.questionId;
        obj.reponse = item.reponse;
        obj.personneId = item.personneId;
        tab.push(obj);
        obj = {};
      });

      // Enregistrez les réponses dans la base de données
      const reponseMany = await prisma.reponse.createMany({
        data: [...tab],
      });

      res.status(200).json(reponseMany);
      console.log(reponseMany);

      // Après avoir enregistré les réponses, obtenez l'ID de la personne qui répond
      const idPersonne = tab[0].personneId;
      console.log(idPersonne);

      // Ensuite, calculez la note du bénéficiaire en fonction des réponses
      const totalScore = await calculateBeneficiaryScore(idPersonne);
      console.log(totalScore);

      // Mettez à jour la note du bénéficiaire dans la base de données
      await updateBeneficiaryScore(idPersonne, totalScore);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s est produite.' });
  }
});
