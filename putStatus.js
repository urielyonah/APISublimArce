const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

router.put('/', (req, res) => {
    
    const pedidoIds = req.body.pedidoIds;

    const con = db.dbconnection();
    const nuevoEstado = 'PENDIENTE'; // Reemplaza 'NUEVO ESTADO' con el estado deseado

    // Generar un marcador de posición (?) para cada ID en la lista
    const placeholders = pedidoIds.map(() => '?').join(', ');
    const sql = `UPDATE PEDIDOS SET STATUS = ? WHERE \`ID-PEDIDOS\` IN (${placeholders})`;
    
    // Combina el nuevo estado con la lista de IDs
    const values = [nuevoEstado, ...pedidoIds];

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
