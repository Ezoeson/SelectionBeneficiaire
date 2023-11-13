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

// import { protect, admin } from '../middleware/authMiddleware.js';
import { protectAdmin } from '../middleware/protectAdmin.js';

router.get('/', protectAdmin, getAllenqueteur);
router.get('/get', protectAdmin, getEnqueteur);
router.get('/count', protectAdmin, countEnqueteur);
router.post('/', protectAdmin,createEnqueteur);
router.post('/compte', createCompte);
router.post('/compte/login', login);
router.post('/checkcode', checkcode);
router.put('/:id', protectAdmin, updateEnqueteur);
router.delete('/:id', protectAdmin,  deleteEnqueteur);
router.get('/:id', getEnqueteurById);
router.get('/note/:id', findBeneficiaireNote);
router.get('/beneficiaire/note', findBeneficiaire);

export default router;
