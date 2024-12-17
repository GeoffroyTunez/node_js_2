// npm init -y
// npm i express
// npm i -D nodemon

const express = require("express")

const app = express()

app.use((req, res, next) => {
  setTimeout(() => {
    next()
  }, 2000)
})


app.use(express.json())

app.listen(3000, () => {
  console.log("App running on port 3000")
})


let Users = [{ id: 1, name: "Jean Dupont", age: 32 }, { id: 2, name: "Marie Martin", age: 28 }, { id: 3, name: "Pierre Bernard", age: 45 }, { id: 4, name: "Sophie Dubois", age: 35 }, { id: 5, name: "Lucas Petit", age: 29 }, { id: 6, name: "Emma Leroy", age: 41 }, { id: 7, name: "Thomas Moreau", age: 38 }, { id: 8, name: "Julie Roux", age: 26 }, { id: 9, name: "Nicolas Simon", age: 33 }, { id: 10, name: "Claire Lambert", age: 31 }]
let maxId = 10


const myXssMiddleware = (req, res, next) => {
  req.authUser = "Jhon"
  console.log("global middleware")
  next()
}


// Auth
// Fields
// 




app.use(myXssMiddleware)

app.get("/auth-route", (req, res) => {



  res.send(req.authUser)
})



// Ajoutez une fonctionnalité de pagination à la route GET /users.
// Acceptez deux paramètres de requête : page (numéro de page) et limit (nombre d’éléments par page).
// Retournez uniquement les utilisateurs correspondant à la page demandée.
// Exemple de requête :
// GET /users?page=1&limit=2


app.get("/users", (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 3
  const data = Users.slice(((page - 1) * limit), page * limit)

  const result = {
    totalPages: Math.round(Users.length / limit),
    currentPage: page,
    limit: limit,
    links: {
      prev: `http://localhost:3000/users?page=${page - 1}&limit=${limit}`,
      current: `http://localhost:3000/users?page=${page}&limit=${limit}`,
      next: `http://localhost:3000/users?page=${page + 1}&limit=${limit}`
    },
    data
  }

  res.json(result)
})






app.get("/users/search", (req, res) => {
  const searchField = req.query.name
  const queryResult = Users.filter((u) => u.name.toLocaleLowerCase() === searchField.toLocaleLowerCase())
  res.json(queryResult)
})

app.get("/users/:id", (req, res) => {
  const id = req.params.id
  const user = Users.find((u) => u.id == id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).json({ message: "User not found !" })
  }
})



// Mettez à jour les routes POST et PUT pour inclure une validation des données :
// Assurez-vous que name est une chaîne non vide et que age est un entier positif.
// Si les données sont invalides, retournez une erreur 400 avec un message d’erreur JSON
const nameIsPresent = (req, res, next) => {

  const { name } = req.body
  if (!name || typeof name != 'string' || name == '') {
    return res.status(400).json({ message: "Le nom doit être présent" })
  }

  next()
}

const ageIsPresentAndPositive = (req, res, next) => {

  const { age } = req.body
  if (!age || !Number.isInteger(age) || age < 0) {
    return res.status(400).json({ message: "L'âge doit être présent et positif" })
  }

  next()
}



app.post("/users", [nameIsPresent, ageIsPresentAndPositive], (req, res) => {

  const { name, age } = req.body
  maxId++
  const user = { name, age, id: maxId }
  Users.push(user)

  res.status(201).json(user)
})




app.put("/users/:id", [nameIsPresent, ageIsPresentAndPositive], (req, res) => {
  const id = req.params.id
  const { name, age } = req.body

  if (!Users.find(u => u.id == id)) {
    return res.status(404).json({ message: "User not found !" })
  }

  Users.filter(u => u.id != id)
  Users.push({ name, age, id })
  res.json({ name, age, id })
})


app.delete("/users/:id", (req, res) => {
  const id = req.params.id

  const toDel = User.find((u) => u.id == id)

  if (toDel) {
    Users = Users.filter((u) => u.id != id)
    res.json(toDel)
  } else {
    res.status(404).json({ message: "User not found !" })
  }
})


const notFound = (req, res) => {
  res.status(404).json({ message: "Page not found !" })
}

app.use(notFound)
