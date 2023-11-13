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

router.post('/', createQuestion);
router.get('/search/:search_value',  getAllQuestion);
router.put('/:id',  updateQuestion);
router.delete('/:id',  deleteQuestion);
router.get('/:id',  getOneQuestion);

export default router;
