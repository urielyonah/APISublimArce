// Importa tu conexión a la base de datos y otras dependencias necesarias
const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');
const db = new DataBase();

router.post('/', async (req, res) => {
  const con = db.dbconnection();

  const idCamisa = req.body.idCamisa;
  const tamano = req.body.tamano;
  const servicio = req.body.servicio;
  const area = req.body.area;
  const calidad = req.body.calidad;
  const imagen = req.body.imagen;
  const precio = req.body.precio;

  //insertar en la tabla SERVICIOS
  const sql = `INSERT INTO SERVICIOS (TIPO-SERVICIO, tamaño, calidad, AREA, PRECIO, IMAGEN) VALUES ('${tipo}', '${tamano}', '${calidad}','${area}','${precio}', '${imagen}')`;
    con.query(sql, (err, results) => {
        if (err) {
           throw err;
        } else {
            res.status(200).json(results);
        }
    });
  // Insertar en la tabla CAMISAS-SERVICIOS
  const sqlInsertServicio = `INSERT INTO CAMISAS-SERVICIOS (ID-CAMISAS, ID-SERVICIOS, PRECIO) VALUES (${idCamisa}, ${getIdServicio(servicio, tamano, area, calidad)}, ${precio})`;

  con.query(sqlInsertServicio, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.status(200).json(result);
    }
  });
});

// Función para obtener el ID de servicio
function getIdServicio(servicio, tamano, area, calidad) {
  const sqlGetIdServicio = `SELECT ID-SERVICIOS FROM SERVICIOS WHERE TIPO-SERVICIO = '${servicio}' AND tamaño = '${tamano}' AND AREA = '${area}' AND calidad = '${calidad}'`;
  con.query(sqlGetIdServicio, (err, result) => {
    if (err) {
      throw err;
    } else {
        if (result && result.length > 0) {
            resolve(result[0]['ID-SERVICIOS']);
          } else {
            // Si no hay resultados, puedes manejarlo de acuerdo a tus necesidades
            reject('Servicio no encontrado');
          }
    }
  });
  // Debes implementar la lógica para obtener el ID del servicio de la base de datos
  // y devolverlo.
  // Puedes usar una función similar a la que usaste para insertar en la tabla SERVICIOS.
}

module.exports = router;

