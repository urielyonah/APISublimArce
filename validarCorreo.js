const express = require('express');
const router = express.Router();
const DataBase = require('./dbconnection');

const db = new DataBase();

router.post('/', (req, res) => {
    const email = req.body.email;
    if (typeof email === 'string') {
      const result = db.request()
        .input('email', email)
        .query('SELECT * FROM CLIENTES WHERE CORREO = @email');
  
      if (result.length > 0) {
        res.json(result);
      } else {
        res.json({ success: false });
      }
    } else {
      console.log('La cadena no es valida');
    }
  });
  
  module.exports = router;
