const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

router.get('/', (req, res) => {
    const con = db.dbconnection();

    if (!con) {
        res.status(500).json({ message: 'Error en la conexión' });
        return;
    }

    con.query('SELECT * FROM CAMISAS', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error en la consulta', details: err.message });
        } else {
            res.json(results);
        }

        // Check if the connection is still open before trying to close it
        if (con.state !== 'disconnected') {
            con.end();
        }
    });
});

module.exports = router;
