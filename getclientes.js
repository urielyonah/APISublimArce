const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();
const pool = db.dbconnection();

// Ruta protegida
router.get('/', (req, res) => {
    try {
        const con = db.dbconnection();
        con.query('SELECT * FROM CLIENTES', (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Error en la consulta', error: err.message });
            } else {
                res.json(results);
            }

            // Cierra la conexión después de completar la consulta
            con.end();
        });
    } catch (error) {
        console.error('Error en la conexión a la base de datos:', error);
        res.status(500).json({ message: 'Error en la conexión a la base de datos', error: error.message });
    }
});

module.exports = router;
