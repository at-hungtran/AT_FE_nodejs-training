const Picture = require('../model/picture');

exports.create = (req, res, next) => {
  const photographerId = req.photographerId;
  const picture = req.files.map(item => 
    new Picture({
      photographerId: photographerId,
      name: item.filename
    })
  )

  Picture.createManyPicture(picture, (err, callback) => {
    if (err) throw err;
    res.status(200).json(callback);
  });
}

exports.index = (req, res, next) => {
  Picture.getPictures((err, callback) => {
    if (err) throw err;
    if (callback.length) {
      res.status(200).send(callback);
    } else {
      res.status(404).json({
        error: 'no picture'
      });
    }
  });
}

exports.show = (req, res, next) => {
  const userName = req.params.userName;
  Picture.getPicture(userName, (err, callback) => {
    if (err) throw err;
    res.status(200).json(callback);
  });
}

exports.update = (req, res, next) => {
  console.log('update');
  const id = req.params.pictureId;
  const body = req.body;
  Picture.updatePicture(id, body, (err, callback) => {
    if (err) throw err;
    res.status(200).json(callback);
  });
}

exports.delete = (req, res, next) => {
  console.log('delete');
  const id = req.params.pictureId;
  Picture.deletePicture(id, (err, callback) => {
    if (err) throw err;
    res.status(200).json(callback);
  });
}
