const Photographer = require('../model/photographer');
const jwt = require('jsonwebtoken');

exports.create  = (req, res, next) => {
  const password = req.body.password;
  const userName = req.body.userName;
  Photographer.getPhotographerByUserName(userName, (err, callback) => {
    if (err) throw err;
    if (callback.length) {
      return res.status(409 ).json({
        error: 'user name alrealy exist'
      });
    }
    Photographer.hashPassword(password, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      } else {
        const photographer = new Photographer({
          name: req.body.name,
          age: req.body.age,
          password: hash,
          userName: userName
        });
        Photographer.createPhotographer(photographer, (err, callback) => {
          if (err) throw err;
          res.status(200).json(callback);
        });
      }
    });
  });
}

exports.index = (req, res, next) => {
  Photographer.getPhotographers((err, callback) => {
    if (err) res.json(err);
    if (callback.length) {
      res.status(200).json(callback);
    } else {
      res.status(404).json({
        error: 'photographer not found'
      });
    }
  })
}

exports.show = (req, res, next) => {
  const id = req.params.photographerId;
  Photographer.getPhotographer(id, (err, callback) => {
    if (err) throw err;
    res.status(200).json(callback);
  });
}

exports.update = (req, res, next) => {
  const id = req.params.photographerId;
  const body = req.body;

  Photographer.updatePhotographer(id, body, (err, callback) => {
    if (err) throw err;
    res.status(200).json(callback);
  });
}

exports.delete = (req, res, next) => {
  const id = req.params.photographerId;
  Photographer.deletePhotographer(id, (err, callback) => {
    if (err) throw err;
    res.status(200).json(callback);
  });
}
