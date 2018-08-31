const Album = require('../model/album');

exports.create = (req, res, next) => {
  const album = new Album({
    photographerId: req.body.photographerId,
    name: req.body.name
  });

  Album.createAlbum(album, (err, callback) => {
    if (err) throw err;
    res.status(200).json(callback);
  });
}
