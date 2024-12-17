// npm init -y
// npm i express
// npm i -D nodemon

const express = require("express")
const Product = require("./model/Product")
const app = express()

app.listen(3000, () => {
  console.log("App running on port 3000")
})



app.post("/products", (req, res) => {

  const product = {
    name: "Ordinateur portable",
    price: 999.99,
    quantity: 15,
    description: "Ordinateur portable haute performance avec processeur i7"
  }
  
  Product.create(product)
  .then( (p) => {
    console.log("Product created")
    res.json({message : "Product created", product: p})
  }) 

})