const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const router = require("./routes/movies.routes");
const Conn = require("./conn");

const port = 3000;

const app = express();

Conn();

app.use(cors());
app.use(express.json());
app.use("/movies", router);

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
