const mysql = require('mysql');

class DataBase {
    constructor() {
        this.pool = mysql.createPool({
            host: 'bf9oexmvjv7umifwuwdu-mysql.services.clever-cloud.com',
            user: 'utykxbwezjt44m3a',
            password: 'OCs10YTeZ47cnQ1Rwddp',
            database: 'bf9oexmvjv7umifwuwdu',
            charset: 'utf8',
            connectionLimit: 5,
        });
    }

    dbconnection() {
        return this.pool;
    }
}

module.exports = DataBase;
