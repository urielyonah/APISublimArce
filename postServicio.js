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
        await insertarCamisasServicios(con, res, idCamisa, idServicioInsertado, precio);

        res.status(200).json({ 'ID-CAMISAS-SERVICIOS': idServicioInsertado, message: 'Agregado a pedidos con éxito' });
    } catch (error) {
        console.error('Error al agregar a pedidos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
        if (con) {
            con.end();
        }
    }
});

async function insertarServicio(con, res, idCamisa, tipo, tamano, calidad, area, precio, imagen) {
    const sql = `INSERT INTO SERVICIOS (\`TIPO-SERVICIO\`, \`tamaño\`, \`calidad\`, \`AREA\`, \`PRECIO\`, \`IMAGEN\`)
    VALUES (?, ?, ?, ?, ?, ?)`;

    try {
        const results = await con.query(sql, [tipo, tamano, calidad, area, precio, imagen]);
        const idServicioInsertado = results.insertId;

        console.log('Inserción exitosa en SERVICIOS. ID del último insertado:', idServicioInsertado);

        // Insertar a la tabla CAMISAS-SERVICIOS
        await insertarCamisasServicios(con, res, idCamisa, idServicioInsertado, precio);

        // Modificar la respuesta para incluir el ID del servicio
        return idServicioInsertado;
    } catch (error) {
        console.error('Error al insertar servicio:', error);
        res.status(500).json({ error: 'Error interno del servidor al insertar servicio' });
        throw error; // Para que el error se propague y sea manejado en el bloque catch del controlador principal
    }
}


async function insertarCamisasServicios(con, res, idCamisa, idServicio, precio) {
    const sql = `INSERT INTO \`CAMISAS-SERVICIOS\` (\`ID-CAMISAS\`, \`ID-SERVICIOS\`, \`PRECIO\`) VALUES (?, ?, ?)`;

    try {
        const result = await con.query(sql, [idCamisa, idServicio, precio]);
        return result;
    } catch (error) {
        console.error('Error al insertar servicio en CAMISAS-SERVICIOS:', error);
        res.status(500).json({ error: 'Error interno del servidor al insertar servicio en CAMISAS-SERVICIOS' });
        throw error;
    }
}

module.exports = router;