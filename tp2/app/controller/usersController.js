


const id = (req,res) =>{
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
}

const index = (req, res) => {
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
}