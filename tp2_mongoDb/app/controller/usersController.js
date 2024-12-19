const Users = require("../model/Users")
const {ObjectId} = require("mongoose").Types

const controller = {}


controller.all = async (req,res) =>{
    try{
        const users = await Users.find()
        if(users){
            res.send(users)
        }else{
            res.send("No user found")
        }
    }catch(err){
        res.send("error : " + err)
    }

}


controller.id = async (req, res) => {
    console.log("route id")
    res.setHeader('Content-type', 'application/json') 
    var id_user = (req.params.id) 
    if (id_user != "") {
        const user = await Users.findById(id_user)
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
        return res.json({ "message": "Id non valide"}) 
    }

    
}

controller.index = async (req, res) => {
    let page = parseInt(req.params.page) 
    let limite = parseInt(req.params.limite) 

    if (page > 0 && limite > 0) {
        
        const skip = (page - 1) * limite
        const usersPage = await Users.find()
            .skip(skip)       
            .limit(limite)


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

controller.search = async (req, res) => {
    res.setHeader('Content-type', 'application/json')
    var name = req.query.name

    
    if (name && name !== "") {
        var searchQuery = name.toLowerCase()
        
        try {
            const matchingUsers = await Users.find({
                name: { $regex: searchQuery, $options: 'i' }  
            })

            if (matchingUsers.length > 0) {
                res.json(matchingUsers)
            } else {
                
                var error = {
                    "message": "Aucun utilisateur trouvé avec ce nom",
                    "status": "error"
                }
                res.status(404).json(error)
            }
        } catch (err) {
            
            var error = {
                "message": "Une erreur est survenue lors de la recherche",
                "status": "error",
                "error": err.message
            }
            res.status(500).json(error)
        }
    } else {
        
        var error = {
            "message": "Aucun nom renseigné",
            "status": "error"
        }
        res.status(400).json(error)
    }
}

controller.create = async (req, res) => {
    const { name, age } = req.body

    if (!name || name === "" || !age || age <= 0) {
        return res.status(400).json({
            "message": "Le nom et l'âge valide sont obligatoires",
            "status": "error"
        })
    }

    try {
        const newUser = new Users({
            name,
            age
        })

        await newUser.save() 
        res.status(201).json({ newUser })
    } catch (err) {
        res.status(500).json({
            message: "Erreur lors de la création de l'utilisateur",
            status: "error",
            error: err.message
        })
    }
} 

controller.update = async (req, res) => {
    var id = (req.params.id)
    const { name, age } = req.body

    if (!name || name === "" || !age || age <= 0) {
        return res.status(400).json({
            "message": "Le nom et l'âge sont obligatoires",
            "status": "error"
        })
    }

    try {
        const user = await Users.findById(id)  
        if (user) {
            user.name = name
            user.age = age
            await user.save()  
            res.json(user)
        } else {
            res.status(404).json({
                message: "Utilisateur non trouvé",
                status: "error"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Erreur lors de la mise à jour de l'utilisateur",
            status: "error",
            error: err.message
        })
    }
}

controller.delete = async (req, res) => {
    const id = req.params.id

    try {
        // Recherche de l'utilisateur avec l'ID spécifié
        const user = await Users.findById(id)  

        // Si l'utilisateur est trouvé
        if (user) {
            // Suppression de l'utilisateur
            await user.deleteOne()  // Utilise deleteOne() pour supprimer le document
            
            res.json({
                message: "Utilisateur supprimé avec succès",
                status: "success"
            })
        } else {
            // Si l'utilisateur n'est pas trouvé
            res.status(404).json({
                message: "Utilisateur non trouvé",
                status: "error"
            })
        }
    } catch (err) {
        // Gestion des erreurs
        res.status(500).json({
            message: "Erreur lors de la suppression de l'utilisateur",
            status: "error",
            error: err.message
        })
    }
}


module.exports = controller 
