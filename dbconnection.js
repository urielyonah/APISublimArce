const mysql = require('mysql2');

class DataBase {
    constructor() {
        this.config = {
            host: 'bcmlczdfdr70zryw2gw4-mysql.services.clever-cloud.com',
            user: 'ujsc8wwbvivjaczz',
            password: 'OCtsMp6BPrQUDxtoGna2',
            database: 'bcmlczdfdr70zryw2gw4',
            charset: 'utf8',
        };
        this.connection = mysql.createConnection(this.config);
    }

    dbconnection() {
        return this.connection;
    }
}

module.exports = DataBase;