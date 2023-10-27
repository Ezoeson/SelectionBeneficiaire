import { Router } from 'express';

import {
  createDistrict,
  getAlldistrict,
  updatedistrict,
  deletedistrict,
  getONedistrict,
} from '../controllers/districtController.js';

const router = Router();

router.post('/', createDistrict);
router.get('/', getAlldistrict);
router.put('/:id', updatedistrict);
router.delete('/:id', deletedistrict);
router.get('/:id', getONedistrict);

export default router;
