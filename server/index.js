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

/**
 * @param
 * location -> object
 *      * latitude -> number
 *      * longitude -> number
 * preferences -> array
 *      * TODO -> Define what this looks like
 *
 * @returns an array containing game objects that match the
 *  user's preferences
 *
 *  i.e [ { duration, skill_level, ... }]
 */
app.get("/getGames", (req, res) => {
  // Retrieve GET request URL parameters
  const { location, preferences } = req.query;

  const games = [
    {
      title: "Basketball",
      skillLevel: "Beginner",
      duration: "2 Hours"
    },
    {
      title: "Football",
      skillLevel: "Intermediate",
      duration: "1 hour"
    },
    {
      title: "Soccer",
      skillLevel: "Expert",
      duration: "30 minutes"
    },
    {
      title: "Hockey",
      skillLevel: "Beginner",
      duration: "1 hour"
    }
  ];

  res.send(games);
  // res.send(games);
});

app.post("/createGame", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

/**
 * userId: string -> the user's db id
 * name: string -> players name
 * interested: boolean -> is the user interested or joining
 */
app.post("/joinGame", (req, res) => {
  const { userId, name, interested } = req.body;
  console.log(`${userId} ${interested} ${name}`);
  console.log(req.body);
  res.send();
});

/**
 * We currently get the following fields from the request object
 * email, gender, facebook id, name
 */
app.post("/loginUser", (req, res) => {
  knex("user")
    .where("email", req.body.email)
    .first()
    .then(user => {
      if (!user) {
        knex("user")
          .insert({
            userID: req.body.id,
            email: req.body.email,
            gender: req.body.gender,
            username: req.body.username
          })
          .then(() => {
            knex("user")
              .where("email", req.body.email)
              .first()
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
