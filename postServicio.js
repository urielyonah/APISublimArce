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

        // Begin transaction
        await con.beginTransaction();

        try {
            // Insertar en la tabla SERVICIOS
            const resultsInsert = await con.query(
                `INSERT INTO SERVICIOS (\`TIPO-SERVICIO\`, \`tamaño\`, \`calidad\`, \`AREA\`, \`PRECIO\`, \`IMAGEN\`) VALUES (?, ?, ?, ?, ?, ?);`,
                [tipo, tamano, calidad, area, precio, imagen]
            );
        
            // Log results of the insert query (excluding circular structures)
            const loggableResults = {
                sql: resultsInsert.sql,
                values: resultsInsert.values,
                typeCast: resultsInsert.typeCast,
                nestTables: resultsInsert.nestTables,
                results: resultsInsert.results,
                fields: resultsInsert.fields,
                index: resultsInsert.index,
            };
        
            console.log('Results of the insert query:', loggableResults);
        
            // Verify affected rows
            if (resultsInsert.affectedRows > 0) {
                // Commit the transaction
                await con.commit();
                console.log('Transaction committed successfully.');
        
                res.status(200).json({ message: 'Agregado a SERVICIOS con éxito' });
            } else {
                console.error('Error en la inserción en SERVICIOS. No se afectaron filas.');
                res.status(500).json({ error: 'Error interno del servidor al insertar servicio', details: loggableResults });
            }
        } catch (error) {
            // Rollback the transaction if an error occurs
            await con.rollback();
            console.error('Error during transaction:', error);
            res.status(500).json({ error: 'Error interno del servidor', details: error.message });
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

module.exports = router;
