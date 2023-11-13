import { Router } from 'express';

import {
  createcommune,
  getAllcommune,
  updatecommune,
  deletecommune,
  getOnecommune,
  getCommuneChart,
} from '../controllers/communeController.js';

// import { protect, admin } from '../middleware/authMiddleware.js';
import { protectAdmin } from '../middleware/protectAdmin.js';

const router = Router();

router.post('/', protectAdmin, createcommune);
router.get('/', protectAdmin, getAllcommune);
router.get('/chart', protectAdmin, getCommuneChart);
router.put('/:id', protectAdmin, updatecommune);
router.delete('/:id', protectAdmin, deletecommune);
router.get('/:id', protectAdmin, getOnecommune);

export default router;
