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

router.post('/create', createRegion);
router.get('/', getAllregion);
router.get('/:id', protectAdmin, getOneRegion);
router.put('/:id', updateRegion);
router.delete('/:id',  deleteRegion);
router.get('/search/:value',  searchRegion);

export default router;
