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

router.post('/',protectAdmin, createformulaire);
router.get('/',protectAdmin, getFormulaire);
router.put('/:id',protectAdmin, updateFormulaire);
router.delete('/:id',protectAdmin, deleteFormulaire);
router.get('/:id',protectAdmin, getOneFormulaire);

export default router;
