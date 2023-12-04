const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

router.post('/', (req, res) => {
    try {
        const con = db.dbconnection();
        
        const idproducto = req.body.idproducto;
        const cantidad = req.body.cantidad;
        const precio = req.body.precio;
        const userId = req.body.idcliente;

        const sql = 'INSERT INTO PEDIDOS (`ID-CAMISAS-SERVICIOS`, `ID-PRODUCTOS`, `CANTIDAD`, `PRECIO`, `STATUS`, `ID-CLIENTE`) VALUES (NULL, ?, ?, ?, "EN CARRITO", ?)';

        con.query(sql, [idproducto, cantidad, precio, userId], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error interno del servidor');
            } else {
                res.json(results);
            }
        });
    } catch (error) {
        console.error('Error en la conexión a la base de datos:', error);
        return res.status(500).send('Error interno del servidor');
    } finally {
        if (con) {
            con.end();
        }
    }
});

module.exports = router;
