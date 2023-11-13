import { Router } from 'express';
import {
  nombreBeneficiaireByJourBysemaine,
  nombreBeneficiaire,
  userDashboard,
  getBeneficiaireCountByDate
} from '../controllers/dashboardController.js';


// import { protect, admin } from '../middleware/authMiddleware.js';
import { protectAdmin } from '../middleware/protectAdmin.js';

const router = new Router();
router.get('/countBef', nombreBeneficiaireByJourBysemaine);
router.get('/',protectAdmin, nombreBeneficiaire);
router.get('/date',protectAdmin, getBeneficiaireCountByDate);

router.get('/user/:id',protectAdmin, userDashboard);
// router.get('/personne', personneNote);

export default router;
