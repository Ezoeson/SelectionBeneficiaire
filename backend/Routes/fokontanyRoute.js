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


router.post('/',protect, createfokontany);
router.get('/',protect, getAllfokontany);
router.put('/:id',protect, updatefokontany);
router.delete('/:id',protect, deletefokontany);
router.get('/:id',protect, getOnefokontany);

export default router;
