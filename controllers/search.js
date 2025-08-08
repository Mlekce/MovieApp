async function queryDatabase(req, res) {
  res.status(200).json({ message: "Upit" });
}

async function movieMetaData(req, res) {
  res.status(200).json({ message: "Upit" });
}

module.exports = {
  queryDatabase,
  movieMetaData,
};
