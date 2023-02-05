require('dotenv').config();

const express = require('express');

const app = express();

const { PORT }= require('./config/auth')

const dbconnect = require("./db/dbconnect");

const router = require('./router')

const cors = require ('cors')

//Configuro cors
let corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

//Middlewares
app.use(cors(corsOptions));

app.use(express.json());

app.use(router);


dbconnect();

app.listen(PORT, ()=> console.log(`Node server running on http://localhost:5500`))