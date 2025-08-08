const Movie = require("../models/Movie");
const fs = require("fs").promises;

async function showAllMovies(req, res) {
  res.json({ message: "hello" });
}

async function showMovieDetails(req, res) {
  res.json({ message: "hello" });
}

async function streamMovie(req, res) {
  res.json({ message: "hello" });
}

async function scanAndAddMovies(req, res) {
  try {
    const folderPath = await Movie.getFolderPath();
    const files = await fs.readdir(folderPath, { withFileTypes: true });
    for (const file of files) {
      if (file.isDirectory()) {
        const match = file.name.match(/\((\d{4})\)$/);
        const year = match ? Number(match[1]) : null;

        const title = year
          ? file.name.replace(/\(\d{4}\)$/, "").trim()
          : file.name;

        await Movie.addMovie({
          title,
          year,
          path: path.join(folderPath, file.name)
        });
      }
    }
    return res.status(200).json({ message: "Scan complete!" });
  } catch (error) {
    return res.status(500).json({ message: `Server error: ${error.message}` });
  }
}

async function deleteMovie(req, res) {
  res.json({ message: "hello" });
}

module.exports = {
  showAllMovies,
  showMovieDetails,
  streamMovie,
  scanAndAddMovies,
  deleteMovie,
};
