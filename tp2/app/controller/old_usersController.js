const Users = require("../model/Users")

const controller = {}

controller.id = (req, res) => {
    res.setHeader('Content-type', 'application/json') 
    var id = parseInt(req.params.id) 
    if (id != 0 && id > 0) {
        var user = Users.find(u => u.id === id) 
        if (user) {
            res.json(user) 
        } else {
            var error = {
                "message": "Pas d'utilisateur trouvé !",
                "status": "error"
            } 
            res.status(404).json(error) 
        }
    } else {
        return res.json({ "message": "Id non renseigné ou = / < à 0" }) 
    }
}

controller.index = (req, res) => {
    let page = parseInt(req.params.page) 
    let limite = parseInt(req.params.limite) 

    if (page > 0 && limite > 0) {
        const startIndex = (page - 1) * limite 
        const endIndex = page * limite 
        const usersPage = Users.slice(startIndex, endIndex) 

        if (usersPage.length > 0) {
            res.setHeader('Content-Type', 'application/json') 
            res.status(200).json({ "users": usersPage }) 
        } else {
            res.status(404).json({
                "message": "Aucun utilisateur trouvé",
                "status": "error"
            }) 
        }
    } else {
        res.status(400).json({
            "message": "Paramètres de pagination invalides",
            "status": "error"
        }) 
    }
}

controller.search = (req, res) => {
    res.setHeader('Content-type', 'application/json')
    var name = req.query.name

    if (name && name !== "") {
        var searchQuery = name.toLowerCase()
        var matchingUsers = Users.filter(u => u.name.toLowerCase().includes(searchQuery))

        if (matchingUsers.length > 0) {
            res.json(matchingUsers)
        } else {
            var error = {
                "message": "Aucun utilisateur trouvé avec ce nom",
                "status": "error"
            }
            res.status(404).json(error)
        }
    } else {
        var error = {
            "message": "Aucun nom renseigné",
            "status": "error"
        }
        res.status(400).json(error)
    }
} 

controller.create = (req, res) => {
    const { name, age } = req.body

    if (!name || name === "" || !age || age <= 0) {
        return res.status(400).json({
            "message": "Le nom et l'âge valide sont obligatoires",
            "status": "error"
        })
    }

    const newUser = {
        id: Users.length + 1,
        name: name,
        age: age
    }

    Users.push(newUser)

    res.status(201).json({ newUser })
} 

controller.update = (req, res) => {
    var id = parseInt(req.params.id)
    const { name, age } = req.body

    if (!name || name === "" || !age || age <= 0) {
        return res.status(400).json({
            "message": "Le nom et l'âge sont obligatoires",
            "status": "error"
        })
    }

    var user = Users.find(u => u.id === id)
    if (user) {
        user.name = name
        user.age = age
        res.status(200).json({ user })
    } else {
        res.status(404).json({
            "message": "Utilisateur non trouvé",
            "status": "error"
        })
    }
}

controller.delete = (req, res) => {
    const id = parseInt(req.params.id)
    const userIndex = Users.findIndex(u => u.id === id)

    if (userIndex !== -1) {
        Users.splice(userIndex, 1)
        return res.status(200).json({
            "message": "Utilisateur supprimé avec succès",
            "status": "success"
        }) 
    } else {
        return res.status(404).json({
            "message": "Utilisateur non trouvé",
            "status": "error"
        }) 
    }
} 

module.exports = controller 
