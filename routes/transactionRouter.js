// routes/transactionRoutes.js
const express = require('express');
const router = express.Router({ mergeParams: true });
const txController = require('../controllers/transaction-controller');
const verify = require('../middlewares/verifyToken');

router.get('/', verify, txController.renderAddForm);
router.post('/add', verify, txController.submitTransaction);
router.get('/all', verify, txController.getAlltransaction);
router.get('/:transactionId/edit', verify, txController.getEditTransaction);
router.put('/:transactionId/edit', verify, txController.updateTransaction);
router.delete('/:transactionId/', verify, txController.deleteTransaction);


module.exports = router;
