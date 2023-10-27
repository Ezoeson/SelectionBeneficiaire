import { Router } from 'express';
import {
  nombreBeneficiaireByJourBysemaine,
  nombreBeneficiaire,
  userDashboard,
} from '../controllers/dashboardController.js';

const router = new Router();
router.get('/countBef', nombreBeneficiaireByJourBysemaine);
router.get('/', nombreBeneficiaire);

router.get('/user/:id', userDashboard);
// router.get('/personne', personneNote);

export default router;
