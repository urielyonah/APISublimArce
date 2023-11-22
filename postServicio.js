const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');
const db = new DataBase();

// Función para insertar en la tabla SERVICIOS
function insertarServicio(con, tipo, tamano, calidad, area, precio, imagen) {
        const sql = `INSERT INTO SERVICIOS (TIPO-SERVICIO, tamaño, calidad, AREA, PRECIO, IMAGEN) VALUES (?, ?, ?, ?, ?, ?)`;
        con.query(sql, [tipo, tamano, calidad, area, precio, imagen], (err, results) => {
            if (err) {
                throw err;
            } else {
                res.status(200).json(results);
                console.log(tamano, servicio, calidad, area, precio);
            }
        });
}

// Luego en tu ruta POST
router.post('/', (req, res) => {
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
       insertarServicio(con, servicio, tamano, calidad, area, precio, imagen);
        res.status(200).json({ message: 'Agregado a pedidos con éxito' });
    } catch (error) {
        console.error('Error al agregar a pedidos:', error);
        res.status(500).json(error);
    } finally {
        con.end(); // Asegúrate de cerrar la conexión en cualquier caso
    }
});



module.exports = router;
