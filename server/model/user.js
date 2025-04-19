const mongoose = require('mongoose') 
const { isEmail } = require('validator')


const userSchema = new mongoose.Schema({
    
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email: {
        type: String,
        required: [true,'Enter an email'], 
        unique:  [true,'Email already registered'],
        lowercase : true,
        validate : [isEmail,'Invalid email']
    },

    password: {
        type: String, 
        required: [true,'Enter Password'],
        minlength : [6,'Password should have atleast 8 characters']
    },
   

},{ collection: 'users'})

 const User = mongoose.model('User', userSchema)

module.exports = User