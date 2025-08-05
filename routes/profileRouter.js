const express = require('express');
const router = express.Router({ mergeParams: true });
const profileController= require('../controllers/profile-controller');
const verify = require('../middlewares/verifyToken');


router.get('/', verify, profileController.renderProfile);
router.get('/edit', verify, profileController.renderEditProfile);
router.put('/update', verify, profileController.updateUserProfile);



module.exports = router;