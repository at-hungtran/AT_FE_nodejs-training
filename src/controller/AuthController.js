const Photographer = require('../model/photographer');

exports.checkLogin = (req, res, next) => {
  const password = req.headers.password; 
  const userName = req.headers.username;
  const conditon = {
    userName: userName
  }
  Photographer.getPhotographer(conditon, (err, callback) => {
    if (err) throw err;
    if (callback.length) {
      Photographer.comparePassword(password, callback[0].password, (err, isPasswordMatch) => {
        if (err) throw err;
        if (isPasswordMatch) {
          delete req.headers.password;
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
      res.status(401).json({
        error: 'auth failt',
      })
    }
  });
}
