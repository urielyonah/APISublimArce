const express = require('express');
const session = require('express-session');
const router = express.Router();
const DataBase = require('./dbconnection');
const bcrypt = require('bcrypt');

// Crear una instancia de la clase DataBase
const db = new DataBase();

router.use(session({
    secret: 'secreto', // Cambia esto a una cadena secreta más segura
    resave: false,
    saveUninitialized: false,
    secure: true, // Configura esto según tus necesidades
    httpOnly: true, // Configura esto según tus necesidades
}));

router.post('/', async (req, res) => {
    let con; // Definir la variable con fuera del bloque try

    try {
        con = await db.dbconnection(); // Usar la instancia de la clase DataBase para obtener la conexión
        const { Email, Contrasena } = req.body;

        const sql = 'SELECT * FROM CLIENTES WHERE CORREO = ?';
        const values = [Email];

        con.query(sql, values, async (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error en la consulta' });
            } else {
                // Resto del código sigue igual
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