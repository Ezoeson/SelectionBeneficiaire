import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import asyncHandler from '../middleware/asyncHandler.js';

export const getAllBeneficiaire = asyncHandler(async (req, res, next) => {
  try {
    const page = Number(req.query.pageNumber) || 1;

    const beneficiaire = await prisma.beneficiaire.findMany({
      orderBy: {
        note: {
          value: 'desc', // Triez par la valeur de la note en ordre décroissant
        },
      },

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
    });
  } catch (error) {
    res.status(400).json(error);
  }
});
export const  countBeneficiaire = asyncHandler(async(req,res,next)=>{
  const count = await prisma.beneficiaire.count()
  res.status(200).json(count)
})
export const getBeneficiaireById = asyncHandler(async (req, res, next) => {
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
});
export const getReponseBeneficiaire = asyncHandler(async (req, res, next) => {
  const beneficiaire = await prisma.beneficiaire.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      enqueteur:true,
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
                  scoreOui:true,
                  scoreNon:true
                },
              },
              reponse: true,
            },
          },
        },
      },
    },
  });
  res.status(200).json(beneficiaire);
});

//

export const getNote =  asyncHandler(async (req, res, next) => {
  const note = await prisma.note.findMany({
    include: {
      beneficiaire: true,
    },
  });
  res.status(200).json(note);
}) 
let dernierChiffre = 0; // Initialiser le dernier chiffre
export const createBeneficiaire = asyncHandler(async (req, res, next) => {
  dernierChiffre++;

  const nom = `BNFC numero: ${dernierChiffre} ${new Date().toLocaleDateString()} `;

  const beneficiaires = await prisma.beneficiaire.create({
    data: { ...req.body, nomBeneficiaire: nom },
  });
  res.status(200).json(beneficiaires);
});
export const updateBeneficiaire = asyncHandler(async (req, res, next) => {
  const beneficiaires = await prisma.beneficiaire.update({
    where: {
      id: req.params.id,
    },
    data: { ...req.body },
  });
  res.status(200).json(beneficiaires);
});
export const deleteBeneficiaire = asyncHandler(async (req, res, next) => {
  const beneficiaires = await prisma.beneficiaire.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(beneficiaires);
});
export const geBeneficiaireById = asyncHandler(async (req, res, next) => {
  const beneficiaires = await prisma.beneficiaire.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(beneficiaires);
});
export const getNoteBeneficiaire = asyncHandler(async (req, res, next) => {
  const beneficiaires = await prisma.beneficiaire.findMany({});
  res.status(200).json(beneficiaires);
});
export const getBeneficiaireNombrePersonne = asyncHandler(
  async (req, res, next) => {
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
  }
);
export const getNoteByPersonne = asyncHandler(async (req, res, next) => {
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
});
export const personneNote = asyncHandler(async (req, res, next) => {
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
});
