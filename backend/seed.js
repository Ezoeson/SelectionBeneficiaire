import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const create = async () => {
  const reponse = {
    reponse: 'OUI',
    questionId: 1,
    beneficiaireId: 59,
  };
  try {
    const quest = await prisma.reponse.create({
      data: { ...reponse },
    });

    console.log(quest);
  } catch (error) {
    console.log(error);
  }
};

const get = async () => {
  try {
    const questions = await prisma.question.findMany({
      include: {
        sousQuestion: true,
      },
    });
    console.log(questions);
  } catch (error) {
    console.log(error);
  }
};

const update = async (id) => {
  const up = await prisma.question.update({
    data: {
      idParent: 1,
    },
    where: {
      id_question: id,
    },
  });

  console.log(up);
};

const findFirst = async () => {
  const quest = await prisma.question.findFirst({
    skip: 0,
    include: {
      sousQuestion: true,
    },
  });

  console.log(quest);
};
// create()
// update(2)
// get();

const SAVE = async () => {
  const data = {
    beneficiaire: {
      enqueteurId: 1,
    },
    personne: {
      nom: 'Be tarehy',
      prenom: 'Be sarotro',
      age: 21,
      type: 'BENEFICIAIRE',
    },
    reponses: [
      {
        questionId: 1,
        reponse: 'non',
      },
      {
        questionId: 2,
        reponse: 'non',
      },
      {
        questionId: 3,
        reponse: 'non',
      },
      {
        questionId: 4,
        reponse: 'non',
      },
      {
        questionId: 5,
        reponse: 'non',
      },
    ],
  };

  const beneficiaire = await prisma.beneficiaire.create({
    data: {
      ...data.beneficiaire,
    },
  });

  if (!beneficiaire) {
    return console.log('BENEFICIAIRE NON CREER');
  }

  const idBeneficiaire = beneficiaire.id;

  const personne = await prisma.personne.create({
    data: {
      ...data.personne,
      benefificiareId: idBeneficiaire,
    },
  });

  if (!personne) {
    return console.log('PERSONNE NON CREER');
  }

  const tab = [];

  let obj = {};
  const reponses = data.reponses;
  reponses.forEach((item) => {
    obj.questionId = item.questionId;
    obj.reponse = item.reponse;
    obj.beneficiaireId = idBeneficiaire;
    tab.push(obj);
    obj = {};
  });

  const reponseMany = await prisma.reponse.createMany({
    data: [...tab],

    skipDuplicates: true,
  });

  if (!reponseMany) {
    return console.log('REPONSE NON CREER');
  }

  return console.log('OK');
};

SAVE();
