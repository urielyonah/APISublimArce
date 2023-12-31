const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

// Middleware para verificar la autenticación


// Ruta protegida
router.get('/:userId', (req, res) => {
    const userId = req.params.userId; // Obtener userId de los parámetros de la URL
    console.log("ID de Usuario:", userId);

    const con = db.dbconnection();
    const sql = 'SELECT p.`ID-PEDIDOS`, p.CANTIDAD, p.PRECIO, p.STATUS, p.FECHA_COTIZACION, p.FECHA_COMPLETADO, c.`ID-CAMISAS-SERVICIOS`, cs.`ID-CAMISAS` AS `CS_ID_CAMISAS`, cs.`ID-SERVICIOS` AS `CS_ID_SERVICIOS`, cs.PRECIO AS `PRECIO-CAMISAS-SERVICIOS`, camisas.`ID-CAMISAS`, camisas.MODELO, camisas.TALLAS, camisas.COLOR, camisas.PRECIO AS CAMISAS_PRECIO, camisas.DESCRIPCION, camisas.STOCK AS CAMISAS_STOCK, camisas.IMAGEN AS CAMISAS_IMAGEN, servicios.`ID-SERVICIOS`, servicios.`TIPO-SERVICIO`, servicios.CALIDAD, servicios.PRECIO AS SERVICIOS_PRECIO, servicios.TAMAÑO, servicios.AREA,servicios.IMAGEN AS SERVICIOS_IMAGEN, pr.`NOMBRE` AS `NOMBRE-PRODUCTOS`, pr.`PRECIO` AS `PRECIO-PRODUCTOS`, pr.`DESCRIPCION` AS `DESCRIPCION-PRODUCTOS`, pr.`CATEGORIA` AS `CATEGORIA-PRODUCTOS`, pr.`STOCK` AS `STOCK-PRODUCTOS`, pr.`IMAGEN` AS `IMAGEN-PRODUCTOS` FROM PEDIDOS p LEFT JOIN `CAMISAS-SERVICIOS` c ON p.`ID-CAMISAS-SERVICIOS` = c.`ID-CAMISAS-SERVICIOS` LEFT JOIN `CAMISAS-SERVICIOS` cs ON p.`ID-CAMISAS-SERVICIOS` = cs.`ID-CAMISAS-SERVICIOS` LEFT JOIN `CAMISAS` camisas ON cs.`ID-CAMISAS` = camisas.`ID-CAMISAS` LEFT JOIN `SERVICIOS` servicios ON cs.`ID-SERVICIOS` = servicios.`ID-SERVICIOS` LEFT JOIN PRODUCTOS pr ON p.`ID-PRODUCTOS` = pr.`ID-PRODUCTOS` WHERE (p.`ID-CLIENTE` = ? AND (p.STATUS = "EN CARRITO"))';

    const values = [userId];

    con.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error en la consulta', error: err.message });
        } else {
            if (results.length > 0) {

                res.json({ carrito: results });
            } else {
                res.json({ message: 'No se encontraron prouctos en el carrito para el usuario con ID proporcionado' });
            }
        }
        
    });
});

module.exports = router;