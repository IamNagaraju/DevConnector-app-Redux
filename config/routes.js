const express = require('express');
const { usersController } = require('../app/controllers/usersController');
const { profilesController } = require('../app/controllers/profilesController');
const { postsController } = require('../app/controllers/postsController');

const router = express.Router();

router.use('/users', usersController);
router.use('/posts', postsController);
router.use('/profiles', profilesController);

module.exports = {
  router,
};
