const mongoose = require('mongoose')

exports.dbConnection = ()=>{
 mongoose.connect(process.env.MONGO_URI)
 .then(() => {
  console.log("DB connected");   
 })
 .catch(() => {
  console.error("DB connection failed:", err.message);   
 })
}







