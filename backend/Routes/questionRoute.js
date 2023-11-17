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

router.post('/', protect, createQuestion);
router.get('/search/:search_value', protect, getAllQuestion);
router.put('/:id', protect, updateQuestion);
router.delete('/:id', protect, deleteQuestion);
router.get('/:id', protect, getOneQuestion);

export default router;
