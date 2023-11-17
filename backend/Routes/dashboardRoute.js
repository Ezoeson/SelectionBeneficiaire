import { Router } from 'express';
import {
  nombreBeneficiaireByJourBysemaine,
  nombreBeneficiaire,
  userDashboard,
  getBeneficiaireCountByDate,
} from '../controllers/dashboardController.js';

import { protect, admin } from '../middleware/authMiddleware.js';
import { protectAdmin } from '../middleware/protectAdmin.js';

const router = new Router();
router.get('/countBef', protect, nombreBeneficiaireByJourBysemaine);
router.get('/', nombreBeneficiaire);
router.get('/date',protect, getBeneficiaireCountByDate);

router.get('/user/:id', userDashboard);
// router.get('/personne', personneNote);

export default router;
