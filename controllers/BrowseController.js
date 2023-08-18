const Book = require("../models/BookModel");
const User = require("../models/UserModel");

const getBooks = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;
    const offset = parseInt(req.query.offset) * 20 || 0;

    const books = await Book.find({})
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: `cannot find product : ${id}` });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategoryBook = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;
    const offset = parseInt(req.query.offset) * 20 || 0;

    const selectedCategory = req.params.id;
    const book = await Book.find({
      category: selectedCategory,
    })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    if (!book) {
      return res
        .status(404)
        .json(`Book with category : ${selectedCategory} not found`);
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Book.distinct("category");
    const filteredItems = {};
    for (const i of categories) {
      const book = await Book.find({ category: i })
        .sort({ createdAt: -1 })
        .limit(8);
      filteredItems[i] = book;
    }
    res.status(200).json(filteredItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserBook = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;
    const offset = parseInt(req.query.offset) * 20 || 0;
    const { id } = req.params;

    const book = await Book.find({ userId: id })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSearchedBooks = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;
    const offset = parseInt(req.query.offset) * 20 || 0;
    const searchQuery = req.query.search;
    const book = await Book.find({
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { Description: { $regex: searchQuery, $options: "i" } },
      ],
    })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookmarkedBooks = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;
    const offset = parseInt(req.query.offset) * 20 || 0;
    const { id } = req.params;
    const userBooks = await User.findOne({ userId: id });
    const BookmarkedBooks = await Book.find({
      _id: { $in: userBooks.Bookmarks },
    })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    res.status(200).json(BookmarkedBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBooks,
  getOneBook,
  getCategoryBook,
  getCategories,
  getUserBook,
  getSearchedBooks,
  getBookmarkedBooks,
};
