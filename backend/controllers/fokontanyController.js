import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import asyncHandler from '../middleware/asyncHandler.js';

export const createfokontany = asyncHandler(async (req, res, next) => {
  const fokontany = await prisma.fokontany.create({
    data: { ...req.body },
  });
  res.status(200).json(fokontany);
});

export const getAllfokontany = asyncHandler(async (req, res, next) => {
  const fokontany = await prisma.fokontany.findMany({
    include: {
      commune: true,
      enqueteur: true,
    },
  });
  res.status(200).json(fokontany);
});
export const updatefokontany = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  try {
    const fokontany = await prisma.fokontany.update({
      where: {
        id: id,
      },
      data: { ...req.body },
    });
    res.status(200).json(fokontany);
  } catch (error) {
    res.status(400).json(error);
  }
});
export const deletefokontany = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const fokontany = await prisma.fokontany.delete({
    where: {
      id: id,
    },
  });
  res.status(200).json(fokontany);
});
export const getOnefokontany = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const fokontany = await prisma.fokontany.findUnique({
    where: {
      id: id,
    },
  });
  res.status(200).json(fokontany);
});
