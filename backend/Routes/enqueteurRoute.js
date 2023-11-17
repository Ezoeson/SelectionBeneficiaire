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
// import { protectAdmin } from '../middleware/protectAdmin.js';

router.get('/',protect,  getAllenqueteur);
router.get('/get',protect,  getEnqueteur);
router.get('/count',protect,  countEnqueteur);
router.post('/',protect, createEnqueteur);
router.post('/compte', createCompte);
router.post('/compte/login', login);
router.post('/checkcode', checkcode);
router.put('/:id',protect,  updateEnqueteur);
router.delete('/:id',protect,deleteEnqueteur);
router.get('/:id',protect, getEnqueteurById);
router.get('/note/:id', findBeneficiaireNote);
router.get('/beneficiaire/note', findBeneficiaire);

export default router;
