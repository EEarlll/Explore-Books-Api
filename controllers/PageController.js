const Book = require("../models/BookModel");
const User = require("../models/UserModel");

const totalBook = async (req, res) => {
  try {
    const book = await Book.countDocuments({});
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const totalCategoryBook = async (req, res) => {
  try {
    const book = await Book.countDocuments({ category: req.params.id });
    if (!book) {
      return res
        .status(404)
        .json({ message: `invalid category: ${req.params}` });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const totalUserBook = async (req, res) => {
  try {
    const bookmarkedBooks = await User.findOne({ userId: req.params.id });
    const book = await Book.countDocuments({ userId: req.params.id });
    res.status(200).json({
      totaluserBook: book,
      totaluserBookmarked: bookmarkedBooks.Bookmarks.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  totalBook,
  totalCategoryBook,
  totalUserBook,
};
