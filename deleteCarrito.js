const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

// Middleware para verificar la autenticación


// Ruta protegida
router.delete('/:pedidoId', (req, res) => {
    const pedidoId = req.params.pedidoId;

    const con = db.dbconnection();
    const sql = 'DELETE FROM PEDIDOS WHERE `ID-PEDIDOS` = ?';

    const values = [pedidoId];

    con.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error al eliminar el pedido', error: err.message });
        } else {
            if (results.affectedRows > 0) {
                res.json({ message: 'Pedido eliminado con éxito' });
            } else {
                res.status(404).json({ message: 'No se encontró el pedido con el ID proporcionado' });
            }
        }
    });
});

module.exports = router;