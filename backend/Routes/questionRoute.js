import { Router } from 'express';
import {
  createQuestion,
  getAllQuestion,
  updateQuestion,
  deleteQuestion,
  getOneQuestion,
} from '../controllers/questionController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/',protect,admin, createQuestion);
router.get('/search/:search_value', protect, getAllQuestion);
router.put('/:id', protect, admin, updateQuestion);
router.delete('/:id', protect, admin, deleteQuestion);
router.get('/:id', protect, admin, getOneQuestion);

export default router;
