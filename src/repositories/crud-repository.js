const  { Logger } = require('../config');

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async destroy(data) {

        try {
            const response = this.model.destroy({
                where: {
                    id : data
                }
            });
    
            return response;

        }
        catch(error) {
            Logger.error(`Something went wrong in the CRUD repository: destroy`);
            throw error;
        }
        
    }

    async get(data) {
        try {
            const response = this.model.findByPk(data);
            return response;

        }
        catch(error) {
            Logger.error(`Something went wrong in the CRUD repository: destroy`);
            throw error;
        }
        
    }

    async getAll() {
        try {
            const response = this.model.findAll();
            return response;

        }
        catch(error) {
            Logger.error(`Something went wrong in the CRUD repository: destroy`);
            throw error;
        }
        
    }

    async update(id, data) { // data --> {col:value, col2:value...}
        try {
            const response = this.model.update(data, {
                where : {
                    id : id
                }
            });
            return response;

        }
        catch(error) {
            Logger.error(`Something went wrong in the CRUD repository: destroy`);
            throw error;
        }
        
    }
}

module.exports = CrudRepository;