const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

router.get('/', (req, res) => {
    // Declaro la conexión aquí para que esté disponible en el bloque finally
    let con;

    try {
        con = db.dbconnection();
        con.query('SELECT * FROM PRODUCTOS', (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Error en la consulta', error: err.message });
            } else {
                res.json(results);
            }
        });
    } catch (error) {
        console.error('Error en la conexión a la base de datos:', error);
        res.status(500).json({ message: 'Error en la conexión a la base de datos', error: error.message });
    } finally {
        // Cierra la conexión en el bloque finally para asegurar que se cierre incluso en caso de error
        if (con) {
            con.end();
        }
    }
});

module.exports = router;
