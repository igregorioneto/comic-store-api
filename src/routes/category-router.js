'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/category-controller');
const authService = require('../services/auth-service');

router.get('/', authService.authorize, controller.get);
router.post('/', authService.authorize, controller.createCategory);

module.exports = router;