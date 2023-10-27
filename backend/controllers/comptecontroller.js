import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

export const getCompteById = async (req, res, next) => {
  const id = req.params.id;
  const compte = await prisma.compte.findUnique({
    where: {
      OR: [{ id: id }, { clerkId: id }],
    },
  });
  res.status(200).json(compte);
};
export const getAllCompte = async (req, res, next) => {
  const compte = await prisma.compte.findMany({
    include: {
      enqueteur: true,
    },
  });
  res.status(200).json(compte);
};

export const updateCompte = async (req, res, next) => {
  const id = req.params.id;
  const { pseudo, password, email, clerkId, codeEnqueteur, isAdmin } = req.body;
  const hashpassword = await bcrypt.hash(password, 10);
  const compte = await prisma.compte.update({
    where: {
      id: id,
    },
    data: {
      pseudo,
      email,
      password: hashpassword,
      clerkId,
      codeEnqueteur,
      isAdmin,
    },
  });
  res.status(200).json(compte);
};
export const getbyClerkId = async (req, res, next) => {
  const compte = await prisma.compte.findUnique({
    where: {
      clerkId: req.params.clerkId,
    },
    include: {
      enqueteur: {
        include:{
          fokontany:true
        }
      },
    },
  });
  res.status(200).json(compte);
};
export const deleteCompte = async (req, res, next) => {
  console.log('delete');
  const compte = await prisma.compte.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(compte);
};
export const getCompte = async (req, res, next) => {
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

      enqueteur: {
        select: {
          image: true,
        },
      },
    },
  });
  res.status(200).json(compte);
};
export const verificationCompte= async(res,req,next)=>{
  const {pseudo}= req.body
const verification = await prisma.compte.findUnique({
  where:{
    pseudo,
  }
})
if(!verification){
  return res.status(404).json("Vous n'avez pas du compte")
}
return res.status(200).json({verification,Message:'Vouz avez un compte'})
}
