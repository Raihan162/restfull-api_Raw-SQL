const Router = require('express').Router();

const CourserHelper = require('../helpers/courseHelper');

const listCourse = async (request, reply) => {
    try {
        const response = await CourserHelper.getCourse()
        return reply
            .status(200)
            .send({
                message: 'Get All Course Success!',
                response
            });
    } catch (err) {
        return reply
            .status(400)
            .send({
                message: err
            });
    }
}

Router.get('/list-course', listCourse);

module.exports = Router;