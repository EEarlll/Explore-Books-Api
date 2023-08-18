const Book = require("../models/BookModel");
const User = require("../models/UserModel");
const {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const { storage } = require("../config/firebase");

const sendEmail = require("../config/Email");

function randomNumberName(num, userId) {
  return num + "-" + userId + "-";
}

async function uploadBook(req, data) {
  const randomNumString = String(Math.floor(Math.random() * 10000 - 1 + 1));
  const dir = data.mimetype === "application/pdf" ? "pdfs" : "images";
  const name =
    randomNumberName(randomNumString, req.body.userId) + data.originalname;
  const storageRef = ref(storage, `${dir}/` + name);
  const metadata = {
    contentType: data.mimetype,
  };

  const snapshot = await uploadBytesResumable(
    storageRef,
    data.buffer,
    metadata
  );
  const downloadUrl = await getDownloadURL(snapshot.ref);
  return { downloadUrl, name };
}

const addBook = async (req, res) => {
  try {
    const Image_data = await uploadBook(req, req.files.Image[0]);
    const PDF_data = await uploadBook(req, req.files.fileLocation[0]);
    const bookData = {
      ...req.body,
      fileLocation: PDF_data.downloadUrl,
      fileName: PDF_data.name,
      Image: Image_data.downloadUrl,
      ImageName: Image_data.name,
    };

    const book = await Book.create(bookData);
    res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Both files are present
    if (req.files.Image && req.files.fileLocation) {
      const Image_data = await uploadBook(req, req.files.Image[0]);
      const PDF_data = await uploadBook(req, req.files.fileLocation[0]);
      const bookData = {
        ...req.body,
        fileLocation: PDF_data.downloadUrl,
        fileName: PDF_data.name,
        Image: Image_data.downloadUrl,
        ImageName: Image_data.name,
      };

      const book = await Book.findByIdAndUpdate(id, bookData);
      const { Image, fileLocation } = book;
      const ImageRef = ref(storage, Image);
      const pdfRef = ref(storage, fileLocation);
      deleteObject(ImageRef);
      deleteObject(pdfRef);
    }

    // Only one file is present
    else if (req.files.Image || req.files.fileLocation) {
      const item = req.files.Image
        ? req.files.Image[0]
        : req.files.fileLocation[0];

      // Check if pdf
      if (item.mimetype === "application/pdf") {
        const PDF_data = await uploadBook(req, req.files.fileLocation[0]);
        const bookData = {
          ...req.body,
          fileLocation: PDF_data.downloadUrl,
          fileName: PDF_data.name,
        };
        const book = await Book.findByIdAndUpdate(id, bookData);
        const { fileLocation } = book;
        const pdfRef = ref(storage, fileLocation);
        deleteObject(pdfRef);
      }
      // Check if Image
      else {
        const Image_data = await uploadBook(req, req.files.Image[0]);
        const bookData = {
          ...req.body,
          Image: Image_data.downloadUrl,
          ImageName: Image_data.name,
        };
        const book = await Book.findByIdAndUpdate(id, bookData);
        const { Image } = book;
        const ImageRef = ref(storage, Image);
        deleteObject(ImageRef);
      }
    }
    // No file are present
    else {
      const bookData = {
        ...req.body,
      };
      const book = await Book.findByIdAndUpdate(id, bookData);
    }

    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: `cannot find product : ${id}` });
    }
    const { Image, fileLocation } = book;
    const ImageRef = ref(storage, Image);
    const pdfRef = ref(storage, fileLocation);
    deleteObject(ImageRef);
    deleteObject(pdfRef);

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Bookmark = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    const ExistingUser = await User.findOneAndUpdate(
      { userId: data.userId },
      { $addToSet: { Bookmarks: data.Bookmarks } }
    );
    if (!ExistingUser) {
      const newUser = new User({
        userId: data.userId,
        Bookmarks: [data.Bookmarks],
      });
      newUser.save();
    }
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const RemoveBookmark = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    const bookmark = await User.findOneAndUpdate(
      { userId: data.userId },
      { $pull: { Bookmarks: data.Bookmarks } }
    );
    res.status(200).json({ bookmark });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendFeedback = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    sendEmail(data.subject, data.email, data.message);
    res.status(200).json({ message: "Message successfully sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addBook,
  updateBook,
  deleteBook,
  sendFeedback,
  Bookmark,
  RemoveBookmark,
};
