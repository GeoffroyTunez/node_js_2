// npm init -y
// npm i express
// npm i -D nodemon

const express = require("express")
const userRouter = require("./app/router/userRouter")

const app = express()

app.use(express.json())
app.use(userRouter)


app.listen(3000, () => {
  console.log("App running on port 3000")
})


app.use((req, res) => {
  res.status(404).json({ message: "Page not found !" })
})
