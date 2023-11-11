import { Router } from 'express';

import {
  createcommune,
  getAllcommune,
  updatecommune,
  deletecommune,
  getOnecommune,
  getCommuneChart,
} from '../controllers/communeController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', protect, admin, createcommune);
router.get('/', protect, getAllcommune);
router.get('/chart',protect,admin, getCommuneChart);
router.put('/:id', protect, admin, updatecommune);
router.delete('/:id', protect, admin, deletecommune);
router.get('/:id', protect, admin, getOnecommune);

export default router;
