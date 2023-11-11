import { Router } from 'express';

import {
  createDistrict,
  getAlldistrict,
  updatedistrict,
  deletedistrict,
  getONedistrict,
} from '../controllers/districtController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/',protect,admin, createDistrict);
router.get('/',protect, getAlldistrict);
router.put('/:id',protect,admin, updatedistrict);
router.delete('/:id',protect,admin, deletedistrict);
router.get('/:id',protect,admin, getONedistrict);

export default router;
