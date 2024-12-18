const { Op } = require("sequelize")
const Users = require("../model/Users")

const controller = {}


controller.all = async (req,res) =>{
    var List_user = await Users.findAll()
    if(List_user){
        res.send(List_user)
    }else{
        res.send("No user found ")
    }

}


controller.id = async (req, res) => {
    console.log("route id")
    res.setHeader('Content-type', 'application/json') 
    var id_user = parseInt(req.params.id) 
    if (id_user != 0 && id_user > 0) {
        user = await Users.findByPk(id_user)
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

controller.index = async (req, res) => {
    let page = parseInt(req.params.page) 
    let limite = parseInt(req.params.limite) 

    if (page > 0 && limite > 0) {
        
        var usersPage = await Users.findAndCountAll({
            limite:limite,
            offset: (page -1) * limite
        })
        

        if (usersPage.count > 0) {
            res.setHeader('Content-Type', 'application/json') 
            res.status(200).json({ "users": usersPage.rows }) 
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
        var matchingUsers = await Users.findAll({
            where: {
                name: {
                    [Op.like]: `%${searchQuery}%` 
                }
            }
        });

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

controller.create = async (req, res) => {
    const { name, age } = req.body

    if (!name || name === "" || !age || age <= 0) {
        return res.status(400).json({
            "message": "Le nom et l'âge valide sont obligatoires",
            "status": "error"
        })
    }

    const newUser = await Users.create({
        name: name,
        age: age
    });
    res.status(201).json({ newUser })
} 

controller.update = async (req, res) => {
    var id = parseInt(req.params.id)
    const { name, age } = req.body

    if (!name || name === "" || !age || age <= 0) {
        return res.status(400).json({
            "message": "Le nom et l'âge sont obligatoires",
            "status": "error"
        })
    }

    var user = await Users.findByPk(id)
    if (user) {

        user = await Users.update(
            {
                name: name,
                age: age 
            },
            {
                where:{
                    id: id
                }

            }
        )
        user = await Users.findByPk(id)
        res.status(200).json({ user })
    } else {
        res.status(404).json({
            "message": "Utilisateur non trouvé",
            "status": "error"
        })
    }
}

controller.delete = async (req, res) => {
    const id = parseInt(req.params.id)
    const userIndex = await Users.findByPk(id)

    if (userIndex !== -1) {
        await Users.destroy({
            where: {
                id: id
            }
        })
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
