const express = require('express');
const routes = express.Router();
const PictureController = require('../controller/PicturesController');
const AuthController = require('../controller/AuthController');

routes.post('/', AuthController.checkLogin, PictureController.create);

routes.get('/', PictureController.index);

routes.get('/:pictureId', PictureController.show);

routes.delete('/:pictureId', PictureController.delete);

routes.put('/:pictureId', PictureController.update);

module.exports = routes;
