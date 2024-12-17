const sequelize = require("sequelize")

const db = new sequelize({
    dialect : "sequelize",
    storage : "./db.sqlite"
})