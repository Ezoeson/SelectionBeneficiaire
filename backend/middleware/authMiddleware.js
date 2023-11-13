import asyncHandler from './asyncHandler.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import jwt from 'jsonwebtoken';

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.__session;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
 

      const user = await prisma.compte.findMany({
        where: {
          clerkId: decoded.sub,
        },
        select: {
          id: true,
          isAdmin: true,
        },
      });
      if (user.length > 0) {
        req.user = user[0]
        next()
      } else {
        res.status(401);
        throw new Error('Not authorized,user not found');
      }
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});
// User must be an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};
export { protect, admin };
