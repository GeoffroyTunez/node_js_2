const db = require("../../config/databases")
const sequelize = require("sequelize")

const Users = db.define('users', {
    id : { type : sequelize.INTEGER, primaryKey : true, autoIncrement : true  },
    name : { type : sequelize.STRING },
    age : { type : sequelize.INTEGER }
  })
  
  module.exports = Users