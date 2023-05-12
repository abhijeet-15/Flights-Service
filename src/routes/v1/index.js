const express = require('express');

const { InfoController } = require('../../controllers');

const airplaneRoute = require('./airplane-route');

const router = express.Router();

router.use('/airplanes', airplaneRoute);

router.get('/info', InfoController.info);


module.exports =  router;