const express = require("express");
const router = express.Router();
const PageController = require("../controllers/PageController");

router.get("/", PageController.totalBook);
router.get("/:id", PageController.totalCategoryBook);
router.get("/User/:id", PageController.totalUserBook);

module.exports = router;
