// import { Router } from "express";
const express = require('express');
const userRoutes = require('./api/candidate.routes.js') ;
const ApplicationRoutes = require('./api/application.routes.js');
const VacancyRoutes = require('./api/vacancy.routes.js');


const routes = express.Router();

routes.use('/candidate',userRoutes);
routes.use('/application',ApplicationRoutes);
routes.use('/vacancy',VacancyRoutes);

module.exports = routes;