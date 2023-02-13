const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authentification.middleware');

// import controller for index
const userController = require('../controllers/user.controller');

router.get('/', authMiddleware.validToken,userController.home );
module.exports = router;
