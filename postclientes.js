const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

router.post('/', (req, res) => {
    const con = db.dbconnection();
    var correo = req.body.EMAIL;
    var nombre = req.body.NAME;
    var contraseña = req.body.PASSWORD;
    var sql = `INSERT INTO CLIENTES (NOMBRE, CORREO, CONTRASEÑA) VALUES ('${nombre}', '${correo}', '${contraseña}')`;
    con.query(sql, [nombre, correo, contraseña], function(err, results){
        if (err) {
           throw err;
        } else {
            res.json(results);
            console.log('Numero de registros insertados: ' + results.affectedRows);
            console.log(nombre, correo, contraseña);
        }
    });
});

module.exports = router;