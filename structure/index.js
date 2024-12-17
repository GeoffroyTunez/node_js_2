const productRoute = require("./app/router/ProductRouter")
let Users = [
    {
        id: 1,
        name: "Jean Dupont",
        age: 32
    },
    {
        id: 2,
        name: "Marie Martin",
        age: 28
    },
    {
        id: 3,
        name: "Pierre Bernard",
        age: 45
    },
    {
        id: 4,
        name: "Sophie Dubois",
        age: 35
    },
    {
        id: 5,
        name: "Lucas Petit",
        age: 29
    },
    {
        id: 6,
        name: "Emma Leroy",
        age: 41
    },
    {
        id: 7,
        name: "Thomas Moreau",
        age: 38
    },
    {
        id: 8,
        name: "Julie Roux",
        age: 26
    },
    {
        id: 9,
        name: "Nicolas Simon",
        age: 33
    },
    {
        id: 10,
        name: "Claire Lambert",
        age: 31
    }
]


const express = require("express")

const app = express()
app.use(express.json());


app.listen(3000, () => {
console.log("App running on port 3000")
})