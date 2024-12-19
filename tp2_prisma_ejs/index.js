const express = require("express");
const ejs = require("ejs")
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient()

app.use(express.json())
app.use(express.urlencoded({ extended: true })); 

const UsersRouter = require("./app/router/usersRouter")
const { myMiddleware, notFoundMiddleware } = require("./app/mildeware/mildeware")



// config ejs 
app.set("view engine", "ejs")
app.set("views", "./app/view")

app.get('/hello', (req,res) =>{
    res.render('hello',{message : "ejs install !"})
})

app.get("/view/add-user", (req, res) => {
    res.render("add-user");
});


app.get("/view/update-user/:id", async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id: id } });
    if (user) {
        res.render("update-user", { user });
    } else {
        res.status(404).send("Utilisateur non trouvé");
    }
});

app.get("/view/detail/:id", async (req, res) =>{
    try{
        const id = req.params.id
        const user = await prisma.user.findUnique({
            where: { id },
        });
        res.render("show",{user})
    } catch (error){
        console.error(error)
        res.status(500).send("Erreur interne du serveur");
    }
})

app.get("/view/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany(); 
        res.render("users", { users }); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur interne du serveur");
    }
});


app.use(myMiddleware);
app.use(UsersRouter);
app.use(notFoundMiddleware);

app.listen(3000, () => {
    console.log("App running on port 3000");
});
