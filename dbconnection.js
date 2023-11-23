const mysql = require('mysql');

class DataBase {
    constructor() {
        this.config = {
            host: 'localhost',
            user: 'uriel',
            password: '123456789',
            database: 'sublimarce01',
        }
        /*this.config = {
            host: 'bf9oexmvjv7umifwuwdu-mysql.services.clever-cloud.com',
            user: 'utykxbwezjt44m3a',
            password: 'OCs10YTeZ47cnQ1Rwddp',
            database: 'bf9oexmvjv7umifwuwdu',
            charset: 'utf8',
        };*/
        this.connection = mysql.createConnection(this.config);
    }

    dbconnection() {
        return this.connection;
    }
}

module.exports = DataBase;