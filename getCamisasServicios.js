const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

// Middleware para verificar la autenticación


// Ruta protegida
router.get('/:CamisaServicioId', (req, res) => {
    const CamisaServicioId = req.params.CamisaServicioId; // Obtener userId de los parámetros de la URL
    console.log("ID de CamisaServicio:", CamisaServicioId);

    const con = db.dbconnection();
    const sql = 'SELECT camisas.`ID-CAMISAS`, camisas.MODELO, camisas.TALLAS, camisas.COLOR, camisas.PRECIO, camisas.DESCRIPCION, camisas.STOCK, camisas.IMAGEN AS CAMISAS_IMAGEN, servicios.`ID-SERVICIOS`, servicios.`TIPO-SERVICIO`, servicios.TAMAÑO, servicios.CALIDAD, servicios.AREA, servicios.PRECIO AS SERVICIOS_PRECIO, servicios.IMAGEN AS SERVICIOS_IMAGEN FROM `CAMISAS-SERVICIOS` c LEFT JOIN `CAMISAS` camisas ON c.`ID-CAMISAS` = camisas.`ID-CAMISAS` LEFT JOIN `SERVICIOS` servicios ON c.`ID-SERVICIOS` = servicios.`ID-SERVICIOS` WHERE c.`ID-CAMISAS-SERVICIOS` = ?;';

    const values = [CamisaServicioId];

    con.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error en la consulta', error: err.message });
        } else {
            if (results.length > 0) {
                res.json({ pedidos: results });
            } else {
                res.json({ message: 'No se encontraron Registros para el ID proporcionado' });
            }
        }
        con.end();
    });
});

module.exports = router;