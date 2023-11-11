import { Router } from 'express';
import {
  getAllPersonne,
  createPersonne,
  updatePersonne,
  getOnepersonne,
  deletePersonne,
  searchAndFetchAllPersonnes,
} from '../controllers/PersonneController.js';

const router = new Router();
import { protect, admin } from '../middleware/authMiddleware.js';

router.get('/',protect, getAllPersonne);
router.post('/',protect, createPersonne);
router.put('/:id',protect, updatePersonne);
router.delete('/:id',protect, deletePersonne);
router.get('/:id',protect, getOnepersonne);

router.get('/searchAll/search',protect, searchAndFetchAllPersonnes);

export default router;
