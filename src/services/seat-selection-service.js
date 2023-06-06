const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');
const db = require('../models');
const { SeatSelectionRepository } =  require('../repositories');
const AppError = require('../utils/errors/app-error');

const seatSelectionRepository = new SeatSelectionRepository();

async function selectSeat(data) {
    const transaction = await db.sequelize.transaction();
    try {
        console.log("inside try");
        const response = await seatSelectionRepository.selectSeat({seatId: data.seatId, flightId: data.flightId }, transaction);
        await transaction.commit();
        console.log("response in service ",response);
        return response;
    } catch(error) {
        await transaction.rollback();
        console.log("inside catch");
        if(error.name === 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error?.errors.forEach((err) => {
                explanation.push(err?.message);
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        console.log("inside catch 2");
        throw new AppError('Cannot confirm the selected seat',
            StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    selectSeat,
}


