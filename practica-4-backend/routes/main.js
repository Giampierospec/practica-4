const express = require('express');
const {MainCtrl} = require('../controllers/mainController');
const router = express.Router();

router.route('/genJson')
      .post(MainCtrl.index);
router.route('/credito/:matricula')
      .get(MainCtrl.credito);

module.exports = router;