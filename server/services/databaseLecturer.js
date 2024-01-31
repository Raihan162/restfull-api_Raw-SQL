const _ = require('lodash');
const mysql = require('promise-mysql2');

const TABLE_LECTURERS = 'lecturers';

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

const getLecturer = async () => {
    try {
        const poolConnection = await connectionPool.getConnection();
        const query = await poolConnection.query(
            `SELECT * FROM ${TABLE_LECTURERS};`
        );
        await poolConnection.connection.release();
        const result = __constructQueryResult(query);

        return Promise.resolve(result);
    } catch (error) {
        return error;
    }
};

const addLecturer = async (name, contact) => {
    try {
        const poolConnection = await connectionPool.getConnection();
        await poolConnection.query(
            `INSERT INTO ${TABLE_LECTURERS} (name, contact) VALUES ('${name}', '${contact}');`
        );
        await poolConnection.connection.release();

        return Promise.resolve([]);
    } catch (error) {
        throw error;
    }
};

const deleteLecturer = async (id) => {
    try {
        const poolConnection = await connectionPool.getConnection();
        const query = await poolConnection.query(
            `SELECT * FROM ${TABLE_LECTURERS} WHERE lecturers.id=${id};`
        );
        await poolConnection.connection.release();
        const result = __constructQueryResult(query);

        if (result.length === 0) {
            throw new Error('ID doesn`t exist');
        } else {
            await poolConnection.query(
                `DELETE FROM ${TABLE_LECTURERS} WHERE lecturers.id=${id};`
            );
            await poolConnection.connection.release();

            return Promise.resolve([]);
        }
    } catch (error) {
        throw error;
    }
};

const updateLecturer = async (request) => {
    const { id } = request.query;
    const { name, contact } = request.body;
    try {
        const poolConnection = await connectionPool.getConnection();
        const query = await poolConnection.query(
            `SELECT * FROM ${TABLE_LECTURERS} WHERE lecturers.id=${id};`
        );
        await poolConnection.connection.release();
        const result = __constructQueryResult(query);

        if (result.length === 0) {
            throw new Error('ID doesn`t exist');
        };

        await poolConnection.query(
            `UPDATE ${TABLE_LECTURERS} SET name = '${name ? name : result[0].name}',contact='${contact ? contact : result[0].contact}' WHERE lecturers.id=${id};`
        );
        await poolConnection.connection.release();

        return Promise.resolve([]);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getLecturer,
    addLecturer,
    deleteLecturer,
    updateLecturer
};