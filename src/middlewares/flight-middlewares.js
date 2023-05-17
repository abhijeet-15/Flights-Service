const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

const  { DateTimeHelper, ValidatePrice }  = require('../utils/helpers');


function validateCreateRequest(req, res, next) {

    const missingFields = [];
    
    if(!req.body.flightNumber) {
        missingFields.push('flightNumber');
    }

    if(!req.body.airplaneId) {
        missingFields.push('airplaneId');
    }

    if(!req.body.departureAirportId) {
        missingFields.push('departureAirportId');
    }

    if(!req.body.arrivalAirportId) {
        missingFields.push('arrivalAirportId');
    }

    if(!req.body.arrivalTime) {
        missingFields.push('arrivalTime');
    }

    if(!req.body.departureTime) {
        missingFields.push('departureTime');
    }

    if(!req.body.price) {
        missingFields.push('price');
    }

    if(!req.body.totalSeats) {
        missingFields.push('totalSeats');
    }

    if(missingFields?.length > 0) {
        ErrorResponse.message = 'Something went wrong while creating the airport';
        ErrorResponse.error = new AppError([` ${missingFields.toString()} not found in the incoming request in the correct form`], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    //arrival time should be less than  the departure time

    if(!DateTimeHelper.compareTime(req.body.arrivalTime, req.body.departureTime)) {
        ErrorResponse.message = 'Something went wrong while creating the airport';
        ErrorResponse.error = new AppError(['Departure time cannot be greater than the arrival time'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(ValidatePrice.isPriceNegative(req.body.price)) {
        ErrorResponse.message = 'Something went wrong while creating the airport';
        ErrorResponse.error = new AppError(['Price of the flight cannot be negative'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    
   
    next(); 
}

module.exports =  {
    validateCreateRequest
}