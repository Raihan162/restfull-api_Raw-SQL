const database = require('../services/databaseRegistration');

const getRegistration = async () => {

    try {
        const response = await database.getRegistration();

        return Promise.resolve(response);
    } catch (error) {
        throw error;
    }
};

const addRegistration = async (students_id, courses_id) => {
    try {
        const response = await database.addRegistration(students_id, courses_id);

        return Promise.resolve(response);
    } catch (error) {
        throw error;
    }
};

const deleteRegistration = async (id) => {
    try {
        const response = await database.deleteRegistration(id);

        return Promise.resolve(response);
    } catch (error) {
        throw error;
    }
};

const updateRegistration = async (request) => {
    try {
        const response = await database.updateRegistration(request);

        return Promise.resolve(response);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getRegistration,
    addRegistration,
    deleteRegistration,
    updateRegistration
};