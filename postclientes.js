const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

router.post('/', (req, res) => {
    const con = db.dbconnection();
    const correo = req.body.email;
    const nombre = req.body.name;
    const contraseña = req.body.password;
    const telefono = req.body.phone;
    const direccion = req.body.address;

    const sql = `INSERT INTO CLIENTES (NOMBRE, CORREO, CONTRASEÑA, TELEFONO, DIRECCION) VALUES ('${nombre}', '${correo}', '${contraseña}','${telefono}','${direccion}')`;
    con.query(sql, (err, results) => {
        if (err) {
           throw err;
        } else {
            res.status(200).json(results);
            console.log('Numero de registros insertados: ' + results.affectedRows);
            console.log(nombre, correo, contraseña, telefono, direccion);
        }
    });
    con.end();
});

module.exports = router;
