
//Une application Express est fondamentalement une série de fonctions appelées middleware. Chaque élément de middleware reçoit les objets request et response
// Nous allons utiliser express ici en l'important via la variable qu'on crée const express
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://kaoutarblg:oZ7filxYRIJlT0hV@cluster0.ev0hjtj.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
// Le middleware est général => CORS POLICY
//Ces headers permettent : d'accéder à notre API depuis n'importe quelle origine ( '*' ) ; d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Pour mettre a disposition les json
app.use(bodyParser.json());

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

// On exporter notre app pour qu'on puisse l'y acceder depuis nos fichiers notament notre serveur node
module.exports = app;
