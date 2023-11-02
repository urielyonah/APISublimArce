const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    const con = db.dbconnection();
    const { Email, Contrasena } = req.body;

    const sql = 'SELECT * FROM CLIENTES WHERE CORREO = ? AND CONTRASEÑA = ?';
    const values = [Email, Contrasena];

    con.query(sql, values, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error en la consulta' });
        } else {
            if (results.length > 0) {
                const user = results[0];
                const token = jwt.sign({userId: user.id}, 'your_secret_key', {
                    expiresIn: '1h',
                });
                res.json({ message: 'Acceso concedido', user });
            } else {
                res.json({ message: 'Credenciales incorrectas' });
            }
        }
    });
});

module.exports = router;