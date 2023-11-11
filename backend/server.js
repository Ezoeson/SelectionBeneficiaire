import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import Question from './Routes/questionRoute.js';
import CategorieQuestion from './Routes/categorieQuestionRoute.js';
import Regions from './Routes/regionRoute.js';
import District from './Routes/districtRoute.js';
import Commune from './Routes/communeRoute.js';
import Fokontany from './Routes/fokontanyRoute.js';

import Enqueteur from './Routes/enqueteurRoute.js';
import Beneficiaire from './Routes/beneficiaireRoute.js';
import Personne from './Routes/personneRoute.js';
import Reponse from './Routes/reponseRoute.js';
import Formulaire from './Routes/formulaireroute.js';
import Compte from './Routes/compteRoute.js';

import uploadRoutes from './routes/uploadRoute.js';
import Dashboard from './Routes/dashboardRoute.js';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/question', Question);
app.use('/categorie', CategorieQuestion);
app.use('/region', Regions);
app.use('/district', District);
app.use('/commune', Commune);
app.use('/fokontany', Fokontany);

app.use('/enqueteur', Enqueteur);
app.use('/beneficiaire', Beneficiaire);
app.use('/personne', Personne);
app.use('/reponse', Reponse);
app.use('/formulaire', Formulaire);
app.use('/compte', Compte);
app.use('/dashboard', Dashboard);
app.use('/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res) => {
  res.send('bienvenu');
});

app.listen(PORT, console.log('SERVER RUNNUNG'));
