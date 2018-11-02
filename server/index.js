const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "us-cdbr-iron-east-01.cleardb.net",
    user: "b228d50d18d0dc",
    password: "a7d38f2e",
    database: "heroku_c7582aec8a53b97"
  }
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
  knex("user")
    .where("email", req.body.email)
    .then(user => {
      if (user.length === 0) {
        knex("user")
          .insert({
            userID: req.body.userID,
            email: req.body.email,
            gender: req.body.gender,
            username: req.body.username
          })
          .then(() => {
            knex("user")
              .where("email", req.body.email)
              .then(addedUser => {
                res.send(addedUser);
              });
          });
      } else {
        res.send(user);
      }
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
