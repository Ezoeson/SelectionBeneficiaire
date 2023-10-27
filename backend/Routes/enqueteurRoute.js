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
} from '../controllers/enqueteurController.js';

const router = Router();

router.get('/', getAllenqueteur);
router.get('/get', getEnqueteur);
router.get('/count', countEnqueteur);
router.post('/', createEnqueteur);
router.post('/compte', createCompte);
router.post('/checkcode', checkcode);
router.put('/:id', updateEnqueteur);
router.delete('/:id', deleteEnqueteur);
router.get('/:id', getEnqueteurById);
router.get('/note/:id', findBeneficiaireNote);
router.get('/beneficiaire/note', findBeneficiaire);

export default router;
