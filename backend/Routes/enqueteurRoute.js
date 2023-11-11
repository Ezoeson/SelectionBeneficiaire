import { Router } from 'express';
import {
  getAllenqueteur,
  createEnqueteur,
  updateEnqueteur,
  deleteEnqueteur,
  createCompte,
  checkcode,
  countEnqueteur,
  getEnqueteurById,
  findBeneficiaireNote,
  findBeneficiaire,
  getEnqueteur,
  login,
} from '../controllers/enqueteurController.js';

const router = Router();

import { protect, admin } from '../middleware/authMiddleware.js';

router.get('/', protect, getAllenqueteur);
router.get('/get', protect, getEnqueteur);
router.get('/count', protect, countEnqueteur);
router.post('/', protect, admin, createEnqueteur);
router.post('/compte', createCompte);
router.post('/compte/login', login);
router.post('/checkcode', checkcode);
router.put('/:id', protect, updateEnqueteur);
router.delete('/:id', protect, admin, deleteEnqueteur);
router.get('/:id', getEnqueteurById);
router.get('/note/:id', findBeneficiaireNote);
router.get('/beneficiaire/note', findBeneficiaire);

export default router;
