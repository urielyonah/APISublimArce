const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');
const db = new DataBase();


// Función para insertar en la tabla SERVICIOS
function insertarServicio(con, res, idCamisa, tipo, tamano, calidad, area, precio, imagen) {
    const sql = `INSERT INTO SERVICIOS (\`TIPO-SERVICIO\`, \`tamaño\`, \`calidad\`, \`AREA\`, \`PRECIO\`, \`IMAGEN\`)
    VALUES (?, ?, ?, ?, ?, ?)`;
    con.query(sql, [tipo, tamano, calidad, area, precio, imagen], (err, results) => {
        if (err) {
            console.error('Error al insertar servicio:', err);
            res.status(500).json({ error: 'Error interno del servidor al insertar servicio' });
        } else {
            const idServicioInsertado = results.insertId;
            console.log('Inserción exitosa en SERVICIOS. Resultados:'+ results.body);
            console.log('ID del último insertado:'+ idServicioInsertado);

            //Insertar a la tabla CAMISAS-SERVICIOS
            insertarCamisasServicios(con, res, idCamisa, idServicioInsertado, precio);
            
        }
    });
}

function insertarCamisasServicios(con, res, idCamisa, idServicio, precio) {
        const sql = `INSERT INTO \`CAMISAS-SERVICIOS\` (\`ID-CAMISAS\`, \`ID-SERVICIOS\`, \`PRECIO\`) VALUES (?, ?, ?)`;
        con.query(sql, [idCamisa, idServicio, precio], (err, result) => {
            if (err) {
                console.error('Error setService:', err);
                res.status(500).json({ error: 'Error interno del servidor al insertar servicio en CAMISAS-SERVICIOS' });
                throw err;
            } else {
                res.status(200).json(result);
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
        insertarServicio(con, res, idCamisa, servicio, tamano, calidad, area, precio, imagen);
        console.log('Agregado al carrito:', idCamisa, 'talla:', tamano, ', servicio:', servicio, ', area:', area);
        
        res.status(200).json({ message: 'Agregado a pedidos con éxito' });
    } catch (error) {
        console.error('Error al agregar a pedidos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
        if (con) {
            con.end(); // Asegúrate de cerrar la conexión en cualquier caso
        }
    }
});

module.exports = router;