const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const attachRoutes = require("./routes"); // whenever we require a whole directory, node looks for the "index.js" fle FIRST under that directory we required
const db = require("./database/models");

app.use(bodyParser.json()); //  basically tells the system that we want json to be used.

const port = process.env.PORT || 7000;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://ps48tickets.herokuapp.com/');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

attachRoutes(app);

db.sequelize
  .sync()
  .then(() => console.log("Database connected. Tables Synced!"))
  .catch((err) => console.error("Error. Syncing did not occur because: ", err));

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
