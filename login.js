const express = require('express');
const session = require('express-session');
const router = express.Router();
const DataBase = require('./dbconnection');
const bcrypt = require('bcrypt');

// Crear una instancia de la clase DataBase
const db = new DataBase();
const pool = db.dbconnection();

router.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    secure: true,
    httpOnly: true,
}));

router.post('/', async (req, res) => {
    let con;

    try {
        con = await pool.getConnection();
        const { Email, Contrasena } = req.body;

        const sql = 'SELECT ID_CLIENTE, CORREO, CONTRASENA FROM CLIENTES WHERE CORREO = ?';
        const values = [Email];

        con.query(sql, values, async (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error en la consulta' });
            } else {
                if (results.length > 0) {
                    const user = results[0];
                    const match = await bcrypt.compare(Contrasena, user.CONTRASENA);

                    if (match) {
                        req.session.userId = user.ID_CLIENTE;
                        res.status(200).json({ message: 'Acceso concedido', user });
                    } else {
                        res.status(401).json({ message: 'Credenciales incorrectas' });
                    }
                } else {
                    res.status(401).json({ message: 'Credenciales incorrectas' });
                }
            }
        });
    } catch (error) {
        console.error('Error en la conexión a la base de datos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    } finally {
        if (con) {
            con.release();
        }
    }
});

module.exports = router;
