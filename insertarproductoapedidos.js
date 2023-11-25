const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

router.post('/', (req, res) => {
    const con = db.dbconnection();
    const idproducto = req.body.idproducto;
    const cantidad = req.body.cantidad;
    const precio = req.body.precio
    const idcliente = req.body.idcliente;

    const sql = `INSERT INTO PEDIDOS (ID-PEDIDOS, ID-CAMISAS-SERVICIOS, ID-PRODUCTOS, CANTIDAD, PRECIO, STATUS, ID-CLIENTE) VALUES ('${nombre}', '${correo}', '${contraseña}','${telefono}','${direccion}')`;
    con.query(sql, (err, results) => {
        if (err) {
           throw err;
        } else {
            res.status(200).json(results);
        }
    });
});

module.exports = router;
