const router = express.Router()
const controller = import("./app/controller/usersController")


router.get('/users/:id', controller.id())


router.get('/users/:page/:limite', controller.index());



router.get('/users/search', (req, res) => {
    res.setHeader('Content-type', 'application/json');
    
    
    var name = req.query.name;

    if (name && name !="") {
        var searchQuery = name.toLowerCase();
        var matchingUsers = Users.filter(u => u.name.toLowerCase().includes(searchQuery));

        if (matchingUsers.length > 0) {
            res.send(JSON.stringify(matchingUsers));
        } else {
            
            var error = {
                "message": "Aucun utilisateur trouvé avec ce nom",
                "status": "error"
            };
            res.send(JSON.stringify(error));
        }
    } else {
        var error = {
            "message": "Aucun nom renseigné",
            "status": "error"
        };
        res.send(JSON.stringify(error));
    }
});

router.post('/users', (req, res) => {
    
    const { name, age } = req.body

    
    if (!name && !age && name === "" && age <= 0) {
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

    
    Users.puuserControllersh(newUser)

    
    res.status(201).json({
        newUser
    })
})

router.put('/users/:id', (req, res) => {
    var id = parseInt(req.params.id)
    const { name, age } = req.body

    
    if (!name && !age && name === "" && age <= 0) {
        return res.status(400).json({
            "message": "Le nom et l'âge sont obligatoires",
            "status": "error"
        })
    }
    var user = Users.find(u => u.id === id)
    if(user){
        user.name = name
        user.age = age
        
        return res.status(200).json({
            user
        });        
    }else{
        res.status(404)
    }
})


router.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    if(id > 0){
        const userIndex = Users.findIndex(u => u.id === id)
    }
    
    if (userIndex !== -1) {
    Users.splice(userIndex, 1)
    
    return res.status(200).json({
        "message": "Utilisateur supprimé avec succès",
        "status": "success"
    })
    } else {
        return res.status(404)
    }
})



module.exports = routeur