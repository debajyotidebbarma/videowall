const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const video = require("../models/videoModel");

// const methodOverride = require("method-override");

dotenv.config({
  path: "./config.env",
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const conn = mongoose.createConnection(DB, { useUnifiedTopology: true });

let gfs;

//Init gfs

conn.once("open", () => {
  //Initialise the stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Log into your account",
  });
};

exports.getSignUpForm = (req, res) => {
  res.status(200).render("signup", {
    title: "sign up",
  });
};

exports.showMyVideos = async (req, res) => {
  const myVideos = await video.find({ userID: req.user._id });
  res.status(200).render("myvideos", {
    title: "My videos",
    files: myVideos,
  });
};

exports.getAllVideos = async (req, res) => {
  const allVideos = await video.find();
  res.status(200).render("allVideos", {
    title: "All videos",
    files: allVideos,
  });
};

exports.uploadVideos = (req, res) => {
  res.status(200).render("upload", {
    title: "upload videos",
  });
};
