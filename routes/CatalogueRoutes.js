const express = require("express");
const router = express.Router();
const BookControllers = require("../controllers/BookControllers");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  upload.fields([
    { name: "Image", maxCount: 1 },
    { name: "fileLocation", maxCount: 1 },
  ]),
  BookControllers.addBook
);

router.post("/send-feedback", BookControllers.sendFeedback);
router.post("/Bookmark/", BookControllers.Bookmark);
router.delete("/DeleteBookmark", BookControllers.RemoveBookmark);
router.put(
  "/:id",
  upload.fields([
    { name: "Image", maxCount: 1 },
    { name: "fileLocation", maxCount: 1 },
  ]),
  BookControllers.updateBook
);
router.delete("/:id", BookControllers.deleteBook);

module.exports = router;
