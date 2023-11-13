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
// import { protect, admin } from '../middleware/authMiddleware.js';
import { protectAdmin } from '../middleware/protectAdmin.js';
protectAdmin

const router = new Router();

router.get('/', protectAdmin, getAllBeneficiaire);
router.get('/personne', protectAdmin, getBeneficiaireNombrePersonne);

router.get('/personne/note', protectAdmin, personneNote);
router.get('/note', getNote);
router.post('/', protectAdmin, createBeneficiaire);
router.get('/count', protectAdmin, countBeneficiaire);
router.get('/:id', protectAdmin, geBeneficiaireById);

router.delete('/:id', protectAdmin, deleteBeneficiaire);

router.put('/:id', protectAdmin, updateBeneficiaire);
router.get('/notes', protectAdmin, getNoteBeneficiaire);

export default router;
