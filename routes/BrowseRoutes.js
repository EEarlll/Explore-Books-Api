const express = require("express");
const router = express.Router();
const BrowseController = require("../controllers/BrowseController");

router.get("", BrowseController.getBooks);
router.get("/Categories/", BrowseController.getCategories);
router.get("/Query", BrowseController.getSearchedBooks);
router.get("/:id", BrowseController.getOneBook);
router.get("/UserBook/:id", BrowseController.getUserBook);
router.get("/Category/:id", BrowseController.getCategoryBook);
router.get("/Bookmark/:id", BrowseController.getBookmarkedBooks);

module.exports = router;
