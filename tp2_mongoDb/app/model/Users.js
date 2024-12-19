const mongoose = require("mongoose")

const Users = mongoose.Schema({
  name: {type: String},
  age: {type: Number}
})
  
module.exports = mongoose.model('users',Users)