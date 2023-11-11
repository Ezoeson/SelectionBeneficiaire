import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import asyncHandler from '../middleware/asyncHandler.js';

export const createformulaire = asyncHandler(async (req, res, next) => {
  const beneficiaire = await prisma.formulaire.create({
    data: {
      ...req.body,
    },
  });
  res.status(200).json(beneficiaire);
});
export const getFormulaire = asyncHandler(async (req, res, next) => {
  const formulaire = await prisma.formulaire.findMany();
  res.status(200).json(formulaire);
});
export const updateFormulaire = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const formulaire = await prisma.formulaire.update({
    where: {
      id: id,
    },
    data: { ...req.body },
  });
  res.status(200).json(formulaire);
});
export const deleteFormulaire = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const formulaire = await prisma.formulaire.delete({
    where: {
      id: id,
    },
  });
  res.status(200).json(formulaire);
});
export const getOneFormulaire = asyncHandler(async (req, res, next) => {
  const formulaire = await prisma.formulaire.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(formulaire);
});
