import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createcommune = async (req, res, next) => {
  try {
    const commune = await prisma.commune.create({
      data: { ...req.body },
    });
    res.status(200).json(commune);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getCommuneChart = async (req, res, next) => {
  try {
    const communes = await prisma.commune.findMany({
      select: {
        nomCommune: true,
        fokontany: {
          select: {
            nomFokontany: true,
            _count: {
              select: {
                beneficiaire: true,
              },
            },
          },
        },
        // enqueteur: {
        //   select: {
        //     nom: true,
        //     _count: {
        //       select: {
        //         beneficiare: true,
        //       },
        //     },
        //   },
        // },
      },
    });

    const nom_commune = [];
    const nombreBeneficiaire = [];
    let nombreTotal = [];
    communes.forEach((item) => {
      nom_commune.push(item.nomCommune);
      item.fokontany.forEach((fokontany) => {
        nombreBeneficiaire.push(fokontany._count.beneficiaire);
      });
    });
    nombreTotal.push(nombreBeneficiaire.length);
    console.log(nombreTotal);
    res.json({ nom_commune, nombreBeneficiaire, nombreTotal });
  } catch (error) {
    next(error);
  }
};

export const getAllcommune = async (req, res, next) => {
  try {
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = 20; // Number of items per page
    const offset = (page - 1) * pageSize;
    const commune = await prisma.commune.findMany({
      skip: offset,
      take: pageSize,
      include: {
        district: true,
      },
    });
    // Count total number of products (for pagination)
    const count = await prisma.enqueteur.count();

    // Calculate total number of pages
    const totalPages = Math.ceil(count / pageSize);
    // Return the result as JSON
    res.json({
      commune,
      page,
      pages: totalPages,
      totalPage: count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const getOnecommune = async (req, res, next) => {
  const id = req.params.id;
  const commune = await prisma.commune.findUnique({
    where: {
      id: id,
    },
  });
  res.status(200).json(commune);
};
export const getcommuneBydistrict = async (req, res, next) => {
  const id = req.params.id;
  const commune = await prisma.commune.findMany({
    where: {
      districtId: id,
    },
  });
  res.status(200).json(commune);
};

export const updatecommune = async (req, res, next) => {
  const id = req.params.id;

  try {
    const commune = await prisma.commune.update({
      where: {
        id: id,
      },
      data: {
        ...req.body,
      },
    });
    res.status(200).json(commune);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const deletecommune = async (req, res, next) => {
  const id = req.params.id;
  const commune = await prisma.commune.delete({
    where: {
      id: id,
    },
  });
  res.status(200).json(commune);
};
