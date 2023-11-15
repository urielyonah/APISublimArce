const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();


router.post('/', (req, res) => {
    const con = db.dbconnection();
    const Email = req.body.IS-email;
    const Password = req.body.IS-password;

    const sql = 'SELECT * FROM ADMINISTRADORES WHERE CORREO = ? AND CONTRASEÑA = ?';
    const values = [Email, Password];

    con.query(sql, values, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error en la consulta' });
        } else {
            if (results.length > 0) {
                const user = results[0];
                res.json({ message: 'Acceso concedido', user });
                res.redirect('/inicio');
            } else {
                res.json({ message: 'Credenciales incorrectas' });
            }
        }
    });
});

module.exports = router;