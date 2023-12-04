const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');
const bcrypt = require('bcrypt');

const db = new DataBase();
const pool = db.dbconnection();

router.post('/', (req, res) => {
    try {
        const con = db.dbconnection();
        const email = req.body.IS_email;
        const password = req.body.IS_password;

        const sql = 'SELECT * FROM ADMINISTRADORES WHERE CORREO = ?';
        const values = [email];

        con.query(sql, values, async (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error en la consulta' });
            } else {
                if (results.length > 0) {
                    const admin = results[0];
                    const match = await bcrypt.compare(password, admin.CONTRASEÑA);

                    if (match) {
                        // Acceso concedido, puedes devolver un mensaje JSON si es necesario
                        res.json({ message: 'Acceso concedido', admin });
                    } else {
                        res.json({ message: 'Credenciales incorrectas' });
                    }
                } else {
                    res.json({ message: 'Credenciales incorrectas' });
                }
            }
        });
    } catch (error) {
        console.error('Error en la conexión a la base de datos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    } finally {
        if (con) {
            con.end();
        }
    }
});

module.exports = router;
