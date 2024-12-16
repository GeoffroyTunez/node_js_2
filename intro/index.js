const express = require("express")

const app = express()

app.use( express.json() )
app.listen(3000, () => {
  console.log("Server running on port 3000")
})

app.get('/', (req, res) => {
  console.log(req.query.name)
  res.send("Hello from express")
})

app.get('/hello', (req, res) => {
  console.log(req.query.name)
  res.send("Bonjour, bienvenue dans notre API !")
})

app.get('/users/:id', (req, res) => {
  console.log(req.params.id)
  res.send("Hello from users/id")
})



app.get('/html-response', (req, res) => {
  res.send("<h1> Hello from html </h1>")
})

app.get('/json-response', (req, res) => {
  const user = {
    name : "Jhon",
    age: 56
  }
  res.json(user)
})


app.get("/error", (req, res) => {
  if (Math.random() > 0.5) {
    res.status(200).json({message : "OK"})
  } else {
    res.status(500).json({error : "Server error"})
  }
})



app.post("/get-body", (req,res)=> {
  console.log(req.body)
})


// app.get // Récupérer des données
// app.post // Ajouter
// app.put // Modifier { age, surname} 
// // app.patch // Modifier // { }
// app.delete // Supprimer



100 // Info

200 // Success

304 // Redirect

400 // Client error

500 // Server error
