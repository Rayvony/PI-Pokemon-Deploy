require("dotenv").config();
const express = require("express");
const server = express();
const { conn } = require("./src/db.js");
const port = process.env.PORT || 3001;

const routes = require("./src/routes");

server.use(express.static(path.join(__dirname, "frontend", "build")));

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(port, "0.0.0.0", () => {
    console.log("Listening at " + port);
  });
});

module.exports = server;
