const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const con = mysql.createConnection({
  host: "us-cdbr-iron-east-01.cleardb.net",
  user: "b228d50d18d0dc",
  password: "a7d38f2e",
  database: "heroku_c7582aec8a53b97"
});

con.connect(err => {
  if (err) throw err;
  console.log("Successfully Connected to Database!");
});

app.get("/", (req, res) => res.send("Hello from API"));

app.post("/createGame", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

/**
 * We currently get the following fields from the request object
 * email, gender, facebook id, name
 */
app.post("/loginUser", (req, res) => {
  // TODO - Check if user exists in database, if not, create new user
  console.log(req.body);
  res.send(req.body);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
