// npm init -y
// npm i express
// npm i -D nodemon

const express = require("express")

const app = express()

app.use(express.json())

app.listen(3000, () => {
  console.log("App running on port 3000")
})


let Users = [{ id: 1, name: "Jean Dupont", age: 32 }, { id: 2, name: "Marie Martin", age: 28 }, { id: 3, name: "Pierre Bernard", age: 45 }, { id: 4, name: "Sophie Dubois", age: 35 }, { id: 5, name: "Lucas Petit", age: 29 }, { id: 6, name: "Emma Leroy", age: 41 }, { id: 7, name: "Thomas Moreau", age: 38 }, { id: 8, name: "Julie Roux", age: 26 }, { id: 9, name: "Nicolas Simon", age: 33 }, { id: 10, name: "Claire Lambert", age: 31 }]
let maxId = 10


app.get("/users?page=4&limite=10", (req, res) => {
  res.json(Users)
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

app.post("/users", (req, res) => {
  const { name, age } = req.body
  maxId++
  const user = { name, age, id: maxId }
  Users.push(user)

  res.status(201).json(user)
})


app.put("/users/:id", (req, res) => {
  const id = req.params.id
  const { name, age } = req.body

  if (!Users.find(u => u.id == id))
    return res.status(404).json({ message: "User not found !" })

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


