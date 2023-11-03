const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

router.post('/', (req, res) => {
    const con = db.dbconnection();
    var correo = req.body.email;
    var nombre = req.body.name;
    var contraseña = req.body.password;

    var sql = `INSERT INTO CLIENTES (NOMBRE, CORREO, CONTRASEÑA) VALUES ('${nombre}', '${correo}', '${contraseña}')`;
    con.query(sql, (err, results) => {
        if (err) {
           throw err;
        } else {
            res.status(200).json(results);
            console.log('Numero de registros insertados: ' + results.affectedRows);
            console.log(nombre, correo, contraseña);
        }
    });
});

module.exports = router;