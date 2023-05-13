const {StatusCodes} = require('http-status-codes');

const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch(error) {
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new city object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id) {
    try {
        const city = await cityRepository.destroy(id);
        return city;
    }

    catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The city you requested to delete does not exits', error?.statusCode);
        }
        throw new AppError('Cannot ftech data of the city ',
            StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

module.exports = {
    createCity,
    destroyCity
}