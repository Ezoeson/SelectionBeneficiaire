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
// import { protectAdmin } from '../middleware/protectAdmin.js';

router.get('/', getAllPersonne);
router.post('/', createPersonne);
router.put('/:id', updatePersonne);
router.delete('/:id', deletePersonne);
router.get('/:id', getOnepersonne);

router.get('/searchAll/search', searchAndFetchAllPersonnes);

export default router;
