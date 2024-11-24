// services/daoFactoryService.js
class DAOFactoryService {
    constructor() {
        this.daos = [];
    }

    getAllDAOs() {
        return this.daos;
    }

    createDAO(name, members) {
        const newDAO = { id: this.daos.length + 1, name, members };
        this.daos.push(newDAO);
        return newDAO;
    }
}

export default new DAOFactoryService();
