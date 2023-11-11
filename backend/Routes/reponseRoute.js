import { Router } from 'express';

import {
  getAllreponse,
  // createReponseAndNote,
  createManyreponse,
} from '../controllers/reponseController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = new Router();

router.get('/',protect, getAllreponse);
// router.post('/', createReponseAndNote);
router.post('/',protect, createManyreponse);

export default router;
