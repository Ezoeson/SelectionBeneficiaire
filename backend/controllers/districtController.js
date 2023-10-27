import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createDistrict = async (req, res, next) => {
  try {
    const district = await prisma.district.create({
      data: { ...req.body },
    });
    res.status(200).json(district);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getAlldistrict = async (req, res, next) => {
  try {
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = 10; // Number of items per page
    const offset = (page - 1) * pageSize;
    const district = await prisma.district.findMany({
      skip: offset,
      take: pageSize,
      include: {
        region: true,
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
};
export const getONedistrict = async (req, res, next) => {
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
};

export const updatedistrict = async (req, res, next) => {
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
};
export const deletedistrict = async (req, res, next) => {
  const id = req.params.id;
  const district = await prisma.district.delete({
    where: {
      id: id,
    },
  });
  res.status(200).json(district);
};
