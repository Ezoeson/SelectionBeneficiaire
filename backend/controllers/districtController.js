import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import asyncHandler from '../middleware/asyncHandler.js';

export const createDistrict = asyncHandler(async (req, res, next) => {
  try {
    const district = await prisma.district.create({
      data: { ...req.body },
    });
    res.status(200).json(district);
  } catch (error) {
    res.status(400).json(error);
  }
});

export const getAlldistrict = asyncHandler(async (req, res, next) => {
  try {
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = 1000; // Number of items per page
    const offset = (page - 1) * pageSize;
    const district = await prisma.district.findMany({
      skip: offset,
      take: pageSize,
      include: {
        region: true,
      },
      orderBy: {
        nomDistrict: 'asc', // 'asc' pour trier par ordre croissant, 'desc' pour décroissant
      },
    });
    // Count total number of products (for pagination)
    const count = await prisma.enqueteur.count();

    // Calculate total number of pages
    const totalPages = Math.ceil(count / pageSize);
    // Return the result as JSON
    res.json({
      district,
      page,
      pages: totalPages,
      totalPage: count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
export const getONedistrict = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const district = await prisma.district.findUnique({
    where: {
      id: id,
    },
    include: {
      region: true,
    },
  });
  res.status(200).json(district);
});

export const updatedistrict = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const district = await prisma.district.update({
    where: {
      id: id,
    },
    data: {
      ...req.body,
    },
  });
  res.status(200).json(district);
});
export const deletedistrict = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const district = await prisma.district.delete({
    where: {
      id: id,
    },
  });
  res.status(200).json(district);
});
