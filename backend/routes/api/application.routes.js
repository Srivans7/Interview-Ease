const express = require('express');
const {Application,Feedback,getStatus,setStatus} = require('../../controllers/application.js'); 


const route = express.Router();

route.post('/form',Application);
route.post('/feedback',Feedback);
route.post('/getStatus',getStatus);
route.post('/setStatus',setStatus);

module.exports = route;