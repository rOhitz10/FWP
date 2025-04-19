const express = require('express');
router = express.Router();
const {registerSeller, loginSeller} = require('../controllers/authSellerController');
const { registerProduct, editProduct, deleteProduct, getProductById } = require('../controllers/productsController');

router.post('/register', registerSeller);
router.post('/login',loginSeller);

router.post('/addProduct',registerProduct);
router.put('/edit-product/:productId', editProduct);
router.delete('/delete-product/:productId',deleteProduct);
router.get('/get-product/:productId',getProductById);

module.exports = router;
