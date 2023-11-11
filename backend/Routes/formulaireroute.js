import { Router } from 'express';
import {
  createformulaire,
  getFormulaire,
  updateFormulaire,
  deleteFormulaire,
  getOneFormulaire,
} from '../controllers/formulaireController.js';
const router = new Router();

import { protect, admin } from '../middleware/authMiddleware.js';

router.post('/',protect,admin, createformulaire);
router.get('/',protect, getFormulaire);
router.put('/:id',protect,admin, updateFormulaire);
router.delete('/:id',protect,admin, deleteFormulaire);
router.get('/:id',protect,admin, getOneFormulaire);

export default router;
