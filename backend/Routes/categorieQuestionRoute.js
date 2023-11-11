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
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', protect, getAllCategorie);
router.get('/nombre', protect, admin, getNombreQuestionByCategorie);
router.post('/', protect, admin, createCategorieQuestion);
router.put('/:id', protect, admin, updateCategorieQuestion);
router.delete('/:id', protect, admin, deleteCategorieQuestion);
router.get('/:id', protect, admin, getOneCategorieQuestion);
router.get('/:id/select', protect, admin, GetSelectCategorieQuestion);

export default router;
