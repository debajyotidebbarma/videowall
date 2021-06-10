const dotenv = require("dotenv");
const mongoose = require("mongoose");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
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
exports.getvideoThumbnail = (req, res, next) => {
  gfs.files.findOne(
    {
      filename: req.params.Thumbnail,
    },
    (err, file) => {
      const readStream = gfs.createReadStream(file.filename);
      res.set("Content-Type", file.contentType);
      readStream.pipe(res);
    }
  );
};

exports.getAllVideos = (req, res) => {
  gfs.files.findOne(
    {
      filename: req.params.videoName,
    },
    (err, file) => {
      const readStream = gfs.createReadStream(file.filename);
      res.set("Content-Type", file.contentType);
      readStream.pipe(res);
    }
  );
};

//Init gfs

conn.once("open", () => {
  //Initialise the stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});
const fn = [];

const storage = new GridFsStorage({
  url: DB,
  file: (req, file) =>
    new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        fn.push(filename);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    }),
});
const upload = multer({ storage });

exports.uploadVideos = upload.array("file", 10);

exports.addMyvideos = async (req, res) => {
  const caption = fn[1].split(".")[0];
  await video.create({
    Thumbnail: fn[0],
    videoName: fn[1],
    userID: req.user._id,
    caption,
  });

  fn.splice(0);
};

exports.deleteVideo = async (req, res) => {
  const { id } = req.params;
  // const v = await video.find({ videoName: name });
  // console.log(v);
  await video.deleteOne({ _id: id });
  res.redirect("/my-videos");
};
