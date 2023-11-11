import { Router } from 'express';
import {
  createfokontany,
  getAllfokontany,
  getOnefokontany,
  updatefokontany,
  deletefokontany,
} from '../controllers/fokontanyController.js';
const router = new Router();

import { protect, admin } from '../middleware/authMiddleware.js';

router.post('/',protect,admin, createfokontany);
router.get('/',protect, getAllfokontany);
router.put('/:id',protect,admin, updatefokontany);
router.delete('/:id',protect,admin, deletefokontany);
router.get('/:id',protect,admin, getOnefokontany);

export default router;
