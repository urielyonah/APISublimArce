const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

router.post('/', async (req, res) => {
    const email = req.body.email;
    if (typeof email === 'string') {
        const result = await db.request()
            .input('email', email)
            .query('SELECT * FROM CLIENTES WHERE CORREO = @email');

        if (result.recordset.length > 0) {
            res.json(result.recordset);
        } else {
            res.json({ success: false });
        }
    }else{
       console.log('La cadena no es valida')
    }
});

module.exports = router;
