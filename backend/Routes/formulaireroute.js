import { Router } from 'express';
import {
  createformulaire,
  getFormulaire,
  updateFormulaire,
  deleteFormulaire,
  getOneFormulaire,
} from '../controllers/formulaireController.js';
const router = new Router();

// import { protect, admin } from '../middleware/authMiddleware.js';
import { protectAdmin } from '../middleware/protectAdmin.js';

router.post('/',createformulaire);
router.get('/', getFormulaire);
router.put('/:id', updateFormulaire);
router.delete('/:id', deleteFormulaire);
router.get('/:id', getOneFormulaire);

export default router;
