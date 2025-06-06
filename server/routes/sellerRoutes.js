const express = require('express');
router = express.Router();
const {registerSeller, loginSeller} = require('../controllers/authSellerController');
const { route } = require('./userRoutes');

router.post('/register', registerSeller);
router.post('/login',loginSeller);

router.post('/addProduct',addPoduct);
router.post('/editProduct',editProduct);
router.post('/deleteProduct',deleteProduct);

module.exports = router;
