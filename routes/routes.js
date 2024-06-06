
const express = require('express');
const authController = require('./controllers/authController');
const fileController = require('./controllers/fileController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify-otp', authController.verifyOTP);

router.post('/upload', fileController.uploadFile);
router.get('/files', fileController.getFiles);
router.get('/files/:id', fileController.getFile);

module.exports = router;
