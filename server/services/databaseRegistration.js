const _ = require('lodash');
const mysql = require('promise-mysql2');

const TABLE_REGISTRATION = 'registrations';

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

const addRegistration = async (students_id, courses_id) => {
    try {
        const poolConnection = await connectionPool.getConnection();
        await poolConnection.query(
            `INSERT INTO ${TABLE_REGISTRATION} (students_id, courses_id) VALUES (${students_id}, ${courses_id});`
        );
        await poolConnection.connection.release();

        return Promise.resolve([]);
    } catch (error) {
        throw error;
    }
};

const getRegistration = async () => {
    try {
        const poolConnection = await connectionPool.getConnection();
        const query = await poolConnection.query(
            `SELECT
                registrations.id AS RegistrationID,
                students.id AS StudentID,
                students.name AS StudentName,
                students.major AS StudentMajor,
                students.contact AS StudentContact,
                courses.title AS CourseName,
                lecturers.name as LecturerName,
                lecturers.contact as LecturerContact
            FROM
                ${TABLE_REGISTRATION}
                    INNER JOIN
                students ON students.id = registrations.students_id
                    INNER JOIN
                courses ON courses.id = registrations.courses_id
                    INNER JOIN
                lecturers ON lecturers.id = courses.lecturers_id;`
        );
        await poolConnection.connection.release();
        const result = __constructQueryResult(query);

        return Promise.resolve(result);
    } catch (error) {
        throw error;
    }
};

const deleteRegistration = async (id) => {
    try {
        const poolConnection = await connectionPool.getConnection();
        const query = await poolConnection.query(
            `SELECT * FROM ${TABLE_REGISTRATION} WHERE registrations.id=${id};`
        );
        await poolConnection.connection.release();
        const result = __constructQueryResult(query);

        if (result.length === 0) {
            throw new Error('ID doesn`t exist');
        } else {
            const poolConnection = await connectionPool.getConnection();
            await poolConnection.query(
                `DELETE FROM ${TABLE_REGISTRATION} WHERE registrations.id=${id};`
            );
            await poolConnection.connection.release();

            return Promise.resolve([]);
        }
    } catch (error) {
        throw error;
    }
};

const updateRegistration = async (request) => {
    const { id } = request.query;
    const { students_id, courses_id } = request.body;
    try {
        const poolConnection = await connectionPool.getConnection();
        const query = await poolConnection.query(
            `SELECT * FROM ${TABLE_REGISTRATION} WHERE registrations.id=${id};`
        );
        const result = __constructQueryResult(query);

        if (result.length === 0) {
            throw new Error('ID doesn`t exist');
        }

        await poolConnection.query(
            `UPDATE ${TABLE_REGISTRATION} SET students_id = '${students_id ? students_id : result[0].students_id}',courses_id='${courses_id ? courses_id : result[0].courses_id}' WHERE registrations.id=${id};`
        );
        await poolConnection.connection.release();

        return Promise.resolve([]);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    addRegistration,
    getRegistration,
    deleteRegistration,
    updateRegistration
};