import { Router } from 'express';

import {
  getAllreponse,
  // createReponseAndNote,
  createManyreponse,
} from '../controllers/reponseController.js';

const router = new Router();

router.get('/', getAllreponse);
// router.post('/', createReponseAndNote);
router.post('/', createManyreponse);

export default router;
