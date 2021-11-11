'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/comic-controller');
const authService = require('../services/auth-service');

router.get('/', authService.authorize, controller.get);
router.post('/', authService.authorize, controller.createComic);

module.exports = router;