const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

router.get('/', (req, res) => {
    const con = db.dbconnection();
    con.query('SELECT * FROM CAMISAS', (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error en la consulta' });
        } else {
            res.json(results);
        }
    });
});

module.exports = router;