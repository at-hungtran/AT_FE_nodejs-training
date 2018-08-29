const express = require('express');
const routes = express.Router();
const PictureController = require('../controller/PicturesController');
const AuthController = require('../controller/AuthController');
var multer = require('multer');

const folderName = 'uploads';
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, `./${folderName}/`);
  },
  filename: function(req, file, callback) {
    callback(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

routes.post('/', AuthController.checkLogin,
                 upload.array('pictureName'),
                 PictureController.create);

routes.get('/', AuthController.checkLogin, PictureController.index);

routes.get('/:pictureId', PictureController.show);

routes.delete('/:pictureId', PictureController.delete);

routes.put('/:pictureId', PictureController.update);

module.exports = routes;
