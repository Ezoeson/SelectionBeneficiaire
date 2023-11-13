import { Router } from 'express';

import {
  createDistrict,
  getAlldistrict,
  updatedistrict,
  deletedistrict,
  getONedistrict,
} from '../controllers/districtController.js';
// import { protect, admin } from '../middleware/authMiddleware.js';
import { protectAdmin } from '../middleware/protectAdmin.js';

const router = Router();

router.post('/',protectAdmin, createDistrict);
router.get('/',protectAdmin, getAlldistrict);
router.put('/:id',protectAdmin,updatedistrict);
router.delete('/:id',protectAdmin, deletedistrict);
router.get('/:id',protectAdmin, getONedistrict);

export default router;
