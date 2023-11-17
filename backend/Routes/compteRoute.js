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


const router = Router();

router.get('/', getAllCompte);
router.post('/pseudo/pseudo', verificationCompte);
router.get('/get', getCompte);
router.put('/:id', updateCompte);
router.put('/update/:email', updateCompteBYClerk);
router.delete('/:id', deleteCompte);
router.get('/clerk/:clerkId', getbyClerkId);

export default router;
