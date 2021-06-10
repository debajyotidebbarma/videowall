const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  Thumbnail: {
    type: String,
    required: [true, "Please upload a thumbnail"],
  },
  caption: {
    type: String,
  },
  videoName: {
    type: String,
  },
  userID: {
    type: String,
  },
});

const Video = mongoose.model("video", videoSchema);

module.exports = Video;
