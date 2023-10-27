import { PrismaClient } from '@prisma/client';
import asyncHandler from '../middleware/asyncHandler.js';

const prisma = new PrismaClient();

export const createQuestion = async (req, res, next) => {
  const Question = await prisma.question.create({
    data: { ...req.body },
  });
  res.status(200).json(Question);
};
export const getAllQuestion = asyncHandler(async (req, res, next) => {
  const { search_value } = req.params;
  if (search_value === '%20' || search_value === ' ') {
    const allQuestion = await prisma.question.findMany();
    res.status(200).json(allQuestion);
  }

  const allQuestion = await prisma.question.findMany({
    where: {
      OR: [
        {
          question: {
            contains: search_value,
            mode: 'insensitive',
          },
        },
      ],
    },
  });

  res.status(200).json(allQuestion);
});

export const updateQuestion = async (req, res, next) => {
  const updateQuestion = await prisma.question.update({
    where: {
      id: req.params.id,
    },
    data: { ...req.body },
  });
  res.status(200).json(updateQuestion);
};
export const deleteQuestion = async (req, res, next) => {
  try {
    const deleteQuestion = await prisma.question.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deleteQuestion);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const getOneQuestion = async (req, res, next) => {
  try {
    const oneQuestion = await prisma.question.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(oneQuestion);
  } catch (error) {
    res.status(400).json(error);
  }
};
