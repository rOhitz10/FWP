const mongoose = require('mongoose')


const sellerSchema = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email: {type: String, required: true, unique:  true},
    phone:{type:String,required:true},
    password: {type: String, required: true},
    businessName:{type:String,required:true},
    // businessType:{type:String,required:true},
    address:{type:String,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    zip:{type:String,required:true},
    panId:{type:String,required:true},  
    gstId:{type:String,required:true},
    },
    { collection: 'sellers'}
)


const Seller = mongoose.model('sellerSchema', sellerSchema)
module.exports = Seller




