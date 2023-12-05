const express = require('express');
const session = require('express-session');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

router.use(session({
    secret: 'secreto', // Cambia esto a una cadena secreta más segura
    resave: false,
    saveUninitialized: false,
  }));


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
                const usuarioId = results[0].id_alumno;
                req.session.userId = usuarioId;
                
                res.json({ message: 'Acceso concedido', user });
            } else {
                res.json({ message: 'Credenciales incorrectas' });
            }
        }
    });
});

module.exports = router;