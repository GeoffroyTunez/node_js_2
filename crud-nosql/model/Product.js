const mongoose = require("mongoose")

const schema = mongoose.Schema({
  name : String,
  description : String,
  quantity : Number,
  price : Number,
})                    

module.exports = mongoose.model('product', schema)