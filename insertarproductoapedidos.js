const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

router.post('/', (req, res) => {
    const con = db.dbconnection();
    const idproducto = req.body.idproducto; // Asegúrate de que el nombre de la propiedad coincida con el frontend
    const cantidad = req.body.cantidad;
    const precio = req.body.precio;
    const userId = req.body.idcliente; // Asegúrate de que el nombre de la propiedad coincida con el frontend

    const sql = `
    INSERT INTO PEDIDOS ('ID-CAMISAS-SERVICIOS', 'ID-PRODUCTOS', 'CANTIDA', 'PRECIO', 'STATUS', 'ID-CLIENTE')
      VALUES (NULL, '${idproducto}', '${cantidad}', '${precio}', 'PENDIENTE', '${userId}')
    `;

    con.query(sql, (err, results) => {
        if (err) {
           console.error(err);
           res.status(500).send('Error interno del servidor');
        } else {
            res.status(200).json(results);
        }
    });
});

module.exports = router;
