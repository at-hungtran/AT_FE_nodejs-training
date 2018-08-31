const express = require('express');
const router = express.Router();
const photographersRoutes = require('./PhotographerRoutes');
const pictureRoutes = require('./PictureRoutes');
const albumRoutes = require('./AlbumRoutes');

router.use('/photographers', photographersRoutes);
router.use('/pictures', pictureRoutes);
router.use('/albums', albumRoutes);

module.exports = router;
