import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';

export const getAllenqueteur = async (req, res, next) => {
  try {
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = 10; // Number of items per page
    const offset = (page - 1) * pageSize;

    // Fetch products for the current page

    const enqueteur = await prisma.enqueteur.findMany({
      skip: offset,
      take: pageSize,
      include: {
        fokontany: true,
      },
    });

    // Count total number of products (for pagination)
    const count = await prisma.enqueteur.count();

    // Calculate total number of pages
    const totalPages = Math.ceil(count / pageSize);

    // Return the result as JSON
    res.json({
      enqueteur,
      page,
      pages: totalPages,
      totalPage: count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const getEnqueteur = async (req, res, next) => {
  const allEnqueteur = await prisma.enqueteur.findMany({
    include: {
      fokontany: true,
    },
  });
  res.status(200).json(allEnqueteur);
};

export const createEnqueteur = async (req, res, next) => {
  // const { code, nom, age, communeId } = req.body;
  const enqueteur = await prisma.enqueteur.create({
    data: { ...req.body },
  });
  res.status(200).json(enqueteur);
};
export const countEnqueteur = async (req, res, next) => {
  const enqueteur = await prisma.enqueteur.count();
  res.status(200).json(enqueteur);
};
export const getEnqueteurById = async (req, res, next) => {
  const id = req.params.id;
  const enqueteur = await prisma.enqueteur.findUnique({
    where: {
      id: id,
    },
  });
  res.status(200).json(enqueteur);
};

export const createCompte = async (req, res, next) => {
  const { pseudo, password, email, code, clerkId } = req.body;
  const hashpassword = await bcrypt.hash(password, 10);
  const compte = await prisma.compte.create({
    data: {
      pseudo,
      email,
      password: hashpassword,
      codeEnqueteur: code,
      clerkId,
    },
  });
  res.status(200).json(compte);
};

export const checkcode = async (req, res, next) => {
  const { code } = req.body;
  const compte = await prisma.enqueteur.findUnique({
    where: {
      code: code,
    },
    include: {
      compte: true,
    },
  });
  if (!compte) {
    return res
      .status(404)
      .json({ message: 'Votre code est incorrect ou introuvable' });
  }
  if (compte.compte) {
    return res
      .status(400)
      .json({ message: 'Desole, vous avez deja un compte' });
  }
  res.status(200).json({ message: 'Vous ouvez creer un compte' });
};

export const updateEnqueteur = async (req, res, next) => {
  const id = req.params.id;
  const { image, code, nom, age, communeId } = req.body;
  try {
    const enqueteur = await prisma.enqueteur.update({
      where: {
        id: id,
      },
      data: {
        image,
        age,
        communeId,
        code,
        nom,
      },
    });
    res.status(200).json(enqueteur);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const deleteEnqueteur = async (req, res, next) => {
  const id = req.params.id;
  const enqueteur = await prisma.enqueteur.delete({
    where: {
      id: id,
    },
  });
  res.status(200).json(enqueteur);
};

export const deleteCompte = async (req, res, next) => {
  const id = req.params.id;
  const compte = await prisma.compte.delete({
    where: {
      id: id,
    },
  });
  res.status(200).json(compte);
};
export const getEnqueteurByCode = async (req, res, next) => {
  const code = req.params.code;
  const enqueteur = await prisma.enqueteur.findUnique({
    where: {
      code: code,
    },
  });
  res.status(200).json(enqueteur);
};
export const getEnqueteurByClerkId = async (req, res, next) => {
  const clerkId = req.params.clerkId;
  const enqueteur = await prisma.enqueteur.findUnique({
    where: {
      clerkId: clerkId,
    },
  });
  res.status(200).json(enqueteur);
};
export const getEnqueteurByCodeEnqueteur = async (req, res, next) => {
  const code = req.params.code;
  const enqueteur = await prisma.enqueteur.findUnique({
    where: {
      code: code,
    },
  });
  res.status(200).json(enqueteur);
};
export const getEnqueteurByCodeEnqueteurAndClerkId = async (req, res, next) => {
  const code = req.params.code;
  const clerkId = req.params.clerkId;
  const enqueteur = await prisma.enqueteur.findUnique({
    where: {
      code: code,
      clerkId: clerkId,
    },
  });
  res.status(200).json(enqueteur);
};
export const getEnqueteurByClerkIdAndCodeEnqueteur = async (req, res, next) => {
  const code = req.params.code;
  const clerkId = req.params.clerkId;
  const enqueteur = await prisma.enqueteur.findUnique({
    where: {
      code: code,
      clerkId: clerkId,
    },
  });
  res.status(200).json(enqueteur);
};

export const findBeneficiaireNote = async (req, res, next) => {
  const enqueteur = await prisma.enqueteur.findUnique({
    where: {
      id: req.params.id,
    },
    select: {
      beneficiare: {
        select: {
          note: {
            select: {
              value: true,
            },
          },
          personne: {
            where: {
              type: 'RECEPTEUR',
            },
            select: {
              nom: true,
            },
          },
        },
      },
    },
  });
  // const Note = [];
  // const nomPersonne = [];
  // const Note = enqueteur.beneficiare.map((benef) => benef.note.value);
  const nomPersonne = enqueteur?.beneficiare
    .filter((benef) => benef?.personne.length > 0) // Filtrez les objets personne vides
    .map((benef) => benef?.personne[0]?.nom); // Utilisation de [0] car personne est un tableau

  const Note = enqueteur.beneficiare
    .map((benef) => benef.note?.value) // Utilisation de ?. pour gérer les valeurs null
    .filter((value) => value !== undefined);

  console.log(Note);
  console.log(nomPersonne);

  res.status(200).json({ Note, nomPersonne });
};
export const findBeneficiaire = async (req, res, next) => {
  const enqueteur = await prisma.enqueteur.findMany({
    select: {
      beneficiare: {
        select: {
          note: {
            select: {
              value: true,
            },
          },
          personne: {
            where: {
              type: 'RECEPTEUR',
            },
            select: {
              nom: true,
            },
          },
        },
      },
    },
  });
  // const Note = [];
  // const nomPersonne = [];
  // const Note = enqueteur.beneficiare.map((benef) => benef.note.value);
  const nomPersonne = enqueteur?.beneficiare
    .filter((benef) => benef?.personne.length > 0) // Filtrez les objets personne vides
    .map((benef) => benef.personne[0].nom); // Utilisation de [0] car personne est un tableau

  const Note = enqueteur?.beneficiare
    .map((benef) => benef.note?.value) // Utilisation de ?. pour gérer les valeurs null
    .filter((value) => value !== undefined);

  res.status(200).json({ Note, nomPersonne });
};


