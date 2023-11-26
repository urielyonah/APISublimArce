const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

// Middleware para verificar la autenticación


// Ruta protegida
router.get('/:userId', (req, res) => {
    const userId = req.params.userId; // Obtener userId de los parámetros de la URL
    console.log("ID de Usuario:", userId);

    const con = db.dbconnection();
    const sql = 'SELECT * FROM PEDIDOS WHERE `ID-CLIENTE` = ?';
    const values = [userId];

    con.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error en la consulta', error: err.message });
        } else {
            if (results.length > 0) {
                const user = results[0];
                console.log("Acceso concedido");
                res.json({ user });
            } else {
                res.json({ message: 'No se encontraron pedidos para el usuario con ID proporcionado' });
            }
        }
    });

    con.end();
});

module.exports = router;