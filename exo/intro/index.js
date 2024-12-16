const express = require("express")

const app = express()

app.listen(3000, () => {
  console.log("App running on port 3000")
})


// Exercice 1 : Route simple avec retour texte
// Crée une route GET à l'adresse /hello qui retourne le texte suivant :
// "Bonjour, bienvenue dans notre API!"
app.get("/hello", (req, res) => {
  res.send("Bonjour, bienvenue dans notre API!")
})


// Exercice 2 : Route avec path parameters
// Crée une route GET à l'adresse /user/:name qui retourne un message personnalisé :
// "Bonjour, [name]!"
// Remplace [name] par la valeur du paramètre passé dans l'URL.

app.get("/users/:name", (req, res) => {
  const name = req.params.name
  res.send(`Bonjour, ${name}!`)
})


// Exercice 3 : Route avec query parameters
// Crée une route GET à l'adresse /search qui accepte un paramètre de requête query.
// Retourne un message sous forme de texte :
// "Vous avez recherché : [query]"
// Si aucun paramètre query n'est fourni, retourne :
// "Aucune recherche effectuée."

app.get("/search", (req, res) => {
  const query = req.query
  res.send("Vous avez recherché : " + JSON.stringify(query))
})


// Exercice 4 : Route avec plusieurs path parameters
// Crée une route GET à l'adresse /product/:category/:id qui retourne un message détaillant la catégorie et l'identifiant du produit :
// "Produit ID [id] dans la catégorie [category]"
// Remplace [id] et [category] par les valeurs des paramètres d'URL.


//  localhost:3000/product/fruits/656
app.get("/product/:category/:id", (req, res) => {

  const id = req.params.id
  const category = req.params.category
  // const {id, category} = req.params
  res.send(`Produit ID ${id} dans la catégorie ${category}`)
})



// Exercice 5 : Retourner un objet JSON simple
// Crée une route GET à l'adresse /api/info qui retourne un objet JSON :
app.get("/api/info", (req, res) => {
  res.json({
    message: "Bienvenue sur notre api !",
    status: "success"
  })
})


// Exercice 6 : Route avec HTML en retour
// Crée une route GET à l'adresse /welcome qui retourne une réponse HTML :
app.get("/welcome", (req, res) => {
  res.send(`
    <h1>Bienvenue sur notre site !</h1> 
    <p> Explorez nos fonctionnalités ! </p>
    `)
})


// Exercice 7 : Combinaison de path et query parameters
// Crée une route GET à l'adresse /profile/:username qui accepte un paramètre de requête age.
// Retourne un message personnalisé sous la forme :
// "Profil de [username], âge : [age]"
// Si age n'est pas fourni, retourne :
// "Profil de [username], âge non spécifié."
app.get("/profile/:username", (req, res) => {
  const username = req.params.username
  const age = req.query.age

  if (age) {
    res.send(`Profil de ${username}, âge : ${age}`)
  } else {
    res.send(`Profil de ${username}, âge non spécifié.`)
  }
})




// Exercice 8 : Filtrage avec query parameters
// Crée une route GET à l'adresse /api/users qui accepte un paramètre de requête name.
// Créer une const Users avec 10 utilisateurs dans un tableau 
// Si name est fourni, retourne l'utilisateur dont le name correspond.
// Si aucun utilisateur ne correspond, retourne un message d’erreur JSON


const Users = [
  { id: 1, name: "Jean", email: "jean.dupont@email.com", age: 32 },
  { id: 2, name: "Marie", email: "marie.martin@email.com", age: 28 },
  { id: 3, name: "Pierre", email: "pierre.durand@email.com", age: 45 },
  { id: 4, name: "Sophie", email: "sophie.bernard@email.com", age: 35 },
  { id: 5, name: "Lucas", email: "lucas.petit@email.com", age: 29 },
  { id: 6, name: "Emma", email: "emma.leroy@email.com", age: 31 },
  { id: 7, name: "Thomas", email: "thomas.moreau@email.com", age: 42 },
  { id: 8, name: "Julie", email: "julie.roux@email.com", age: 26 },
  { id: 9, name: "Nicolas", email: "nicolas.simon@email.com", age: 38 },
  { id: 10, name: "Camille", email: "camille.laurent@email.com", age: 33 }
]

app.get("/api/users", (req, res) => {
  const name = req.query.name

  const user = Users.find((u) => u.name === name)

  if (user) {
    res.json(user)
  } else {
    res.json({error : "User not found !"})
  }
})


// app.get("/api/users", (req, res) => {
//   const user = Users.find((u) => u.name === req.query.name)
//   res.json(user ?? { error: "User not found !" })
// })