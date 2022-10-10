const mongoose = require('mongoose');

// On crée un schema pour que l'app soit robuste
const thingSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
});

// Pour exploiter le schema ( lire et lire sur la DB ) on doit l'exporter
module.exports = mongoose.model('Thing', thingSchema);