const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');
const db = new DataBase();

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
        const servicioId = insertarServicio(con, servicio, tamano, calidad, area, precio, imagen);

        // Insertar en la tabla CAMISAS-SERVICIOS
        insertarCamisasServicios(con, idCamisa, servicioId, precio);

        res.status(200).json({ message: 'Agregado a pedidos con éxito' });
    } catch (error) {
        console.error('Error al agregar a pedidos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
        con.end(); // Asegúrate de cerrar la conexión en cualquier caso
    }
});

// Función para insertar en la tabla SERVICIOS y obtener el ID del servicio insertado
function insertarServicio(con, tipo, tamano, calidad, area, precio, imagen) {
    const sql = `INSERT INTO SERVICIOS (TIPO-SERVICIO, tamaño, calidad, AREA, PRECIO, IMAGEN) VALUES (?, ?, ?, ?, ?, ?)`;
    con.query(sql, [tipo, tamano, calidad, area, precio, imagen], (err, results) => {
        if (err) {
            console.error('Error al insertar servicio:', err);
            res.status(500).json({ error: 'Error interno del servidor al insertar servicio' });
        } else {
            res.status(200).json({ servicioId: results.insertId });
        }
    });
}


// Función para insertar en la tabla CAMISAS_SERVICIOS
function insertarCamisasServicios(con, idCamisa, idServicio, precio) {
    const sql = `INSERT INTO CAMISAS-SERVICIOS (ID-CAMISAS, ID-SERVICIOS, PRECIO) VALUES (?, ?, ?)`;
        con.query(sql, [idCamisa, idServicio, precio], (err, result) => {
            if (err) {
                console.error('Error:', err);
                res.status(500).json({ error: 'Error interno del servidor al insertar a la tabla CAMISAS-SERVICIOS' });
            } else {
                res.status(200).json(result);
            }
        });
}

module.exports = router;
