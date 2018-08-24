const express = require('express');
const routes = express.Router();
const photographesController = require('../controller/PhotographersController');

routes.post('/', photographesController.create);

routes.get('/', photographesController.index);

routes.get('/:photographerId', photographesController.show);

routes.put('/:photographerId', photographesController.update);

routes.delete('/:photographerId', photographesController.delete);

module.exports = routes;