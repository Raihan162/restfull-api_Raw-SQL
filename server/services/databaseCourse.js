const _ = require('lodash');
const mysql = require('promise-mysql2');

const TABLE_LECTURERS = 'lecturers';
const TABLE_COURSES = 'courses';

const connectionPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'jcwd2302',
    database: 'phincon_academy',
    port: '3306',
});

// PRIVATE FUNCTION
const __constructQueryResult = (query) => {
    const result = [];
    if (!_.isEmpty(query[0])) {
        query[0].forEach((item) => {
            const key = Object.keys(item);

            // Reconstruct query result
            const object = {};
            key.forEach((data) => {
                object[data] = item[data];
            });

            result.push(object);
        });
    }

    return result;
};

// PUBLIC FUNCTION

const getCourse = async () => {
    try {
        const poolConnection = await connectionPool.getConnection();
        const query = await poolConnection.query(
            `SELECT courses.id as CourseID, courses.title as Title, lecturers.name as LecturerName, lecturers.contact as LecturersContact FROM ${TABLE_COURSES} INNER JOIN ${TABLE_LECTURERS} ON lecturers.id=courses.lecturers_id;`
        );
        await poolConnection.connection.release();
        const result = __constructQueryResult(query);

        return Promise.resolve(result);
    } catch (error) {
        throw error;
    }
};

const addCourse = async (title, lecturers_id) => {
    try {
        const poolConnection = await connectionPool.getConnection();
        await poolConnection.query(
            `INSERT INTO ${TABLE_COURSES} (title, lecturers_id) VALUES ('${title}', ${lecturers_id});`
        );
        await poolConnection.connection.release();

        return Promise.resolve([]);
    } catch (error) {
        throw error;
    }
};

const deleteCourses = async (id) => {
    try {
        const poolConnection = await connectionPool.getConnection();
        const query = await poolConnection.query(
            `SELECT * FROM ${TABLE_COURSES} WHERE courses.id=${id};`
        );
        await poolConnection.connection.release();
        const result = __constructQueryResult(query);

        if (result.length === 0) {
            throw new Error('ID doesn`t exist');
        } else {
            const poolConnection = await connectionPool.getConnection();
            await poolConnection.query(
                `DELETE FROM ${TABLE_COURSES} WHERE courses.id=${id};`
            );
            await poolConnection.connection.release();

            return Promise.resolve([]);
        }
    } catch (error) {
        throw error;
    }
};

const updateCourses = async (request) => {
    const { id } = request.query;
    const { title, lecturers_id } = request.body;
    try {
        const poolConnection = await connectionPool.getConnection();
        const query = await poolConnection.query(
            `SELECT * FROM ${TABLE_COURSES} WHERE courses.id=${id};`
        );
        const result = __constructQueryResult(query);

        if (result.length === 0) {
            throw new Error('ID doesn`t exist');
        }

        await poolConnection.query(
            `UPDATE ${TABLE_COURSES} SET title = '${title ? title : result[0].title}',lecturers_id='${lecturers_id ? lecturers_id : result[0].lecturers_id}' WHERE courses.id=${id};`
        );
        await poolConnection.connection.release();

        return Promise.resolve([]);
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