const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Configuración de bodyParser para manejar solicitudes JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Conexión a la base de datos (utiliza tu configuración)
const DataBase = require('./dbconnection');
const db = new DataBase();

// Rutas (utiliza tus archivos getcamisas.js, getclientes.js, login.js)
const getCamisasRoute = require('./getcamisas');
const getClientesRoute = require('./getclientes');
const loginRoute = require('./login');

app.use('/getcamisas', getCamisasRoute);
app.use('/getclientes', getClientesRoute);
app.use('/login', loginRoute);

// Puerto en el que se ejecutará la aplicación
const port = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en línea en el puerto ${port}`);
});