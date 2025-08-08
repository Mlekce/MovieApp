const path = require("path");
const movieRoutes = require("./routes/movies");
const searchRoutes = require("./routes/search");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(movieRoutes);
app.use(searchRoutes);

app.use("*", function (req, res) {
  res.status(404).json({ message: "Content not found!" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

app.listen(4000, function (err) {
  if (err) {
    throw Error("Oopsie!");
  }
  console.log("Server started at port 4000");
});
