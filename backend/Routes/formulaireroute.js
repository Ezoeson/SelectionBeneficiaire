import { Router } from 'express';
import {
  createformulaire,
  getFormulaire,
  updateFormulaire,
  deleteFormulaire,
  getOneFormulaire,
} from '../controllers/formulaireController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = new Router();

// import { protect, admin } from '../middleware/authMiddleware.js';


router.post('/', protect, createformulaire);
router.get('/',protect, getFormulaire);
router.put('/:id',protect, updateFormulaire);
router.delete('/:id',protect, deleteFormulaire);
router.get('/:id',protect, getOneFormulaire);

export default router;
