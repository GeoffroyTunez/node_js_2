const express = require("express");
const mongoose = require("mongoose")
const app = express();
const UsersRouter = require("./app/router/usersRouter");
const { myMiddleware, notFoundMiddleware } = require("./app/mildeware/mildeware");

app.use(express.json()); 

app.use(myMiddleware);
app.use(UsersRouter);
app.use(notFoundMiddleware);

app.listen(3000, () => {
    console.log("App running on port 3000");
});

var user = "geoffroytunez"
var password = "ncwDmCRkAYCUkQW3"

mongoose.connect(`mongodb+srv://${user}:${password}@testuser.zulag.mongodb.net/?retryWrites=true&w=majority&appName=testUser`)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log({ message: "Not connected", error: err });
  });