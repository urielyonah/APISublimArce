const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');
const db = new DataBase();

router.post('/', async (req, res) => {
    const con = db.dbconnection();

    try {
        const idCamisa = req.body.idCamisa;
        const tipo = req.body.servicio;
        const tamano = req.body.tamano;
        const calidad = req.body.calidad;
        const area = req.body.area;
        const precio = req.body.precio;
        const imagen = req.body.imagen;

        // Insertar en la tabla SERVICIOS
        const idServicioInsertado = await insertarServicio(con, tipo, tamano, calidad, area, precio, imagen);

        // Verificar si idServicioInsertado tiene un valor antes de proceder
        if (idServicioInsertado) {
            res.status(200).json({ 'ID-SERVICIOS': idServicioInsertado, message: 'Agregado a SERVICIOS con éxito' });
        } else {
            // Manejar el caso en que idServicioInsertado es undefined
            res.status(500).json({ error: 'Error interno del servidor al insertar servicio' });
        }
    } catch (error) {
        console.error('Error al agregar a SERVICIOS:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
        if (con) {
            con.end();
        }
    }
});

async function insertarServicio(con, tipo, tamano, calidad, area, precio, imagen) {
    const sql = `INSERT INTO SERVICIOS (\`TIPO-SERVICIO\`, \`tamaño\`, \`calidad\`, \`AREA\`, \`PRECIO\`, \`IMAGEN\`)
    VALUES (?, ?, ?, ?, ?, ?)`;

    try {
        const results = await con.query(sql, [tipo, tamano, calidad, area, precio, imagen]);
        
        if (results.affectedRows > 0) {
            const idServicioInsertado = results.insertId;
            console.log('Inserción exitosa en SERVICIOS. ID del último insertado:', idServicioInsertado);
            return idServicioInsertado;
        } else {
            console.error('Error en la inserción en SERVICIOS. No se afectaron filas.');
            console.error('Detalles del error:', results.message);
            return null;
        }
    } catch (error) {
        console.error('Error al insertar servicio:', error);
        throw error;
    }
}


module.exports = router;
