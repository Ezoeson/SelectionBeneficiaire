import { Router } from 'express';

import {
  getAllreponse,
  // createReponseAndNote,
  createManyreponse,
} from '../controllers/reponseController.js';
// import { protect, admin } from '../middleware/authMiddleware.js';
import { protectAdmin } from '../middleware/protectAdmin.js';

const router = new Router();

router.get('/',protectAdmin, getAllreponse);
// router.post('/', createReponseAndNote);
router.post('/',protectAdmin, createManyreponse);

export default router;
