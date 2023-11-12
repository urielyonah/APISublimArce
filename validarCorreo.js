const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

router.get('/validarCorreo', async (req, res) => {
    const correo = req.body.email;

    if (!email) {
        res.status(400).json({ message: 'Missing email parameter' });
        return;
    }
    try {
        const result = await db.query('SELECT * FROM CLIENTES WHERE CORREO = ?', [correo]);

        if (result.length > 0) {
            res.status(200).json({ existeCorreo: true });
        } else {
            res.status(200).json({ existeCorreo: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error en la consulta' });
    }
});

module.exports = router;
