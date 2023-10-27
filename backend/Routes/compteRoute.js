import { Router } from 'express';

import {
  getAllCompte,
  updateCompte,
  getbyClerkId,
  deleteCompte,
  getCompte,
  verificationCompte,
} from '../controllers/comptecontroller.js';

const router = Router();

router.get('/', getAllCompte);
router.post('/pseudo/pseudo', verificationCompte);
router.get('/get', getCompte);
router.put('/:id', updateCompte);
router.delete('/:id', deleteCompte);
router.get('/clerk/:clerkId', getbyClerkId);

export default router;
