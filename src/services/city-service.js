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

async function getCities() {
    console.log('This is calleds');
    try {
        const city = await cityRepository.getAll();
        return city;
    }

    catch(error) {
        throw new AppError('Cannot ftech data of all city ',
            StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCity(id) {
    try {
        const city = await cityRepository.get(id);
        return city;
    }

    catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The city you requested does not exits', error?.statusCode);
        }
        throw new AppError('Cannot ftech data of all cities ',
            StatusCodes.INTERNAL_SERVER_ERROR);
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

async function updateCity(id, data) {
    try {
        const city = await cityRepository.update(id, data);
        return city;
    }
    catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The city you requested to update does not exits, please create a new one ', error?.statusCode);
        }
        console.log(error.name);
        if(error.name === 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error?.errors.forEach((err) => {
                explanation.push(err?.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        throw new AppError('Cannot fetch data of the city ',
            StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createCity,
    destroyCity,
    updateCity,
    getCities,
    getCity
}