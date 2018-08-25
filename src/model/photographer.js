const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const photographerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: { 
    type: Number,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const Photographer = module.exports =  mongoose.model('photographer', photographerSchema, 'photographerCol');

module.exports.createPhotographer = (photographer, callback) => {
  photographer.save(callback);
}

module.exports.getPhotographers = (callback) => {
  Photographer.find(callback);
}

module.exports.getPhotographer = (id, callback) => {
  Photographer.find({ _id: id }, callback);
}

module.exports.getPhotographerByUserName = (userName, callback) => {
  Photographer.find({ userName: userName }, callback);
}

module.exports.updatePhotographer = (id, body, callback) => {
  Photographer.findByIdAndUpdate(id, body, callback)
}

module.exports.deletePhotographer = (id, callback) => {
  Photographer.deleteOne({ _id: id }, callback);
}

module.exports.hashPassword = (password, callback) => {
  bcrypt.hash(password, 10, callback);
}

module.exports.comparePassword = (password, hash, callback) => {
  bcrypt.compare(password, hash, callback);
}
