import { Router } from 'express';
import {
  createBeneficiaire,
  getAllBeneficiaire,
  getNote,
  countBeneficiaire,
  geBeneficiaireById,
  deleteBeneficiaire,
  updateBeneficiaire,
  getNoteBeneficiaire,
  getBeneficiaireNombrePersonne,
  personneNote,
  getNoteByPersonne,
} from '../controllers/beneficiaireController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = new Router();

router.get('/',protect, getAllBeneficiaire);
router.get('/personne',protect, getBeneficiaireNombrePersonne);

router.get('/personne/note',protect, personneNote);
router.get('/note', getNote);
router.post('/',protect, createBeneficiaire);
router.get('/count',protect, countBeneficiaire);
router.get('/:id',protect, geBeneficiaireById);

router.delete('/:id',protect, deleteBeneficiaire);

router.put('/:id',protect, updateBeneficiaire);
router.get('/notes',protect, getNoteBeneficiaire);

export default router;
