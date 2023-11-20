const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

router.get('/', (req, res) => {
    const con = db.dbconnection();

    // Obtener userId de la sesión
    const userId = req.session.userId;

    if (!userId) {
        res.status(401).json({ message: 'Usuario no autenticado' });
        return;
    }

    const sql = 'SELECT * FROM PEDIDOS WHERE ID-CLIENTE = ?';
    const values = [userId];

    con.query(sql, values, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error en la consulta' });
        } else {
            if (results.length > 0) {
                const user = results[0];
                res.json({ message: 'Acceso concedido', user });
            } else {
                res.json({ message: 'Credenciales incorrectas' });
            }
        }
    });
});

module.exports = router;