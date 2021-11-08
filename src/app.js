'use strict'

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const http = require('http');

const app = express();
const router = express.Router();

app.use(express.json());

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
mongoose.connect(
    config.connectionString
)
.then(() => {
    console.log("Conectou ao banco!");
});


app.use('/', (req, res, next) => {
    res.status(200).json({ msg: 'API funcionando!' });
});

const port = process.env.POST;
app.set('port', port);

const server = http.createServer(app);

server.listen(port);