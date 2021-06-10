const path = require("path");

const express = require("express");

//start express app
const app = express();
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");

const allRoutes = require("./Routes/allRoutes");

app.enable("trust proxy");

app.use(methodOverride("_method"));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// 1.MIDDLEWARES

//Body parser,reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

//serving static files
app.use(express.static(path.join(__dirname, "public")));

//ROUTES
app.use("/", allRoutes);

module.exports = app;
