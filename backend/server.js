const express = require('express');
const connectToDatabase = require('./config/db.config.js')
const cors = require("cors")
const dotenv = require('dotenv');
dotenv.config({ path: './.env'});

const PORT = 4000;
const app = express();
const allRoutes = require('./routes/index.js');

connectToDatabase();


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
  
app.use(express.json());
app.use('/',allRoutes);
app.listen(PORT , ()=>{
    console.log(`server is running on ${PORT}`);
})