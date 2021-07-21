const mongoose = require('mongoose');

var dietcomponentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
});

mongoose.model('Dietcomponent', dietcomponentSchema);