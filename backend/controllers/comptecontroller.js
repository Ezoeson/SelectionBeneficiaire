import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
import asyncHandler from '../middleware/asyncHandler.js';

export const getCompteById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const compte = await prisma.compte.findUnique({
    where: {
      id
    },
  });
  res.status(200).json(compte);
});
export const getAllCompte = asyncHandler(async (req, res, next) => {
  const compte = await prisma.compte.findMany({
    include: {
      enqueteur: true,
    },
  });
  res.status(200).json(compte);
});

export const updateCompte = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const compte = await prisma.compte.update({
    where: {
      id: id,
    },
    data: {
      ...req.body,
    },
  });
  res.status(200).json(compte);
});
export const updateCompteBYClerk = asyncHandler(async (req, res, next) => {
  const { password, email } = req.body;
  const hashpassword = await bcrypt.hash(password, 10);
  const compte = await prisma.compte.update({
    where: {
      email: req.params.email,
    },
    data: {
      password: hashpassword,
      email,
    },
  });
  res.status(200).json(compte);
});
export const getbyClerkId = asyncHandler(async (req, res, next) => {
  const compte = await prisma.compte.findUnique({
    where: {
      clerkId: req.params.clerkId,
    },
    include: {
      enqueteur: {
        include: {
          fokontany: true,
        },
      },
    },
  });
  res.status(200).json(compte);
});

export const deleteCompte = asyncHandler(async (req, res, next) => {
  console.log('delete');
  const compte = await prisma.compte.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(compte);
});
export const getCompte = asyncHandler(async (req, res, next) => {
  const compte = await prisma.compte.findMany({
    where: {
      codeEnqueteur: {
        not: { equals: null },
      },
    },
    select: {
      id: true,
      pseudo: true,
      email: true,
      clerkId: true,
      active:true,

      enqueteur: {
        select: {
          image: true,
        },
      },
    },
  });
  res.status(200).json(compte);
});
export const verificationCompte = asyncHandler(async (res, req, next) => {
  const { pseudo } = req.body;
  const verification = await prisma.compte.findUnique({
    where: {
      pseudo,
    },
  });
  if (!verification) {
    return res.status(404).json("Vous n'avez pas du compte");
  }
  return res.status(200).json({ verification, Message: 'Vouz avez un compte' });
});
export const login = asyncHandler(async(req,res,next)=>{
  console.log('mandeha')
  const {pseudo,password}= req.body
  const compte = await prisma.compte.findUnique({
    where:{
      pseudo
    }
  })
  if(compte.active){
     res.status(200).json("Votre compte est active")
  }else{
    return res.status(400).json("votre compte a ete desactive")
  }
})
