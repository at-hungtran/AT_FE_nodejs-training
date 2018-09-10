const Album = require('../model/album');
const Photographer = require('../model/photographer');

exports.create = (req, res, next) => {
  const photographerId = req.body.photographerId;
  const condition = { _id: photographerId }

  Photographer.getPhotographer(condition, (err, callback) => {
    console.log(callback.length);
    if (err) throw err;
    if (callback.length) {
      const album = new Album({
        photographerId: req.body.photographerId,
        name: req.body.name
      });
  
      Album.createAlbum(album, (err, callback) => {
        if (err) throw err;
        res.status(200).json(callback);
      });
    } else {
      res.status(404).json({
        error: 'photographer not found'
      });
    }
  })
}

exports.index = (req, res, next) => {
  Album.getAlbums((err, callback) => {
    if (err) res.json(err);
    res.status(200).json(callback);
  })
}
