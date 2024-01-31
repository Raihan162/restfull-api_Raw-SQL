const database = require('../services/databaseCourse');

const getCourse = async () => {

    try {
        const response = await database.getCourse();

        return Promise.resolve(response);
    } catch (error) {
        console.log(error)
        throw Promise.resolve(error);
    }
};

module.exports = {
    getCourse
};