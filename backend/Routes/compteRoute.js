import { Router } from 'express';

import {
  getAllCompte,
  updateCompte,
  getbyClerkId,
  deleteCompte,
  getCompte,
  verificationCompte,
  updateCompteBYClerk
} from '../controllers/comptecontroller.js';

// import { protect, admin } from '../middleware/authMiddleware.js';
import { protectAdmin } from '../middleware/protectAdmin.js';

const router = Router();

router.get('/',protectAdmin, getAllCompte);
router.post('/pseudo/pseudo', verificationCompte);
router.get('/get',protectAdmin, getCompte);
router.put('/:id', updateCompte);
router.put('/update/:email', updateCompteBYClerk);
router.delete('/:id',protectAdmin, deleteCompte);
router.get('/clerk/:clerkId', getbyClerkId);

export default router;
