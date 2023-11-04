const mysql = require('mysql');

class DataBase {
    constructor() {
<<<<<<< HEAD
        this.config = {
=======
       /* this.config = {
>>>>>>> 9bee1f85dffe8dcd8777501557c00504dd51912a
            host: 'bf9oexmvjv7umifwuwdu-mysql.services.clever-cloud.com',
            user: 'utykxbwezjt44m3a',
            password: 'OCs10YTeZ47cnQ1Rwddp',
            database: 'bf9oexmvjv7umifwuwdu',
            charset: 'utf8',
        }*/
        this.config = {
            host: 'localhost',
            user: 'uriel',
            password: '123456789',
            database: 'sublimarce01',
        };
        this.connection = mysql.createConnection(this.config);
    }

    dbconnection() {
        return this.connection;
    }
}

module.exports = DataBase;