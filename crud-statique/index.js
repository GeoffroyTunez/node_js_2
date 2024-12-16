const express = require("express")

const app = express()

app.use(express.json())
app.listen(3000, () => {
  console.log("App running on port 3000")
})

let Products = [
  {
    id: 1,
    name: "Ordinateur portable",
    quantity: 15,
    price: 999.99,
    description: "Ordinateur portable haute performance avec processeur i7"
  },
  {
    id: 2,
    name: "Smartphone",
    quantity: 25,
    price: 699.99,
    description: "Smartphone dernière génération avec appareil photo 48MP"
  },
  {
    id: 3,
    name: "Casque audio",
    quantity: 30,
    price: 149.99,
    description: "Casque bluetooth avec réduction de bruit active"
  },
  {
    id: 4,
    name: "Tablette",
    quantity: 20,
    price: 449.99,
    description: "Tablette tactile 10 pouces idéale pour le multimédia"
  },
  {
    id: 5,
    name: "Montre connectée",
    quantity: 40,
    price: 199.99,
    description: "Montre intelligente avec suivi d'activité et notifications"
  },
  {
    id: 6,
    name: "Enceinte bluetooth",
    quantity: 35,
    price: 89.99,
    description: "Enceinte portable waterproof avec son immersif"
  },
  {
    id: 7,
    name: "Clavier gaming",
    quantity: 45,
    price: 129.99,
    description: "Clavier mécanique rétroéclairé pour gamers"
  },
  {
    id: 8,
    name: "Souris sans fil",
    quantity: 50,
    price: 59.99,
    description: "Souris ergonomique avec capteur haute précision"
  },
  {
    id: 9,
    name: "Écran 27 pouces",
    quantity: 10,
    price: 299.99,
    description: "Écran HD 4K avec taux de rafraîchissement 144Hz"
  },
  {
    id: 10,
    name: "Webcam HD",
    quantity: 28,
    price: 79.99,
    description: "Webcam 1080p avec micro intégré pour visioconférences"
  }
]

let maxId = 10





// Get All 
app.get("/products", (req, res) => {
  res.json(Products)
})

// Get by id
app.get("/products/:id", (req, res) => {
  const product = Products.find((p) => p.id == req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ message: "Product not found !" })
  }
})

// Post create
app.post("/products", (req, res) => {
  const { name, quantity, price, description } = req.body
  maxId++

  const product = {
    name, quantity, price, description, id: maxId
  }
  Products.push(product)
  res.status(201).json({ product, message: "Product created succesfully!" })
})


// Put update
app.put("/products/:id", (req, res) => {
  const { name, quantity, price, description } = req.body

  const product = {
    name, quantity, price, description, id: parseInt( req.params.id)
  }
  Products = Products.filter( (p) => p.id != req.params.id )
  Products.push(product)

  res.status(200).json({ message: "Product updated succesfully!" })
})


// Delete supprimer 
app.delete("/products/:id", (req, res) => {
  Products = Products.filter( (p) => p.id != req.params.id )
  res.status(200).json({ message: "Product deleted succesfully!" })
})