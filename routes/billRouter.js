const express = require('express');
const router = express.Router({ mergeParams: true });
const goalController = require('../controllers/bill-controller');
const verify = require('../middlewares/verifyToken');

router.get('/', verify, goalController.renderAddForm);
router.post('/add', verify, goalController.submitbill);

module.exports = router;
