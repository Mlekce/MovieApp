const dns = require("dns");
const fs = require("fs").promises;
const path = require("path");
const Movie = require("../models/Movie");

function getServerName(ipaddr) {
  return new Promise((resolve, reject) => {
    dns.reverse(ipaddr, (err, hostnames) => {
      if (err) return reject(err);
      resolve(hostnames[0]);
    });
  });
}

async function setMovieFolderPath(req, res) {
  try {
    let fullPath = req.body.path;
    fullPath = path.normalize(fullPath);

    const stats = await fs.stat(fullPath);
    if (!stats.isDirectory()) {
      return res.status(400).json({ message: "Path exists but it is not a folder!" });
    }

    await fs.readdir(fullPath);

    let pathParts = fullPath.split(path.sep);

    const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

    if (ipRegex.test(pathParts[0])) {
      try {
        const server = await getServerName(pathParts[0]);
        pathParts.shift();

        if (process.platform === "win32") {
          fullPath = `\\\\${server}\\${pathParts.join("\\")}`;
        } else {
          fullPath = `//${server}/${pathParts.join("/")}`;
        }

      } catch {
        return res.status(400).json({ message: "Could not resolve server name from IP" });
      }
    }

    await Movie.setFolderPath(fullPath);
    return res.json({ message: "Folder path set successfully", path: fullPath });

  } catch (err) {
    if (err.code === "ENOENT") {
      return res.status(400).json({ message: "Folder does not exist!" });
    }
    return res.status(400).json({ message: `An error occurred: ${err.message}` });
  }
}



module.exports = {
  setMovieFolderPath,
};
