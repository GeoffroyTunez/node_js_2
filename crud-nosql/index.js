// npm init -y
// npm i express
// npm i -D nodemon

const express = require("express")

const app = express()

app.listen(3000, () => {
  console.log("App running on port 3000")
})


