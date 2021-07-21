const express = require('express');
const dietcomponentrouter = express.Router();

const ctrlDietcomponent = require('../controllers/dietcomponent.controller');

dietcomponentrouter.post('/createdietcomponents', ctrlDietcomponent.dietcomponent_add);
dietcomponentrouter.get('/dietcomponentslist', ctrlDietcomponent.dietcomponent_list);

module.exports = dietcomponentrouter;