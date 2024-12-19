const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient()

const UsersRouter = require("./app/router/usersRouter");
const { myMiddleware, notFoundMiddleware } = require("./app/mildeware/mildeware");

app.use(express.json()); 

app.use(myMiddleware);
app.use(UsersRouter);
app.use(notFoundMiddleware);

app.listen(3000, () => {
    console.log("App running on port 3000");
});
