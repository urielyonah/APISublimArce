const express = require('express');
//const cors = require('cors');
const session = require('express-session');
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

app.use(session({
  secret: 'secreto', // Cambia esto a una cadena secreta más segura
  resave: false,
  saveUninitialized: false,
}));

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
const getCarrito = require('./getCarrito');
const postPedidos = require('./postPedidos');
const postServicios = require('./postServicio');
const insertarproductoapedidos = require('./insertarproductoapedidos');
const editarPerfil = require('./EditarPerfil');
const cambiarStatus = require('./putStatus');
const deleteCarrito = require('./deleteCarrito');
const PostCamisasServicios = require('./POSTcamisaPedidos');

app.use('/getcamisas', getCamisasRoute);
app.use('/getclientes', getClientesRoute);
app.use('/login', loginRoute);
app.use('/register', postClientes);
app.use('/getproductos', getProductos);
app.use('/loginAdmin', loginAdministrator);
app.use('/pedido', getPedido);
app.use('/carrito', getCarrito);
app.use('/editarPerfil', editarPerfil);
app.use('/postPedidos', postPedidos);
app.use('/postServicios', postServicios);
app.use('/insertarproductoapedidos', insertarproductoapedidos);
app.use('/cambiarStatus',cambiarStatus);
app.use('/deleteCarrito', deleteCarrito);
app.use('/postCamisaServicios', PostCamisasServicios);

// Puerto en el que se ejecutará la aplicación
const port = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en línea en el puerto ${port}`);
});