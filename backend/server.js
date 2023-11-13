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

import uploadRoutes from './Routes/uploadRoute.js';
import Dashboard from './Routes/dashboardRoute.js';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/question', Question);
app.use('/api/categorie', CategorieQuestion);
app.use('/api/region', Regions);
app.use('/api/district', District);
app.use('/api/commune', Commune);
app.use('/api/fokontany', Fokontany);

app.use('/api/enqueteur', Enqueteur);
app.use('/api/beneficiaire', Beneficiaire);
app.use('/api/personne', Personne);
app.use('/api/reponse', Reponse);
app.use('/api/formulaire', Formulaire);
app.use('/api/compte', Compte);
app.use('/api/dashboard', Dashboard);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/api/uploads', express.static(path.join(__dirname, '/uploads')));
   
if (process.env.NODE_ENV ==='production'){
  app.use(express.static(path.join(__dirname,"/frontend/dist")));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
  })
} else{
  app.get('/', (req, res) => {
    res.send('Server running');
  });

}

app.listen(PORT, console.log('SERVER RUNNUNG'));
