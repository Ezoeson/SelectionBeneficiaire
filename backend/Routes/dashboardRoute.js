import { Router } from 'express';
import {
  nombreBeneficiaireByJourBysemaine,
  nombreBeneficiaire,
  userDashboard,
  getBeneficiaireCountByDate
} from '../controllers/dashboardController.js';

const router = new Router();
router.get('/countBef', nombreBeneficiaireByJourBysemaine);
router.get('/', nombreBeneficiaire);
router.get('/date', getBeneficiaireCountByDate);

router.get('/user/:id', userDashboard);
// router.get('/personne', personneNote);

export default router;
