'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-controller');
const authService = require('../services/auth-service');

router.get('/', controller.get);
router.get('/:id', controller.getById);

router.put('/:id',authService.authorize, controller.put);
router.delete('/:id',authService.authorize, controller.delete);

router.post('/', controller.post);
router.post('/authenticate', controller.authenticate);
router.post('/logout', authService.authorize, controller.logout);

module.exports = router;