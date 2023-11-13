import { Router } from 'express';
import {
  createCategorieQuestion,
  getAllCategorie,
  updateCategorieQuestion,
  deleteCategorieQuestion,
  getOneCategorieQuestion,
  GetSelectCategorieQuestion,
  getNombreQuestionByCategorie,
} from '../controllers/categorieQuestionController.js';
// import { protect, admin } from '../middleware/authMiddleware.js';
import { protectAdmin } from '../middleware/protectAdmin.js';

const router = Router();

router.get('/', protectAdmin, getAllCategorie);
router.get('/nombre', protectAdmin, getNombreQuestionByCategorie);
router.post('/', protectAdmin, createCategorieQuestion);
router.put('/:id', protectAdmin, updateCategorieQuestion);
router.delete('/:id', protectAdmin, deleteCategorieQuestion);
router.get('/:id', protectAdmin, getOneCategorieQuestion);
router.get('/:id/select', protectAdmin, GetSelectCategorieQuestion);

export default router;
