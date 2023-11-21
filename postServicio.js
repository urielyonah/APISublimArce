const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');
const db = new DataBase();

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
        const servicioId = await insertarServicio(con, servicio, tamano, calidad, area, precio, imagen);
    
        // Insertar en la tabla CAMISAS-SERVICIOS
        await insertarCamisasServicios(con, idCamisa, servicioId, precio);
    
        res.status(200).json({ message: 'Agregado a pedidos con éxito' });
      } catch (error) {
        console.error('Error al agregar a pedidos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    });
    
    // Función para insertar en la tabla SERVICIOS y obtener el ID del servicio insertado
    function insertarServicio(con, tipo, tamano, calidad, area, precio, imagen) {
        return new Promise((resolve, reject) => {
          const sql = `INSERT INTO SERVICIOS (TIPO-SERVICIO, tamaño, calidad, AREA, PRECIO, IMAGEN) VALUES (?, ?, ?, ?, ?, ?)`;
          con.query(sql, [tipo, tamano, calidad, area, precio, imagen], (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results.insertId);
            }
          });
        });
    }
    
    // Función para insertar en la tabla CAMISAS_SERVICIOS
    function insertarCamisasServicios(con, idCamisa, idServicio, precio) {
        return new Promise((resolve, reject) => {
          const sql = `INSERT INTO CAMISAS-SERVICIOS (ID-CAMISAS, ID-SERVICIOS, PRECIO) VALUES (?, ?, ?)`;
          con.query(sql, [idCamisa, idServicio, precio], (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
    }

module.exports = router;
