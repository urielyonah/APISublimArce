const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');
const db = new DataBase();

router.put('/', async (req, res) => {
    const pedidoIds = req.body.pedidoIds;
    const nuevoEstado = 'PENDIENTE'; // Reemplaza 'NUEVO ESTADO' con el estado deseado

    try {
        const con = db.dbconnection();

        // Generar un marcador de posición (?) para cada ID en la lista
        const placeholders = pedidoIds.map(() => '?').join(', ');
        const sql = `UPDATE PEDIDOS SET STATUS = ? WHERE \`ID-PEDIDOS\` IN (${placeholders})`;

        // Combina el nuevo estado con la lista de IDs
        const values = [nuevoEstado, ...pedidoIds];

        const results = await queryAsync(con, sql, values);

        res.json({ message: 'Estado del pedido cambiado con éxito', results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cambiar el estado del pedido', error: error.message });
    }
});

// Función para realizar una consulta asincrónica
function queryAsync(con, sql, values) {
    return new Promise((resolve, reject) => {
        con.query(sql, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = router;
