const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const moviesRoutes = require('./routes/movies');


//Traer todo el marco de trabjo
const app = express();
//Definit el puerto donde se ejecutará la app
app.set('port', 4000);

//Activar bodyparser al pasar por la URI, para que sea verdadero y tome la información para estructurarla en formato JSON
//Estructura toda la info
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//Modifica las vistas que hay en app a través de HandleBars
//Asigna como directorio inicial la vista
//Nuestro formato principal es HandleBars y le decimos que todos los archivos con extensión hbs se deben abrir
//View es una palabra reservada
app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
  extname: '.hbs',
}));
app.set('view engine', 'hbs');

//Conexión a la base de datos
//Single es opcional para indicar que solo usaré una tabla dentro de mi base de datos
app.use(myconnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'crudnodejs'
}, 'single'));

//Netamente opcional para saber en que puerto se está ejecutando
app.listen(app.get('port'), () => {
  console.log('Listening on port ', app.get('port'));
});


app.use('/', moviesRoutes);

//Dar la primera ruta al proyecto, indicando cual es la primera vista que mostrará.Promise
app.get('/', (req, res) => {
  res.render('home');
});