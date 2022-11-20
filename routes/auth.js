const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { check, body } = require('express-validator');
const User = require('../models/user');

router.get('/login', authController.getLogin);
router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid Email')
      .normalizeEmail(),
    body('password', 'password has to be valid')
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);
router.post('/logout', authController.postLogout);
router.get('/signup', authController.getSignup);
router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please Enter a Valid Email')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('Email Already Exist');
          }
        });
      })
      .normalizeEmail(),

    body(
      'password',
      'enter a password with only number and text at least 5 character'
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password does not Match');
        }
        return true;
      })
      .trim(),
  ],
  authController.postSignup
);
router.get('/reset/:token', authController.getNewPassword);
router.get('/reset', authController.getReset);
router.post('/new-password', authController.postNewPassword);
router.post('/reset', authController.postReset);

module.exports = router;
