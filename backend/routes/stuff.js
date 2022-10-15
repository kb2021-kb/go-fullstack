const express = require('express');
const auth = require('auth')

const router = express.Router();

const stuffCtrl = require('../controllers/stuff')

// (CREATE)
router.post('/', auth, stuffCtrl.createThing);

//Pour modifier un produit specifique ( UPDATE )
router.put('/:id', auth, stuffCtrl.modifyThing);

//Pour suppression un produit specifique ( DELETE )
router.delete('/:id', auth, stuffCtrl.deleteThing);

//Pour recuperer un id specifique ( READ +> LECTURE )
router.get('/:id', auth, stuffCtrl.getOneThing);

// api/stuff => la route pour laquelle nous souhaitons enregistrer cet élément de middleware
router.get('/', auth, stuffCtrl.getAllThings);


module.exports = router;