const express = require('express');
const {CreateVacancy,GetVacancy, GetInterviewID} = require('../../controllers/vacancy.js');

const route = express.Router();

route.post('/create',CreateVacancy);
route.get('/getvacancy',GetVacancy);
route.get('/getId/:email/:vacancy',GetInterviewID);


module.exports = route;