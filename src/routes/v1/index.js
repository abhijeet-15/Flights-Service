const express = require('express');

const { InfoController } = require('../../controllers');

const airplaneRoutes = require('./airplane-routes');
const flightRoutes = require('./flight-routes');
const cityRoutes = require('./city-routes');
const airportRoutes = require('./airport-routes');
const selectSeatRoute = require('./select-seat-route');

const router = express.Router();

router.use('/airplanes', airplaneRoutes);
router.use('/cities', cityRoutes);
router.use('/airports',airportRoutes);
router.use('/flights',flightRoutes);
router.use('/selectSeats',selectSeatRoute);


router.get('/info', InfoController.info);


module.exports = router;