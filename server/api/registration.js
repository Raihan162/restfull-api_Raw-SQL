const Router = require('express').Router();

const Validation = require('../helpers/validationHelper');
const RegistrationHelper = require('../helpers/registrationHelper');

const addRegistration = async (request, reply) => {
    try {
        const { students_id, courses_id } = request.body;

        const response = await RegistrationHelper.addRegistration(students_id, courses_id);

        return reply
            .status(200)
            .send({
                message: 'Add Registration Success!',
                response
            });
    } catch (error) {
        return reply
            .status(400)
            .send({
                message: 'Add Registration Failed!',
                error: error?.message
            });
    }
};

const getRegistration = async (request, reply) => {
    try {
        const response = await RegistrationHelper.getRegistration();

        return reply
            .status(200)
            .send({
                message: 'Add Registration Success!',
                response
            });
    } catch (error) {
        return reply
            .status(400)
            .send({
                message: 'Add Registration Failed!',
                error: error?.message
            });
    }
};

Router.post('/add', addRegistration);
Router.get('/list', getRegistration);

module.exports = Router;