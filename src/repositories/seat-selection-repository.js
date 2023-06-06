const { StatusCodes } = require('http-status-codes');
const CrudRepository = require('./crud-repository');
const { Seat_Flight_Booking  } = require('../models');
const AppError = require('../utils/errors/app-error');

class SeatSelectionRepository extends CrudRepository {
    constructor() {
        super(Seat_Flight_Booking);
    }

    async selectSeat(data, transaction) { // data -> {col: value, ....}
        try {
            const response = await this.model.create(data, {transaction: transaction});
            console.log(response);
            console.log("Response is ", response);
        } catch (error) {
            throw error;
        }
    }
}

module.exports  = SeatSelectionRepository;