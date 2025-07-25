// routes/transactionRoutes.js
const express = require('express');
const router = express.Router({ mergeParams: true });
const txController = require('../controllers/transaction-controller');
const verify = require('../middlewares/verifyToken');

router.get('/', verify, txController.renderAddForm);
router.post('/add', verify, txController.submitTransaction);

module.exports = router;
