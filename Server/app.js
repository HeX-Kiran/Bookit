const express = require("express");
const registerRoute = require("./routes/registerRoute");
const loginRoute = require("./routes/loginRoute");
const currentUserRoute = require("./routes/currentUser");
const movieRouter = require("./routes/movieRoute");
const theatreRouter = require("./routes/theatreRoute");

const app = express();
app.use(express.json());

app.use("/api/user/register",registerRoute);
app.use("/api/user/login",loginRoute);
app.use("/api/user/currentUser",currentUserRoute);
app.use("/api/movie",movieRouter);
app.use("/api/theatre",theatreRouter);





module.exports = app;