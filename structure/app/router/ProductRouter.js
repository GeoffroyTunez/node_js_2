const router = express.router()

const myMildware = (req, res, next) => {
    console.log('Middleware actif');
    setTimeout(() => {
        next();
    }, 
    //2000 // 2s
    5 // 5ms
); 
};
app.use(myMildware)

app.get('/users/:id', (req,res) =>{
    res.setHeader('Content-type', 'application/json');
    var id = parseInt(req.params.id)
    if(id != 0 && id > 0){
        var user = Users.find( u => u.id === id )
        if(user){
            res.send(JSON.stringify(user))
        }else{
            var error = {
                "message": "Pas d'utilisateur trouvé !",
                "status": "error"
            }
            res.send(JSON.stringify(error))
        }
    }else{
        return res.json({"message":"Id non renseigner ou = / < à 0 "})
    }
})


app.get('/users/:page/:limite', (req, res) => {
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
            res.status(404)
        }
    } else {
        res.status(400)
    }
});



app.get('/users/search', (req, res) => {
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

app.post('/users', (req, res) => {
    
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

    
    Users.push(newUser)

    
    res.status(201).json({
        newUser
    })
})

app.put('/users/:id', (req, res) => {
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


app.delete('/users/:id', (req, res) => {
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


app.use((req, res, next) => {
    res.status(404).json({
        "message": "Route non trouvée"
    });
});

module.exports = router