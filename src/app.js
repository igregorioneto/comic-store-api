'use strict'

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../src/swagger.json');

const app = express(express.json());
const router = express.Router();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

// Models
const User = require('./models/user');
const Category = require('./models/category');
const Comic = require('./models/comic');
const Store = require('./models/store');

// Routes
const userRoute = require('./routes/user-router');
const categoryRoute = require('./routes/category-router');
const comicRoute = require('./routes/comic-router');
const storeRoute = require('./routes/store-router');

// Routes - Usando rotas
app.use('/users', userRoute);
app.use('/categories', categoryRoute);
app.use('/comics', comicRoute);
app.use('/stores', storeRoute);

mongoose.connect(
    config.connectionString
)
.then(() => {
    console.log("Server is running on port 3000");
    app.listen(process.env.PORT);
});