const database = require('../services/databaseStudent');

const getStudentList = async () => {

    try {
        const response = await database.getStudent();

        return Promise.resolve(response);
    } catch (error) {
        throw error;
    }
};

const addStudent = async (dataObject) => {
    const { name, major, contact } = dataObject
    try {
        const response = await database.addStudent(name, major, contact);

        return Promise.resolve(response);
    } catch (error) {
        throw error;
    }
};

const deleteStudent = async (id) => {
    try {
        const response = await database.deleteStudent(id);

        return Promise.resolve(response);
    } catch (error) {
        throw error;
    }
};

const updateStudent = async (request) => {
    try {
        const response = await database.updateStudent(request);

        return Promise.resolve(response);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getStudentList,
    addStudent,
    deleteStudent,
    updateStudent
};