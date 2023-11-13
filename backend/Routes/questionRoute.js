import { Router } from 'express';
import {
  createQuestion,
  getAllQuestion,
  updateQuestion,
  deleteQuestion,
  getOneQuestion,
} from '../controllers/questionController.js';
// import { protect, admin } from '../middleware/authMiddleware.js';
import { protectAdmin } from '../middleware/protectAdmin.js';

const router = Router();

router.post('/',protectAdmin, createQuestion);
router.get('/search/:search_value', protectAdmin, getAllQuestion);
router.put('/:id', protectAdmin, updateQuestion);
router.delete('/:id', protectAdmin, deleteQuestion);
router.get('/:id', protectAdmin, getOneQuestion);

export default router;
