const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');
const db = new DataBase();

router.post('/', (req, res) => {
    const con = db.dbconnection();

    const { servicio, tamano, calidad, area, precio, imagen } = req.body;

    const sql =
        `INSERT INTO SERVICIOS (\`TIPO-SERVICIO\`, \`tamaño\`, \`calidad\`, \`AREA\`, \`PRECIO\`, \`IMAGEN\`) VALUES (?, ?, ?, ?, ?, ?)`;

    con.query(sql, [servicio, tamano, calidad, area, precio, imagen], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error interno del servidor');
        } else {
            res.status(200).json(results);
        }
        con.end();
    });
});

module.exports = router;
