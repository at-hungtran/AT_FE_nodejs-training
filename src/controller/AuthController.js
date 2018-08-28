const Photographer = require('../model/photographer');

exports.checkLogin = (req, res, next) => {
  password = req.body.picture[0].password; 
  id = req.body.picture[0].photographerId;
  
  Photographer.getPhotographer(id, (err, callback) => {
    if (err) throw err;
    if (callback) {
      Photographer.comparePassword(password, callback.password, (err, isPasswordMatch) => {
        if (err) throw err;
        if (isPasswordMatch) {
          next();
        }
        else {
          res.status(401).json({
            error: 'auth failt',
          })
        }
      });
    }
    else {
      res.status(404).json({
        error: 'auth failt',
      })
    }
  });
}
