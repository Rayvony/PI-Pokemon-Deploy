require("dotenv").config();
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const port = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(port, "0.0.0.0", () => {
    console.log("listening at " + port); // eslint-disable-line no-console
  });
});
