const express = require('express');

const { SelectSeatController } = require('../../controllers')
const router = express.Router();


router.post('/',
    SelectSeatController.selectSeat);

module.exports = router;