const express = require('express');

const { CityController } = require('../../controllers')
const { CityMiddlewares } = require('../../middlewares');
const router = express.Router();

// /api/v1/cities POST
router.post('/',
    CityMiddlewares.validateCreateRequest,
    CityController.createCity);

router.delete('/:id',
    CityController.destroyCity);

router.patch('/:id',
    CityMiddlewares.validateCreateRequest,
    CityController.updateCity);

module.exports = router;