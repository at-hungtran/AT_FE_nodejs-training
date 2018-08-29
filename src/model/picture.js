const mongoose = require('mongoose');
const del = require('del');

const pictureSchema = mongoose.Schema({
  photographerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'photographer',
    required: true
  },
  name: {
    type: String,
    required: true 
  }
});

const Picture = module.exports = mongoose.model('picture', pictureSchema, 'pictureCol');

module.exports.createPicture = (picture, callback) => {
  picture.save(callback)
}

module.exports.createManyPicture = (picture, callback) => {
  Picture.insertMany(picture, callback)
}

module.exports.getPictures = (callback) => {
  Picture.find(callback).populate('photographerId');
}

module.exports.getPicture = (id, callback) => {
  Picture.findById(id, callback);
}

module.exports.updatePicture = (id, body, callback) => {
  Picture.findByIdAndUpdate(id, body, callback)
}

module.exports.deletePicture = (id, callback) => {
  Picture.deleteOne({ _id: id }, callback);
}

module.exports.delfile = (folder, fileName, callback) => {
  del([`${folder}/${fileName}`]).then(callback);
}
