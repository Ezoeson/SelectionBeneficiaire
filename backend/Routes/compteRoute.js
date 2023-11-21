import { Router } from 'express';

import {
  getAllCompte,
  updateCompte,
  getbyClerkId,
  deleteCompte,
  getCompte,
  verificationCompte,
  updateCompteBYClerk,
  getCompteById,
  login,
} from '../controllers/comptecontroller.js';

// import { protect, admin } from '../middleware/authMiddleware.js';


const router = Router();

router.get('/', getAllCompte);
router.post('/pseudo/pseudo', verificationCompte);
router.post('/poste/poste', login);
router.get('/get', getCompte);
router.put('/:id', updateCompte);
router.get('/getss/:id', getCompteById);
router.put('/update/:email', updateCompteBYClerk);
router.delete('/:id', deleteCompte);
router.get('/clerk/:clerkId', getbyClerkId);

export default router;
