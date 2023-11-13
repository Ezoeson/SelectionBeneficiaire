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

router.get('/', getAllBeneficiaire);
router.get('/personne', getBeneficiaireNombrePersonne);

router.get('/personne/note', personneNote);
router.get('/note', getNote);
router.post('/', createBeneficiaire);
router.get('/count', countBeneficiaire);
router.get('/:id', geBeneficiaireById);

router.delete('/:id', deleteBeneficiaire);

router.put('/:id', protectAdmin, updateBeneficiaire);
router.get('/notes', protectAdmin, getNoteBeneficiaire);

export default router;
