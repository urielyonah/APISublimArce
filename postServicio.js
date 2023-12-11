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
        if (idServicioInsertado !== null) {
            res.status(200).json({ 'ID-SERVICIOS': idServicioInsertado, message: 'Agregado a SERVICIOS con éxito' });
        } else {
            // Manejar el caso en que idServicioInsertado es null
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
            console.log('Inserción exitosa en SERVICIOS. Filas afectadas:', results.affectedRows);
            
            // Obtener el último ID insertado directamente desde el objeto results
            const idServicioInsertado = results.insertId;
            if (idServicioInsertado !== undefined) {
                console.log('ID del último insertado:', idServicioInsertado);
                return idServicioInsertado;
            } else {
                console.error('No se pudo obtener el ID del último insertado desde el objeto results.');
                return null;
            }
        } else {
            console.error('Error en la inserción en SERVICIOS. No se afectaron filas.');
            return null;
        }
    } catch (error) {
        console.error('Error al insertar servicio:', error);
        throw error;
    }
}

module.exports = router;
