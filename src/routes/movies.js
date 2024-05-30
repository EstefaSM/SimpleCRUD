const express = require('express');
//Archivo controlador
const MoviesController = require('../controllers/MovieController');
//Objeto para referirnos a las rutas
const router = express.Router();

//Mostrar la info
router.get('/movies', MoviesController.index);
router.get('/create', MoviesController.create);
//Enviar los datos que creé o modifiqué o actualicé
router.post('/create', MoviesController.store);
router.post('/movies/delete', MoviesController.destroy);
router.get('/movies/edit/:id', MoviesController.edit);
router.post('/movies/edit/:id', MoviesController.update);

module.exports = router;