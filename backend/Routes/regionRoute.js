import { Router } from 'express';


import {
  createRegion,
  getAllregion,
  updateRegion,
  deleteRegion,
  searchRegion,
  getOneRegion,
} from '../controllers/regionController.js';
// import { protect,admin } from '../middleware/authMiddleware.js';
import { protectAdmin } from '../middleware/protectAdmin.js';



const router = Router();

router.post('/create',protectAdmin, createRegion);
router.get('/', protectAdmin,getAllregion);
router.get('/:id', protectAdmin, getOneRegion);
router.put('/:id',protectAdmin, updateRegion);
router.delete('/:id', protectAdmin, deleteRegion);
router.get('/search/:value', protectAdmin, searchRegion);

export default router;
