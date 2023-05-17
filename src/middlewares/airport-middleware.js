const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');


function validateCreateRequest(req, res, next) {

    const missingFields = [];
    
    if(!req.body.name) {
        missingFields.push('name');
    }

    if(!req.body.code) {
        missingFields.push('code');
    }

    if(!req.body.cityId) {
        missingFields.push('cityId');
    }

    if(missingFields?.length > 0) {
        ErrorResponse.message = 'Something went wrong while creating the airport';
        ErrorResponse.error = new AppError([` ${missingFields.toString()} not found in the incoming request in the correct form`], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    
    next();
}

module.exports =  {
    validateCreateRequest
}