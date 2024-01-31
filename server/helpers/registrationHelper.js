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

module.exports = {
    getRegistration,
    addRegistration
};