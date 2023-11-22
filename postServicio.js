const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');
const db = new DataBase();

// Función para insertar en la tabla SERVICIOS
function insertarServicio(con, tipo, tamano, calidad, area, precio, imagen) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO SERVICIOS (TIPO_SERVICIO, tamaño, calidad, AREA, PRECIO, IMAGEN) VALUES (?, ?, ?, ?, ?, ?)`;
        con.query(sql, [tipo, tamano, calidad, area, precio, imagen], (err, results) => {
            if (err) {
                console.error('Error al insertar servicio:', err);
                reject({ error: 'Error interno del servidor al insertar servicio' });
            } else {
                resolve(results);
            }
        });
    });
}

// Luego en tu ruta POST
router.post('/', async (req, res) => {
    try {
        const con = db.dbconnection();

        const idCamisa = req.body.idCamisa;
        const tamano = req.body.tamano;
        const servicio = req.body.servicio;
        const area = req.body.area;
        const calidad = req.body.calidad;
        const imagen = req.body.imagen;
        const precio = req.body.precio;

        // Insertar en la tabla SERVICIOS
        await insertarServicio(con, servicio, tamano, calidad, area, precio, imagen);


        res.status(200).json({ message: 'Agregado a pedidos con éxito' });
    } catch (error) {
        console.error('Error al agregar a pedidos:', error);
        res.status(500).json(error);
    } finally {
        con.end(); // Asegúrate de cerrar la conexión en cualquier caso
    }
});



module.exports = router;
