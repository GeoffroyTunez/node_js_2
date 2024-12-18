
const db = require("../config/database")
const sequelize = require("sequelize")

Users = db.define('User', {
  id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: sequelize.STRING },
  age: { type: sequelize.INTEGER }
})

module.exports = { Users }