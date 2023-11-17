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

router.post('/',protect, createcommune);
router.get('/',protect, getAllcommune);
router.get('/chart',protect, getCommuneChart);
router.put('/:id',protect, updatecommune);
router.delete('/:id',protect, deletecommune);
router.get('/:id',protect, getOnecommune);

export default router;
