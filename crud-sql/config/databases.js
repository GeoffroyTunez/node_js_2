// npm i sqlite3
// npm i sequelize

const sequelize = require("sequelize")

const db = new sequelize({
  dialect : "sqlite",
  storage : "./db.sqlite"
})

db.sync()

module.exports = db