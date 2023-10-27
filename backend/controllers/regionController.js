import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import asyncHandler from '../middleware/asyncHandler.js';

export const createRegion = async (req, res, next) => {
  const region = await prisma.region.create({
    data: { ...req.body },
  });
  res.status(200).json(region);
};

export const getAllregion = asyncHandler(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10; // Number of items per page
    const offset = (page - 1) * pageSize;
    
    const region = await prisma.region.findMany({
      skip: offset,
      take: pageSize,

    });
      res.status(200).json({
        region,
        page,
        pages: Math.ceil(region.length / pageSize),
        totalPage: region.length,
      });
  } catch (error) {
    res.status(400).json(error);

  }

 
});
export const updateRegion = async (req, res, next) => {
  const id = req.params.id;

  try {
    const region = await prisma.region.update({
      where: {
        id: id,
      },
      data: { ...req.body },
    });
    res.status(200).json(region);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const deleteRegion = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const region = await prisma.region.delete({
    where: {
      id: id,
    },
  });
  res.status(200).json(region);
});
export const searchRegion = async (req, res, next) => {
  const region = await prisma.region.findMany({
    where: {
      nomRegion: { contains: req.params.value },
    },
  });
  res.status(200).json(region);
};
export const getOneRegion = async (req, res, next) => {
  const id = req.params.id;
  const region = await prisma.region.findUnique({
    where: {
      id: id,
    },
  });
  res.status(200).json(region);
};
