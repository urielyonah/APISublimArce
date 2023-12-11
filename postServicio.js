const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');
const db = new DataBase();

router.post('/', async (req, res) => {
    const con = db.dbconnection();

    try {
        const tipo = req.body.servicio;
        const tamano = req.body.tamano;
        const calidad = req.body.calidad;
        const area = req.body.area;
        const precio = req.body.precio;
        const imagen = req.body.imagen;

        // Begin transaction
        await con.beginTransaction();

        try {
            // Insertar en la tabla SERVICIOS
            const resultsInsert = await con.query(
                'INSERT INTO SERVICIOS (`TIPO-SERVICIO`, `tamaño`, `calidad`, `AREA`, `PRECIO`, `IMAGEN`) VALUES (?, ?, ?, ?, ?, ?)',
                [tipo, tamano, calidad, area, precio, imagen]
            );

            // Retrieve the ID of the recently inserted record based on the user-provided data
            const resultsId = await con.query(
                'SELECT `ID-SERVICIOS` FROM SERVICIOS WHERE `TIPO-SERVICIO` = ? AND `tamaño` = ? AND `calidad` = ? AND `AREA` = ? AND `PRECIO` = ? AND `IMAGEN` = ?',
                [tipo, tamano, calidad, area, precio, imagen]
            );

            if (resultsInsert.affectedRows > 0 && resultsId.length > 0 && resultsId[0]['ID-SERVICIOS'] !== undefined) {
                const idServicioInsertado = resultsId[0]['ID-SERVICIOS'];
                console.log('Inserción exitosa en SERVICIOS. ID del último insertado:', idServicioInsertado);

                // Commit the transaction
                await con.commit();

                res.status(200).json({ 'ID-SERVICIOS': idServicioInsertado, message: 'Agregado a SERVICIOS con éxito' });
            } else {
                console.error('Error en la inserción en SERVICIOS. No se afectaron filas o no se pudo obtener el último ID insertado.');
                res.status(500).json({ error: 'Error interno del servidor al insertar servicio' });
            }
        } catch (error) {
            // Rollback the transaction if an error occurs
            await con.rollback();
            throw error;
        }
    } catch (error) {
        console.error('Error al agregar a SERVICIOS:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
        if (con) {
            // Close the connection after everything is done
            con.end();
        }
    }
});

module.exports = router;

