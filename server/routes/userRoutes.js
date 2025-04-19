const { Router } = require('express');
const router = Router();

// Import controllers
const {  login,signup} = require('../controllers/UserController');

const {adminportal_post,croppage_id_get,productpage_id_get,search_post, getCropRecommendation, getAllProducts} = require('../controllers/viewController');

const {Cart_get,addToCart_post,deleteItem_post} = require('../controllers/cartController');

const {fetch_messages,send_messages} = require('../controllers/messageController');

const { ProfilePicUpload_post} = require('../controllers/imageController');
const validateAuth = require('../utils/validateAuth');

// Authentication Routes
router.post('/login',login);
router.post('/register', signup);

// Page Routes
router.post('/crop', getCropRecommendation);
router.get('/Allproducts', getAllProducts);


// router.get('/productpage/:id', productpage_id_get);
// router.post('/adminportal', adminportal_post);
// router.get('/croppage/:id', croppage_id_get);
// router.post('/search', search_post);

// // // Cart Routes
// // router.get('/Cart/:email', Cart_get);
// router.post('/addToCart', addToCart_post);
// router.post('/delete-item', deleteItem_post);

// // // Message Routes
// router.get('/fetchMessages', fetch_messages);
// router.post('/sendMessages', send_messages);

// // // Image Routes
// router.post('/uploadprofilepic/:email', ProfilePicUpload_post);

module.exports = router;