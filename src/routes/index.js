const express = require('express');
const router = express.Router();
const photographersRoutes = require('./PhotographerRoutes');
const pictureRoutes = require('./PictureRoutes');

router.use('/photographers', photographersRoutes);
router.use('/pictures', pictureRoutes);

module.exports = router;