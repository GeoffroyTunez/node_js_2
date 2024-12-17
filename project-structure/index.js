const express = require("express")
const app = express()
const productRouter = require("./app/router/productRouter")


app.use(express.json())

app.use(productRouter)

app.listen(3000, () => {
  console.log("App running on port 3000")
})

