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
  deleteNote,
  getBeneficiaireNombrePersonne,
  personneNote,
  getNoteByPersonne,
} from '../controllers/beneficiaireController.js';

const router = new Router();

router.get('/', getAllBeneficiaire);
router.get('/personne', getBeneficiaireNombrePersonne);

router.get('/personne/note', personneNote);
router.get('/note', getNote);
router.post('/', createBeneficiaire);
router.get('/count', countBeneficiaire);
router.get('/:id', geBeneficiaireById);

router.delete('/:id', deleteBeneficiaire);

router.put('/:id', updateBeneficiaire);
router.get('/notes', getNoteBeneficiaire);
router.delete('/notes/:id', deleteNote);

export default router;