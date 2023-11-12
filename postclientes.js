const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

router.post('/register', (req, res) => {
    const con = db.dbconnection();
    const correo = req.body.email;
    const nombre = req.body.name;
    const contraseña = req.body.password;
    const telefono = req.body.telefono;
    const direccion = req.body.direccion

    // Consulta para verificar si el correo ya existe
    const sql = `SELECT COUNT(*) AS total FROM CLIENTES WHERE CORREO = '${correo}'`;
    con.query(sql, (err, results) => {
        if (err) {
           throw err;
        } else {
            // Si el correo ya existe, no se registra al usuario
            if (results.rows[0].total > 0) {
                res.status(409).json({
                    message: 'El correo ya existe',
                });
            } else {
                // Si el correo no existe, se procede a registrar al usuario
                const sql = `INSERT INTO CLIENTES (NOMBRE, CORREO, CONTRASEÑA, TELEFONO, DIRECCION) VALUES ('${nombre}', '${correo}', '${contraseña}', '${telefono}', '${direccion}')`;
                con.query(sql, (err, results) => {
                    if (err) {
                        throw err;
                    } else {
                        res.status(200).json(results);
                        console.log('Numero de registros insertados: ' + results.affectedRows);
                        console.log(nombre, correo, contraseña);
                    }
                });
            }
        }
    });
});

module.exports = router;
