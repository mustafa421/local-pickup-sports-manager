const express = require("express");
const mysql = require("mysql");

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

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello from API"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
