var express = require('express');
var router = express.Router();
const userMap = require('../models/model')
const jsORM = require('js-hibernate');
const dbconfig = require('../config/config');
// console.log(dbconfig);
const session = jsORM.session(dbconfig);
const userController = require('../controllers/user/signup')

/* GET users listing. */
router.get('/list_user/:id', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/sign_up', userController.signUp(session, userMap))

module.exports = router;
