import { Router } from 'express';

import {
  createcommune,
  getAllcommune,
  updatecommune,
  deletecommune,
  getOnecommune,
  getCommuneChart,
} from '../controllers/communeController.js';

const router = Router();

router.post('/', createcommune);
router.get('/', getAllcommune);
router.get('/chart', getCommuneChart);
router.put('/:id', updatecommune);
router.delete('/:id', deletecommune);
router.get('/:id', getOnecommune);

export default router;
