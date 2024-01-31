const database = require('../services/databaseCourse');

const getCourse = async () => {
    try {
        const response = await database.getCourse();

        return Promise.resolve(response);
    } catch (error) {
        throw error;
    }
};

const addCourse = async (title, lecturers_id) => {
    try {
        const response = await database.addCourse(title, lecturers_id);

        return Promise.resolve(response);
    } catch (error) {
        throw error;
    }
};

const deleteCourses = async (id) => {
    try {
        const response = await database.deleteCourses(id);

        return Promise.resolve(response);
    } catch (error) {
        throw error;
    }
};

const updateCourses = async (request) => {
    try {
        const response = await database.updateCourses(request);

        return Promise.resolve(response);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getCourse,
    addCourse,
    deleteCourses,
    updateCourses
};