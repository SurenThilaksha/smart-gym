const express = require('express');
const gymrouter = express.Router();

const ctrlGym = require('../controllers/gym.controller');

const jwtHelper = require('../config/jwtHelper');

gymrouter.post('/gymregister', ctrlGym.gym_register);
gymrouter.post('/gymauthenticate', ctrlGym.gym_authenticate);
gymrouter.get('/gymProfile',jwtHelper.gymverifyJwtToken, ctrlGym.gymProfile);

module.exports = gymrouter;