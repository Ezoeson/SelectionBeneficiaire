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

router.post('/create',protect,admin, createRegion);
router.get('/', protect,getAllregion);
router.get('/:id', protect, admin, getOneRegion);
router.put('/:id',protect,admin, updateRegion);
router.delete('/:id', protect, admin, deleteRegion);
router.get('/search/:value', protect, admin, searchRegion);

export default router;
