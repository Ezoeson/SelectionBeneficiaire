import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import asyncHandler from '../middleware/asyncHandler.js';

export const getAllPersonne = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page || 1);
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    const personne = await prisma.personne.findMany({
      skip: offset,
      take: pageSize,

      include: {
        beneficiaire: true,
      },
    });

    const count = await prisma.personne.count();
    // Calculate total number of pages
    const totalPages = Math.ceil(count / pageSize);
    res.status(200).json(personne);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const createPersonne = asyncHandler( async (req, res, next) => {
  // const { nom, prenom, image, cin, age, beneficiaireId, type, sexe } = req.body;
  const personne = await prisma.personne.create({
    data: {
      ...req.body,
    },
  });
  res.status(200).json(personne);
})
export const updatePersonne = asyncHandler(async (req, res, next) => {
  const personne = await prisma.personne.update({
    where: {
      id: req.params.id,
    },
    data: {
      ...req.body,
    },
  });
  res.status(200).json(personne);
}); ;
export const deletePersonne = async (req, res, next) => {
  const personne = await prisma.personne.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(personne);
};
export const getOnepersonne = async (req, res, next) => {
  const personne = await prisma.personne.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(personne);
};
export const searchAndFetchAllPersonnes = async (req, res) => {
  const { query } = req.query;
  try {
    const searchResults = await prisma.personne.findMany({
      where: {
        OR: [
          {
            nom: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            prenom: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    const allPersonne = await prisma.personne.findMany();

    const mergedResults = {
      searchResults,
      allPersonne,
    };

    res.json(mergedResults);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Une erreur est survenue lors de la recherche.' });
  }
};

// try {
//     const page = parseInt(req.query.page || 1); // Current page, default is 1
//     const pageSize = 10; // Number of items per page
//     const offset = (page - 1) * pageSize;

//     // Fetch products for the current page
//     const products = await prisma.product.findMany({
//       skip: offset,
//       take: pageSize,
//     });

//     // Count total number of products (for pagination)
//     const count = await prisma.product.count();

//     // Calculate total number of pages
//     const totalPages = Math.ceil(count / pageSize);

//     // Return the result as JSON
//     res.json({
//       products,
//       page,
//       pages: totalPages,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
