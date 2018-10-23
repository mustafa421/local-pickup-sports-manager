const express = require("express");
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "localPickupSportsManager"
});

con.connect(err => {
  if (err) throw err;
  console.log("Connected!");
});

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello from API"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
