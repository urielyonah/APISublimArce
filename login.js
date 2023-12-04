const express = require('express');
const session = require('express-session');
const router = express.Router();
const DataBase = require('./dbconnection');
const bcrypt = require('bcrypt');

const db = new DataBase();

router.use(session({
    secret: 'secreto', // Cambia esto a una cadena secreta más segura
    resave: false,
    saveUninitialized: false,
    secure: true, // Configura esto según tus necesidades
    httpOnly: true, // Configura esto según tus necesidades
}));

router.post('/', async (req, res) => {
    try {
        const con = db.dbconnection();
        const { Email, Contrasena } = req.body;

        const sql = 'SELECT * FROM CLIENTES WHERE CORREO = ?';
        const values = [Email];

        con.query(sql, values, async (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error en la consulta' });
            } else {
                if (results.length > 0) {
                    const user = results[0];
                    const match = await bcrypt.compare(Contrasena, user.CONTRASEÑA);

                    if (match) {
                        req.session.userId = user['ID-CLIENTE'];
                        res.json({ message: 'Acceso concedido', user });
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
