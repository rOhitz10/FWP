const jwt = require("jsonwebtoken");
const Seller = require("../model/seller");
const bcrypt = require("bcrypt");
const { check, validationResult } = require('express-validator');

require('dotenv').config();

module.exports.registerSeller = async (req,res) => {
 
 const {
  firstName,
  lastName,
  email,
  phone,
  password,
  businessName,
  businessType,
  address,
  city,
  state,
  zip,
  panId,
  gstId,
} = req.body;

try {
 const existingSeller = await Seller.findOne({email});
 if(existingSeller) {
  return res.status(400).json({message: "Seller already exists with this email."});
 }
//  const isPanValid = await validatePAN(panId);
//  if(!isPanValid) {
//   return res.status(400).json({
//    success:false,
//    message: "Invalid PAN ID."});
//  }
 const hashedPassword = await bcrypt.hash(password, 10);
 const newSeller = new Seller({
  firstName,
  lastName,
  email,
  phone,
  password:hashedPassword,
  businessName,
  businessType,
  address,
  city,
  state,
  zip,
  panId,
  gstId,
 })
 

 // gen verification token
 const Token = jwt.sign(
  {email, role: 'seller'},
  process.env.JWT_SECERT,
  {expiresIn: '2h'},
 )

 // save to db
 await newSeller.save();

 res.status(201).json({
  success: true,
  message: 'Seller registered successfully. Please verify your email and phone.',
  data: {
      id: newSeller._id,
      businessName: newSeller.businessName,
      email: newSeller.email,
      status: newSeller.status
  },
  token: Token
});

} catch (error) {
  console.error('Seller registration error:', error);
        
  // Handle duplicate key errors
  if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
          success: false,
          message: `${field} already exists`
      });
  }
  if (error instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
    }));
    return res.status(400).json({
        success: false,
        errors
    });
}

  res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
}

}

module.exports.loginSeller = async (req,res) => {
  const { email, password } = req.body;
 try {
  const seller = await Seller.findOne({ email });
  if(!seller){
    return res.status(401).json({msg:"invalid email or password"})
  }
  const isMatch = await bcrypt.compare(password, seller.password);
  if(!isMatch){
    return res.status(401).json({msg:"invalid email or password"})
  }
  const token = jwt.sign({email,role:"seller"},process.env. JWT_SECERT,{expiresIn:"1"});
  res.json({token})
  } catch (error) {
  console.log("an error occured",error);
  
 }
}