import { Router } from 'express';

import {
  getAllCompte,
  updateCompte,
  getbyClerkId,
  deleteCompte,
  getCompte,
  verificationCompte,
} from '../controllers/comptecontroller.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/',protect,admin, getAllCompte);
router.post('/pseudo/pseudo', verificationCompte);
router.get('/get',protect, getCompte);
router.put('/:id', updateCompte);
router.delete('/:id',protect,admin, deleteCompte);
router.get('/clerk/:clerkId', getbyClerkId);

export default router;
