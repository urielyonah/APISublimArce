const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

router.put('/:userId', (req, res) => {
    const userId = req.params.userId;
    const datos = req.body;

    const con = db.dbconnection();
    const query = 'UPDATE CLIENTES SET CORREO = ?, CONTRASEÑA = ?, NOMBRE = ?, TELEFONO = ?, DIRECCION = ?  WHERE `ID-CLIENTE` = ?';
    con.query(query, [datos.email, datos.password, datos.name, datos.phone, datos.address, userId], (err, results) => {
        if (err) {
            console.error('Error al actualizar los datos en la base de datos:', err);
        res.status(500).json({ mensaje: 'Error al actualizar el cliente en la base de datos' });
        return;
        } else {
            res.json({ mensaje: 'Usuario actualizado correctamente' });
            res.json(results);
        }
    });
});

module.exports = router;