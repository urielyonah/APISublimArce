const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

router.post('/', (req, res) => {
    const con = db.dbconnection();
    var correo = req.body.Fcorreo;
    var nombre = req.body.Fnombre;
    var contraseña = req.body.Fcontraseña;
    var sql = 'INSERT INTO CLIENTES (NOMBRE, CORREO, CONTRASEÑA) VALUES (?,?,?)';
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