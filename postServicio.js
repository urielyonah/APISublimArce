const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');
const db = new DataBase();

router.post('/', async (req, res) => {
    const con = db.dbconnection();

    try {
        const idCamisa = req.body.idCamisa;
        const tamano = req.body.tamano;
        const servicio = req.body.servicio;
        const area = req.body.area;
        const calidad = req.body.calidad;
        const imagen = req.body.imagen;
        const precio = req.body.precio;

        // Insertar en la tabla SERVICIOS
        const idServicioInsertado = await insertarServicio(con, res, idCamisa, servicio, tamano, calidad, area, precio, imagen);

        // Insertar en la tabla CAMISAS-SERVICIOS
        await insertarCamisasServicios(con, idCamisa, idServicioInsertado, precio);

        res.status(200).json({ message: 'Agregado a pedidos con éxito', 'ID-CAMISAS-SERVICIOS': idServicioInsertado });
    } catch (error) {
        console.error('Error al agregar a pedidos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
        if (con) {
            con.end(); // Asegúrate de cerrar la conexión en cualquier caso
        }
    }
});

async function insertarServicio(con, res, idCamisa, tipo, tamano, calidad, area, precio, imagen) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO SERVICIOS (\`TIPO-SERVICIO\`, \`tamaño\`, \`calidad\`, \`AREA\`, \`PRECIO\`, \`IMAGEN\`)
        VALUES (?, ?, ?, ?, ?, ?)`;
        con.query(sql, [tipo, tamano, calidad, area, precio, imagen], (err, results) => {
            if (err) {
                console.error('Error al insertar servicio:', err);
                res.status(500).json({ error: 'Error interno del servidor al insertar servicio' });
                reject(err);
            } else {
                const idServicioInsertado = results.insertId;
                console.log('Inserción exitosa en SERVICIOS. ID del último insertado:', idServicioInsertado);

                // Insertar a la tabla CAMISAS-SERVICIOS
                insertarCamisasServicios(con, res, idCamisa, idServicioInsertado, precio);

                // Modificar la respuesta para incluir el ID del servicio
                res.status(200).json({ 'ID-CAMISAS-SERVICIOS': idServicioInsertado });
                resolve(idServicioInsertado);
            }
        });
    });
}

async function insertarCamisasServicios(con, idCamisa, idServicio, precio) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO \`CAMISAS-SERVICIOS\` (\`ID-CAMISAS\`, \`ID-SERVICIOS\`, \`PRECIO\`) VALUES (?, ?, ?)`;
        con.query(sql, [idCamisa, idServicio, precio], (err, result) => {
            if (err) {
                console.error('Error al insertar servicio en CAMISAS-SERVICIOS:', err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = router;