const express = require('express');
const routes = express.Router();
const photographesController = require('../controller/PhotographersController');
const Validation = require('../lib/Validation');
const Validate = require('express-validation');

routes.post('/', Validate(Validation.request), photographesController.create);

routes.get('/', photographesController.index);

routes.get('/:photographerId', photographesController.show);

routes.put('/:photographerId', photographesController.update);

routes.delete('/:photographerId', photographesController.delete);

module.exports = routes;
