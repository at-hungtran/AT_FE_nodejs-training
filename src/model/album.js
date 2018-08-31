const mongoose = require('mongoose');

const albumSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  photographerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
});

const Album = module.exports = mongoose.model('album', albumSchema);

module.exports.createAlbum = (album, callback) => {
  album.save(callback)
}
