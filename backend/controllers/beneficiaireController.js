import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllBeneficiaire = async (req, res, next) => {
  try {
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = 10; // Number of items per page
    const offset = (page - 1) * pageSize;

    const beneficiaire = await prisma.beneficiaire.findMany({
      skip: offset,
      take: pageSize,

      include: {
        note: true,
        fokontany: true,
        personne: {
          where: {
            type: 'RECEPTEUR',
          },
          include: {
            reponse: {
              select: {
                question: {
                  select: {
                    question: true,
                  },
                },
                reponse: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json({
      beneficiaire,
      page,
      pages: Math.ceil(beneficiaire.length / pageSize),
      totalPage: beneficiaire.length,
    });
  } catch (error) {}
};
export const getBeneficiaireById = async (req, res, next) => {
  const beneficiaire = await prisma.beneficiaire.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      note: true,
      personne: true,
    },
  });
  res.status(200).json(beneficiaire);
};
export const countBeneficiaire = async (req, res, next) => {
  const beneficiaire = await prisma.beneficiaire.count();
  res.status(200).json(beneficiaire);
};

//

// export const createBeneficiaireNote = async (req, res, next) => {
//   const {beneficiaire, personne, reponses}=req.body
//   const beneficiaires = await prisma.beneficiaire.create({
//     data: {
//       ...beneficiaire,
//     },
//   });

//   if (!beneficiaires) {
//     return console.log('BENEFICIAIRE NON CREER');
//   }

//   const idBeneficiaire = beneficiaires.id;

//   const personnes = await prisma.personne.create({
//     data: {
//       ...personne,
//       benefificiareId: idBeneficiaire,
//     },
//   });

//   if (!personnes) {
//     return console.log('PERSONNE NON CREER');
//   }

//   const tab = [];

//   let obj = {};
//   reponses.forEach((item) => {
//     obj.questionId = item.questionId;
//     obj.reponse = item.reponse;
//     obj.beneficiaireId = idBeneficiaire;
//     tab.push(obj);
//     obj = {};
//   });

//   const reponseMany = await prisma.reponse.createMany({
//     data: [...tab],

//     skipDuplicates: true,
//   });

//   if (!reponseMany) {
//     return console.log('REPONSE NON CREER');
//   }
//     calculateBeneficiaryScore(idBeneficiaire,res);

// };

export const getNote = async (req, res, next) => {
  const note = await prisma.note.findMany({
    include: {
      beneficiaire: true,
    },
  });
  res.status(200).json(note);
};
export const deleteNote = async (req, res, next) => {
  const note = await prisma.note.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(note);
};

let dernierChiffre = 0; // Initialiser le dernier chiffre
export const createBeneficiaire = async (req, res, next) => {
  dernierChiffre++;

  const nom = `BNFC numero: ${dernierChiffre} ${new Date().toLocaleDateString()} `;
  
  const beneficiaires = await prisma.beneficiaire.create({
    data: { ...req.body, nomBeneficiaire: nom },
  });
  res.status(200).json(beneficiaires);
};
export const updateBeneficiaire = async (req, res, next) => {
  const beneficiaires = await prisma.beneficiaire.update({
    where: {
      id: req.params.id,
    },
    data: { ...req.body },
  });
  res.status(200).json(beneficiaires);
};
export const deleteBeneficiaire = async (req, res, next) => {
  const beneficiaires = await prisma.beneficiaire.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(beneficiaires);
};
export const geBeneficiaireById = async (req, res, next) => {
  const beneficiaires = await prisma.beneficiaire.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(beneficiaires);
};
export const getNoteBeneficiaire = async (req, res, next) => {
  const beneficiaires = await prisma.beneficiaire.findMany({});
  res.status(200).json(beneficiaires);
};
export const getBeneficiaireNombrePersonne = async (req, res, next) => {
  const beneficiaire = await prisma.beneficiaire.findMany({
    select: {
      nomBeneficiaire: true,
      _count: {
        select: {
          personne: true,
        },
      },
    },
  });

  const nomBeneficiaire = [];
  const nombrePersonne = [];
  beneficiaire.forEach((beneficiaire) => {
    nombrePersonne.push(beneficiaire._count.personne);
    nomBeneficiaire.push(beneficiaire.nomBeneficiaire);
  });
  res.status(200).json({
    nomBeneficiaire,
    nombrePersonne,
  });
};
export const getNoteByPersonne = async (req, res, next) => {
  const beneficiaire = await prisma.beneficiaire.findMany({
    select: {
      nomBeneficiaire: true,
      note: {
        select: {
          value: true,
        },
      },
      personne: {
        select: {
          nom: true,
        },
      },
    },
  });
  const Note = [];
  const nomPersonne = [];

  beneficiaire.forEach((beneficiaire) => {
    if (
      beneficiaire.personne &&
      beneficiaire.note &&
      beneficiaire.note.value !== null &&
      beneficiaire.personne.nom !== null
    ) {
      nomPersonne.push(beneficiaire.personne);
      Note.push(beneficiaire.note.value);
    }
  });

  // const Note = beneficiaire.map((beneficiaire) => beneficiaire.note.value);

  res.status(200).json({ nomPersonne, Note });
};
export const personneNote = async (req, res, next) => {
  const personne = await prisma.personne.findMany({
    where: {
      type: 'RECEPTEUR',
    },
    select: {
      nom: true,
      beneficiaire: {
        select: {
          note: {
            select: {
              value: true,
            },
          },
        },
      },
    },
  });
  const Note = [];
  const nomPersonne = [];

  personne.forEach((personne) => {
    if (personne.beneficiaire.note.value !== null) {
      nomPersonne.push(personne.nom);
      Note.push(personne.beneficiaire.note.value);
    }
  });
  res.status(200).json({ Note, nomPersonne });
};

// export const nombreBeneficiaireByJourBysemaine = async (req, res, next) => {
//   const beneficiaire = await prisma.beneficiaire.findMany();
//   const nbreBeneficiaire = [0, 0, 0, 0, 0, 0, 0];
//   const jour = ['dimanche', 'lundi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
//   beneficiaire.forEach((record) => {
//     const day = new Date(record.createdAt).getDay();
//     nbreBeneficiaire[day] += 1;
//   });
//   res.status(200).json({ nbreBeneficiaire, jour });
// };
// export const nombreBeneficiaireByJourBysemaine = async (req, res, next) => {
//   const beneficiaire = await prisma.beneficiaire.findMany();
//   const jour = [
//     'dimanche',
//     'lundi',
//     'mardi',
//     'mercredi',
//     'jeudi',
//     'vendredi',
//     'samedi',
//   ];
//   const nbreBeneficiaire = {};

//   beneficiaire.forEach((record) => {
//     const createdAt = new Date(record.createdAt);
//     const dayOfWeek = createdAt.getDay();
//     const dateString = createdAt.toISOString().split('T')[0]; // Extract the date in 'YYYY-MM-DD' format.

//     if (!nbreBeneficiaire[jour[dayOfWeek]]) {
//       nbreBeneficiaire[jour[dayOfWeek]] = {};
//     }

//     if (!nbreBeneficiaire[jour[dayOfWeek]][dateString]) {
//       nbreBeneficiaire[jour[dayOfWeek]][dateString] = 0;
//     }

//     nbreBeneficiaire[jour[dayOfWeek]][dateString]++;
//   });

//   res.status(200).json({ nbreBeneficiaire });
// };
