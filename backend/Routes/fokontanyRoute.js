import { Router } from 'express';
import {
  createfokontany,
  getAllfokontany,
  getOnefokontany,
  updatefokontany,
  deletefokontany,
} from '../controllers/fokontanyController.js';
const router = new Router();

// import { protect, admin } from '../middleware/authMiddleware.js';
import { protectAdmin } from '../middleware/protectAdmin.js';

router.post('/', createfokontany);
router.get('/', getAllfokontany);
router.put('/:id', updatefokontany);
router.delete('/:id', deletefokontany);
router.get('/:id', getOnefokontany);

export default router;
