const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');
const db = new DataBase();

router.post('/', (req, res) => {
    const con = db.dbconnection();

    const { idcamisas, idservicio, precio } = req.body;

    const sql =
        `INSERT INTO CAMISAS-SERVICIOS (\`ID-CAMISAS\`, \`ID-SERVICIO\`, \`PRECIO\`) VALUES (?, ?, ?)`;

    con.query(sql, [idcamisas, idservicio, precio], (err, results) => {
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
