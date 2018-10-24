const express = require("express");
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "localPickupSportsManager"
});

con.connect(err => {
  if (err) throw err;
  console.log("Connected!");
  const sql =
    "INSERT INTO test (id, age, description, name) VALUES (2, 17, 'test', 'testName')";
  con.query(sql, (err2, result) => {
    if (err2) throw err2;
    console.log("1 record inserted");
    console.log(result);
  });
});

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello from API"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
