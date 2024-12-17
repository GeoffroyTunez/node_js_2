const express = require("express");
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
