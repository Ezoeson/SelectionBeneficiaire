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
router.get('/nombre', protect, getNombreQuestionByCategorie);
router.post('/', protect, createCategorieQuestion);
router.put('/:id', protect, updateCategorieQuestion);
router.delete('/:id', protect, deleteCategorieQuestion);
router.get('/:id', protect, getOneCategorieQuestion);
router.get('/:id/select', protect, GetSelectCategorieQuestion);

export default router;
