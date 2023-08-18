const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const BrowseRoutes = require("./routes/BrowseRoutes");
const CatalogueRoutes = require("./routes/CatalogueRoutes");
const PaginationRoutes = require("./routes/PaginationRoutes");
const { errorMiddleware } = require("./middleware/errorMiddleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/Browse", BrowseRoutes);
app.use("/Catalogue", CatalogueRoutes);
app.use("/Pagination", PaginationRoutes);

// error handling middleware
app.use(errorMiddleware);

// Mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server listening to port 5000");
    });
    console.log("Connected to Mongodb");
  })
  .catch((error) => {
    console.log(error);
  });
