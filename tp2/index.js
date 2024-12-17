const Users = import("./app/model/Users")
const UsersRouter = import("./app/router/usersRouter")
const express = require("express")

const app = express()
app.use(express.json());
app.use('/users',UsersRouter)

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


app.use((req, res, next) => {
    res.status(404).json({
        "message": "Route non trouvée"
    });
});

app.listen(3000, () => {
console.log("App running on port 3000")
})