import { Router } from 'express';
import {
  createformulaire,
  getFormulaire,
  updateFormulaire,
  deleteFormulaire,
  getOneFormulaire,
} from '../controllers/formulaireController.js';
const router = new Router();

router.post('/', createformulaire);
router.get('/', getFormulaire);
router.put('/:id', updateFormulaire);
router.delete('/:id', deleteFormulaire);
router.get('/:id', getOneFormulaire);

export default router;
