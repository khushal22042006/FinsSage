const express = require('express');
const router = express.Router({ mergeParams: true });
const billController = require('../controllers/bill-controller');
const verify = require('../middlewares/verifyToken');

router.get('/', verify, billController.renderAddForm);
router.post('/add', verify, billController.submitbill);
router.get('/all', verify, billController.getAllbill);
router.get('/:billId/edit', verify, billController.getEditBill);
router.put('/:billId/edit', verify, billController.updatebill);
router.delete('/:billId/delete', verify, billController.deletebill);



module.exports = router;
