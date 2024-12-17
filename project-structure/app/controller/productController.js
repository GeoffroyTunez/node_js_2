const { Products, maxId } = require("../model/Product")
const controller = {}



// Get All 
controller.index = (req, res) => {
  res.json(Products)
}

// Get by id
controller.show = (req, res) => {
  const product = Products.find((p) => p.id == req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ message: "Product not found !" })
  }
}

// Post create
controller.create = (req, res) => {
  const { name, quantity, price, description } = req.body
  maxId++

  const product = {
    name, quantity, price, description, id: maxId
  }
  Products.push(product)
  res.status(201).json({ product, message: "Product created succesfully!" })
}


// Put update
controller.update = (req, res) => {
  const { name, quantity, price, description } = req.body

  const product = {
    name, quantity, price, description, id: parseInt(req.params.id)
  }
  Products = Products.filter((p) => p.id != req.params.id)
  Products.push(product)

  res.status(200).json({ message: "Product updated succesfully!" })
}


// Delete supprimer 
controller.destroy = (req, res) => {
  Products = Products.filter((p) => p.id != req.params.id)
  res.status(200).json({ message: "Product deleted succesfully!" })
}



module.exports = controller