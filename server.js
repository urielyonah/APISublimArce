const express = require('express');
//const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');


// Configuración de bodyParser para manejar solicitudes JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Reemplaza '*' con el dominio de tu aplicación en producción
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
//app.use(cors());

// Conexión a la base de datos (utiliza tu configuración)
const DataBase = require('./dbconnection');
const db = new DataBase();

// Rutas (utiliza tus archivos getcamisas.js, getclientes.js, login.js)
const getCamisasRoute = require('./getcamisas');
const getClientesRoute = require('./getclientes');
const loginRoute = require('./login');
const postClientes = require('./postclientes');
const getProductos = require('./getproductos');
const loginAdministrator = require('./loginAdmin');
const getPedido = require('./getPedido');
const postPedidos = require('./postPedidos');
const postServicios = require('./postServicio');

app.use('/getcamisas', getCamisasRoute);
app.use('/getclientes', getClientesRoute);
app.use('/login', loginRoute);
app.use('/register', postClientes);
app.use('/getproductos', getProductos);
app.use('/loginAdmin', loginAdministrator);
app.use('/pedido/:userId', getPedido);

app.use('/postPedidos', postPedidos);
app.use('/postServicios', postServicios);

// Puerto en el que se ejecutará la aplicación
const port = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en línea en el puerto ${port}`);
});