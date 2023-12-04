const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

router.put('/:pedidoId', (req, res) => {
    const pedidoId = req.params.pedidoId;

    const con = db.dbconnection();
    const nuevoEstado = 'PENDIENTE'; // Reemplaza 'NUEVO ESTADO' con el estado deseado

    const sql = 'UPDATE PEDIDOS SET STATUS = ? WHERE `ID-PEDIDOS` = ?';
    const values = [nuevoEstado, pedidoId];

    con.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error al cambiar el estado del pedido', error: err.message });
        } else {
            res.json({ message: 'Estado del pedido cambiado con éxito' });
        }
    });
});

module.exports = router;