const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

router.post('/', (req, res) => {
    try {
        const { id_camisas_servicios, id_producto, cantidad, precio, status, id_cliente } = req.body;
    
        // Realiza la inserción en la base de datos
        connection.query(
          'INSERT INTO PEDIDOS (ID-CAMISAS-SERVICIOS, ID-PRODUCTOS, CANTIDAD, PRECIO, STATUS, ID-CLIENTE) VALUES (?, ?, ?, ?, ?, ?)',
          [id_camisas_servicios, id_producto, cantidad, precio, status, id_cliente],
          (error, results) => {
            if (error) {
              console.error('Error al insertar en la base de datos:', error);
              res.status(500).json({ error: 'Error interno del servidor' });
            } else {
              // Envía una respuesta de éxito
              res.status(200).json({ message: 'Datos insertados con éxito en el carrito' });
            }
          }
        );
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
});

module.exports = router;
