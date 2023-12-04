const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

// Ruta protegida
router.get('/:userId', (req, res) => {
    try {
        const userId = req.params.userId; // Obtener userId de los parámetros de la URL
        console.log("ID de Usuario:", userId);

        const con = db.dbconnection();
        const sql = 'SELECT ...'; // Tu consulta completa aquí

        const values = [userId];

        con.query(sql, values, (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error en la consulta', error: err.message });
            } else {
                if (results.length > 0) {
                    res.json({ carrito: results });
                } else {
                    res.json({ message: 'No se encontraron productos en el carrito para el usuario con ID proporcionado' });
                }
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
