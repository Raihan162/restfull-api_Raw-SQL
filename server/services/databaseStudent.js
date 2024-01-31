const _ = require('lodash');
const mysql = require('promise-mysql2');

const TABLE_STUDENTS = 'students';

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

const getStudent = async () => {
    try {
        const poolConnection = await connectionPool.getConnection();
        const query = await poolConnection.query(
            `SELECT * FROM ${TABLE_STUDENTS};`
        );
        await poolConnection.connection.release();
        const result = __constructQueryResult(query);

        return Promise.resolve(result);
    } catch (error) {
        return error;
    }
};

const addStudent = async (name, major, contact) => {
    try {
        const poolConnection = await connectionPool.getConnection();
        const query = await poolConnection.query(
            `INSERT INTO ${TABLE_STUDENTS} (name, major, contact) VALUES ('${name}', '${major}', '${contact}');`
        );
        await poolConnection.connection.release();

        return Promise.resolve([]);
    } catch (error) {
        return error;
    }
};

const deleteStudent = async (id) => {
    try {
        const poolConnection = await connectionPool.getConnection();
        const query = await poolConnection.query(
            `SELECT * FROM ${TABLE_STUDENTS} WHERE students.id=${id};`
        );
        await poolConnection.connection.release();
        const result = __constructQueryResult(query);

        if (result.length === 0) {
            return Promise.resolve(result);
        } else {
            const poolConnection = await connectionPool.getConnection();
            const query = await poolConnection.query(
                `DELETE FROM students WHERE students.id=${id};`
            );
            await poolConnection.connection.release();

            return Promise.resolve([]);
        }
    } catch (error) {
        return error;
    }
};

const updateStudent = async (request) => {
    const { id } = request.query
    const { name, major, contact } = request.body
    try {
        const poolConnection = await connectionPool.getConnection();
        const query = await poolConnection.query(
            `SELECT * FROM students WHERE students.id=${id};`
        );
        await poolConnection.connection.release();
        const result = __constructQueryResult(query);

        if (result.length === 0) {
            throw new Error('ID doesn`t exist')
        }

        await poolConnection.query(
            `UPDATE students SET name = '${name ? name : result[0].name}', major = '${major ? major : result[0].major}', contact='${contact ? contact : result[0].contact}' WHERE students.id=${id};`
        );
        await poolConnection.connection.release();

        return Promise.resolve([]);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getStudent,
    addStudent,
    deleteStudent,
    updateStudent
};