const express = require('express');
const routes = express.Router();
const albumsController = require('../controller/AlbumsController');

routes.post('/', albumsController.create);

module.exports = routes;
