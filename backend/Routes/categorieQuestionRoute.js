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

const router = Router();

router.get('/', getAllCategorie);
router.get('/nombre', getNombreQuestionByCategorie);
router.post('/', createCategorieQuestion);
router.put('/:id', updateCategorieQuestion);
router.delete('/:id', deleteCategorieQuestion);
router.get('/:id', getOneCategorieQuestion);
router.get('/:id/select', GetSelectCategorieQuestion);

export default router;
