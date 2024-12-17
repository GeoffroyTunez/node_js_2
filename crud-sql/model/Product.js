const db = require("../config/databases")
const sequelize = require("sequelize")

const Product = db.define('product', {
  id : { type : sequelize.INTEGER, autoIncrement : true, primaryKey : true  },
  name : { type : sequelize.STRING },
  price : { type : sequelize.FLOAT },
  quantity : { type : sequelize.INTEGER },
  description : { type : sequelize.STRING },
})

module.exports = Product