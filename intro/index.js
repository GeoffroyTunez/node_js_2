const express = require("express")

const app = express()

const Users = ["Jhon","Martin","Mark","Julie","Marie","Lora","Loris","Jean","Martine","Jacque"]

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

app.get('/users/:name', (req, res) => {
  console.log(req.params.name)
  var name = req.params.name
  res.send(`Bonjour, ${name}`)
})

app.get('/search', (req, res) => {
  console.log(req.params.search)
  var query = req.query.search;
  if (query) {
    res.send(`Vous avez recherché : ${query}`);
  } else {
    res.send("Aucune recherche effectuée.");
  }
})

app.get('/product/:category/:id', (req,res)=>{
  var category = req.params.category
  var id = req.params.id  
  console.log(category)
  console.log(id)
  res.send(`Produit ID ${id} dans la catégorie ${category}`)
})

app.get('/api/info' , (req,res) =>{
  var json = {"message": "Bienvenue sur notre API",
              "status": "succes"
  }
  res.setHeader('Content-type', 'application/json');
 
  res.send(JSON.stringify(json));
})

app.get('/welcome', (req,res) =>{
  res.send(
  
    "<h1>Bienvenue sur notre site</h1>"+
    "<p>Explorez nos fonctionnalités ! </p>"

  )
})

app.get('/profile/:username', (req,res)=>{
  var username = req.params.username
  var age = req.query.age
  if(age){
    res.send(`Profil de ${username}, âge : ${age}`)
  }else{
    res.send(`Profil de ${username}, âge non spécifé`)
  }
})

app.get('/api/users' ,(req,res)=>{
  var name = req.query.name

  res.setHeader('Content-type', 'application/json');

  if (name) {
    const userFound = Users.includes(name);

    
    if (userFound) {
      res.send(JSON.stringify({ "message": `Utilisateur ${name} trouvé`, "status": "success" }));

    } else {
      res.send(JSON.stringify({ "message": "Utilisateur non trouvé", "status": "error" }));
    }

  } else {
    res.send(JSON.stringify({ "message": "Aucun nom en paramètre de requête", "status": "error" }));
  }
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
