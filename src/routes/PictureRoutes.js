const express = require('express');
const routes = express.Router();
const PictureController = require('../controller/PicturesController');
const AuthController = require('../controller/AuthController');
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const upload = multer({storage: storage});

routes.post('/', AuthController.checkLogin,
                 upload.array('pictureName'),
                 PictureController.create);

routes.get('/', AuthController.checkLogin, PictureController.index);

routes.get('/:pictureId', PictureController.show);

routes.delete('/:pictureId', PictureController.delete);

routes.put('/:pictureId', PictureController.update);

module.exports = routes;
