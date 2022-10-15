const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// unique: pour ne pas avoir bcp de user avec meme @
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

// Pour exploiter le schema ( lire et lire sur la DB ) on doit l'exporter
module.exports = mongoose.model('User', userSchema);