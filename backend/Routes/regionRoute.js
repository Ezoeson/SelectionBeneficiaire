import { Router } from 'express';


import {
  createRegion,
  getAllregion,
  updateRegion,
  deleteRegion,
  searchRegion,
  getOneRegion,
} from '../controllers/regionController.js';

import { protect,admin } from '../middleware/authMiddleware.js';




const router = Router();

router.post('/create',protect, createRegion);
router.get('/',protect, getAllregion);
router.get('/:id',protect, getOneRegion);
router.put('/:id', updateRegion);
router.delete('/:id',protect,  deleteRegion);
router.get('/search/:value',protect,  searchRegion);

export default router;
