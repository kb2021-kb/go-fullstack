
//Une application Express est fondamentalement une série de fonctions appelées middleware. Chaque élément de middleware reçoit les objets request et response
// Nous allons utiliser express ici en l'important via la variable qu'on crée const express
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Thing = require('./models/thing');

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

app.post('/api/stuff/', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
      ...req.body
  });
  thing.save()
    .then( () => res.status(201).json({ message : "Object created !"}))
    .catch(error => res.status(400).json({ error }));
});


app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(thing => res.status(200).json({ message: 'Object updated !!' }))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(thing => res.status(200).json({message: 'Object deleted !!'}))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});

app.get('/api/stuff/',(req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

// On exporter notre app pour qu'on puisse l'y acceder depuis nos fichiers notament notre serveur node
module.exports = app;
