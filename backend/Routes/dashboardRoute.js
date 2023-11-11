import { Router } from 'express';
import {
  nombreBeneficiaireByJourBysemaine,
  nombreBeneficiaire,
  userDashboard,
  getBeneficiaireCountByDate
} from '../controllers/dashboardController.js';


import { protect, admin } from '../middleware/authMiddleware.js';

const router = new Router();
router.get('/countBef', nombreBeneficiaireByJourBysemaine);
router.get('/',protect, nombreBeneficiaire);
router.get('/date',protect, getBeneficiaireCountByDate);

router.get('/user/:id',protect, userDashboard);
// router.get('/personne', personneNote);

export default router;
