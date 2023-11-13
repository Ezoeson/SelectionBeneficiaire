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
// import { protect, admin } from '../middleware/authMiddleware.js';
import { protectAdmin } from '../middleware/protectAdmin.js';

router.get('/',protectAdmin, getAllPersonne);
router.post('/',protectAdmin, createPersonne);
router.put('/:id',protectAdmin, updatePersonne);
router.delete('/:id',protectAdmin, deletePersonne);
router.get('/:id',protectAdmin, getOnepersonne);

router.get('/searchAll/search',protectAdmin, searchAndFetchAllPersonnes);

export default router;
