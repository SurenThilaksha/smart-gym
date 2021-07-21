const express = require('express');
const memrouter = express.Router();

const ctrlMem = require('../controllers/mem.controller');

const jwtHelper = require('../config/jwtHelper');

memrouter.post('/memregister', ctrlMem.mem_register);
memrouter.post('/memauthenticate', ctrlMem.mem_authenticate);
memrouter.get('/memProfile',jwtHelper.memverifyJwtToken, ctrlMem.memProfile);

module.exports = memrouter;