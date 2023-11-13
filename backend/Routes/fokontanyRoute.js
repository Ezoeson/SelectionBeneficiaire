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

router.post('/',protectAdmin, createfokontany);
router.get('/',protectAdmin, getAllfokontany);
router.put('/:id',protectAdmin, updatefokontany);
router.delete('/:id',protectAdmin, deletefokontany);
router.get('/:id',protectAdmin, getOnefokontany);

export default router;
