const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a title"],
    },
    fileLocation: {
      type: String,
      required: [true, "Please enter a url"],
    },
    fileName: {
      type: String,
    },
    Image: {
      type: String,
      required: [true, "Please enter an image"],
    },
    ImageName: {
      type: String,
    },
    Description: {
      type: String,
      required: [true, "provide a description"],
    },
    category: {
      type: String,
      required: [true, "provide a category"],
    },
    userId: {
      type: String,
      required: [true, "Please Login"],
    },
    creator: {
      type: String,
      required: [true, "Please Login"],
    },
  },
  { timestamps: true }
);

const book = mongoose.model("Book", bookSchema);
module.exports = book;
