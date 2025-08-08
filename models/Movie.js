const db = require("../data/database");
const { ObjectId } = require("mongodb");

class Movie {
  constructor(title, year, path, meta) {
    this.title = title;
    this.year = year;
    this.path = path;
    this.meta = meta || null;
  }

  async addMovie() {
    try {
      const check = await db.getDb().collection("movie").findOne({
        title: this.title,
        year: this.year
      });
      if (!check) {
        return await db.getDb().collection("movie").insertOne({
          title: this.title,
          year: this.year,
          path: this.path,
          meta: this.meta,
        });
      }
      return false;
    } catch (error) {
      throw new Error("Error adding movie!");
    }
  }

  static async removeMovie(id) {
    return await db.getDb().collection("movie").deleteOne({ _id: new ObjectId(id) });
  }

  static async findAllMovies() {
    return await db.getDb().collection("movie").find().toArray();
  }

  static async findMovies(title) {
    return await db.getDb().collection("movie").find({ title: title }).toArray();
  }

  static async setMovieFolderPath(folderPath) {
    return await db.getDb().collection("root").updateOne(
      {},
      { $set: { folder: folderPath } },
      { upsert: true }
    );
  }

  static async getFolderPath() {
    const data = await db.getDb().collection("root").findOne({});
    return data ? data.folder : false;
  }
}

module.exports = Movie;
