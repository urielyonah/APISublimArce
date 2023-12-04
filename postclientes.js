const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');
const bcrypt = require('bcrypt');

const db = new DataBase();
const pool = db.dbconnection();

router.post('/', async (req, res) => {
    const con = db.dbconnection();
    
    try {
        const { email, name, password, phone, address } = req.body;

        // Hash de la contraseña antes de almacenarla
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = 'INSERT INTO CLIENTES (NOMBRE, CORREO, CONTRASEÑA, TELEFONO, DIRECCION) VALUES (?, ?, ?, ?, ?)';
        const values = [name, email, hashedPassword, phone, address];

        con.query(sql, values, (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error en la consulta', error: err.message });
            } else {
                res.status(200).json(results);
                console.log('Número de registros insertados:', results.affectedRows);
                console.log('Datos insertados:', { name, email, password: '****', phone, address });
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
