import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import asyncHandler from '../middleware/asyncHandler.js';

export const createCategorieQuestion = asyncHandler(async (req, res, next) => {
  const createCategorieQuestion = await prisma.categorieQuestion.create({
    data: {
      ...req.body,
    },
  });
  res.status(200).json(createCategorieQuestion);
});
export const getAllCategorie = asyncHandler(async (req, res, next) => {
  const allCategorie = await prisma.categorieQuestion.findMany();

  res.status(200).json(allCategorie);
});

export const GetSelectCategorieQuestion = asyncHandler(
  async (req, res, next) => {
    const selectCategorieQuestion = await prisma.categorieQuestion.findMany({
      where: {
        formulaireId: req.params.id,
      },
    });
    res.status(200).json(selectCategorieQuestion);
  }
);

export const updateCategorieQuestion = asyncHandler(async (req, res, next) => {
  const updateCategorieQuestion = await prisma.categorieQuestion.update({
    where: {
      id: req.params.id,
    },
    data: { ...req.body },
  });
  res.status(200).json(updateCategorieQuestion);
});
export const deleteCategorieQuestion = asyncHandler(async (req, res, next) => {
  try {
    const deleteCategorieQuestion = await prisma.categorieQuestion.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deleteCategorieQuestion);
  } catch (error) {
    res.status(400).json(error);
  }
});
export const getOneCategorieQuestion = asyncHandler(async (req, res, next) => {
  try {
    const getOneCategorieQuestion = await prisma.categorieQuestion.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(getOneCategorieQuestion);
  } catch (error) {
    res.status(400).json(error);
  }
});
export const getNombreQuestionByCategorie = asyncHandler(
  async (req, res, next) => {
    const categorie = await prisma.categorieQuestion.findMany({
      select: {
        categorieName: true,
        _count: {
          select: {
            question: true,
          },
        },
      },
    });
    const nomCatgeorie = categorie.map((categorie) => categorie.categorieName);
    const nombreQuestion = categorie.map(
      (question) => question._count.question
    );
    res.status(200).json({ nombreQuestion, nomCatgeorie });
  }
);
