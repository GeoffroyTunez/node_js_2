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
