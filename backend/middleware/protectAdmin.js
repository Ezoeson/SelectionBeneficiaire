import asyncHandler from './asyncHandler.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import jwt from 'jsonwebtoken';
export const protectAdmin = asyncHandler(async (req, res, next) => {
  const token = req.headers.cookie?.split(';')[2]?.split('=')[1]; // Utilisation de ?. pour éviter les erreurs si une partie de l'en-tête est undefined

  console.log(token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const compte = await prisma.compte.findUnique({
        select: {
          clerkId: true,
          isAdmin: true,
        },
        where: {
          clerkId: decoded.sub,
        },
      });

      // Supposant que compte.type est un boolean
      if (!compte) {
        console.log('Not Authorized');
        return res
          .status(401)
          .json({ success: false, message: 'Not Authorized' });
      }

      next();
    } catch (error) {
      console.log('ERROR');
      res.status(401).json({ success: false, message: 'Not Authorized' });
    }
  } else {
    res.status(401).json({ message: 'Not Authorized' });
  }
});
