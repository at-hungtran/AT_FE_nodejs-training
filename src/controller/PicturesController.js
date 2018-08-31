const Picture = require('../model/picture');

exports.create = (req, res, next) => {
  const albumId = req.headers.albumid;
  const picture = req.files.map(item => 
    new Picture({
      albumId: albumId,
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
  const id = req.params.pictureId;
  const body = req.body;
  Picture.updatePicture(id, body, (err, callback) => {
    if (err) throw err;
    res.status(200).json(callback);
  });
}

exports.delete = (req, res, next) => {
  const id = req.params.pictureId;
  const folderName = 'uploads';
  
  Picture.getPicture (id, (err, callback) => {
    if (err) throw err;
    Picture.delfile(folderName, callback.name, (paths => {
      console.log('Deleted files and folders:\n', paths.join('\n'));
    }))

    Picture.deletePicture(id, (err, callback) => {
      if (err) throw err;
      res.status(200).json(callback);
    });
  });
}
