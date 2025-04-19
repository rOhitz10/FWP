const { check, body } = require('express-validator');

const sellerRegistrationValidator = [
    // Personal Information
    check('firstName')
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
    
    check('lastName')
    .notEmpty().withMessage('Last name is required'),
    
    check('email')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),
    
    check('phone')
    .notEmpty().withMessage('Phone number is required')
    .isMobilePhone().withMessage('Please enter a valid phone number'),
    
    check('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number'),
    
    // Business Information
    check('businessName')
    .notEmpty().withMessage('Business name is required')
    .isLength({ min: 3 }).withMessage('Business name must be at least 3 characters'),
    
    check('businessType')
    .isIn(['individual', 'company', 'llp', 'partnership']).withMessage('Invalid business type'),
    
    check('address')
    .notEmpty().withMessage('Address is required'),
    
    check('city')
    .notEmpty().withMessage('City is required'),
    
    check('state')
    .notEmpty().withMessage('State is required'),
    
    check('zip')
    .notEmpty().withMessage('ZIP code is required')
    .isPostalCode('IN').withMessage('Invalid ZIP code'),
    
    // Business Documents
    check('panId')
    .notEmpty().withMessage('PAN is required')
    .isLength({ min: 10, max: 10 }).withMessage('PAN must be 10 characters')
    .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/).withMessage('Invalid PAN format'),
    
    check('gstId')
    .optional()
    .isLength({ min: 15, max: 15 }).withMessage('GST must be 15 characters')
    .matches(/\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/).withMessage('Invalid GST format')
];

module.exports = sellerRegistrationValidator;