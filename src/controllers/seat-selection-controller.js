const { SeatSelectionService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function selectSeat(req, res) {
    try {
        //console.log(req.body.seatId , req.body.flightId);
        const response = await SeatSelectionService.selectSeat({
            seatId: req.body.seatId,
            flightId: req.body.flightId
        });
        SuccessResponse.message = "Successfully booked a seat in flight";
        SuccessResponse.data = response;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    }
    catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports = {
    selectSeat
}