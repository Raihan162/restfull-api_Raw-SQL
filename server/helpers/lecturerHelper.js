const database = require('../services/databaseLecturer');

const getLecturerList = async () => {

    try {
        const response = await database.getLecturer();

        return Promise.resolve(response);
    } catch (error) {
        throw error;
    }
};

const addLecturer = async (dataObject) => {
    const { name, contact } = dataObject;
    try {
        const response = await database.addLecturer(name, contact);

        return Promise.resolve(response);
    } catch (error) {
        throw error;
    }
};

const deleteLecturer = async (id) => {
    try {
        const response = await database.deleteLecturer(id);

        return Promise.resolve(response);
    } catch (error) {
        throw error;
    }
};

const updateLecturer = async (request) => {
    try {
        const response = await database.updateLecturer(request);

        return Promise.resolve(response);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getLecturerList,
    addLecturer,
    deleteLecturer,
    updateLecturer
};