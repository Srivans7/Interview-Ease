const express = require('express');
const {RegisterCandidate , SignIn} = require('../../controllers/auth.js'); 

const route = express.Router();

route.post('/signup',RegisterCandidate);
route.post('/signin',SignIn);

module.exports = route;