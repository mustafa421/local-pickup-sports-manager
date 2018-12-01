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

// TODO - Documentation for exact parameters expected as well as their types
app.post("/createGame", (req, res) => {
  if (
    req.body.sport != null &&
    req.body.duration != null &&
    req.body.skill != null &&
    req.body.chosenDate != null &&
    req.body.location != null &&
    req.body.minVal != null &&
    req.body.maxVal != null &&
    req.body.latitude != null &&
    req.body.longitude != null
  ) {
    knex("game")
      .insert({
        title: req.body.title,
        sport: req.body.sport,
        duration: req.body.duration,
        skillLevel: req.body.skill,
        dateTime: req.body.chosenDate,
        location: req.body.location,
        minPlayers: req.body.minVal,
        maxPlayers: req.body.maxVal,
        latitude: req.body.latitude,
        longitude: req.body.longitude
      })
      .then(() => {});
    res.send(req.body);
  } else {
    res.send("One or more fields empty");
  }
});

/**
 * @param {*} latitude -> number
 * @param {*} longitude -> number
 * @param {*} preferences -> array TODO -> Define what this looks like
 * @returns an array containing game objects that match the
 *  user's preferences
 *
 *  i.e [ { duration, skill_level, ... }]
 */
app.get("/getGames", (req, res) => {
  // Retrieve GET request URL parameters
  const { latitude, longitude, preferences } = req.query;

  // Add "HAVING distance < 25" to restrict games to under 25 miles
  knex
    .raw(
      `SELECT *, (3959 * acos(cos(radians(${latitude})) * cos(radians(latitude)) * cos(radians(longitude) - 
     radians(${longitude})) + 
     sin(radians(${latitude})) * 
     sin(radians(latitude)))
  ) AS distance   
  FROM game
  HAVING distance < 25  
  ORDER BY distance LIMIT 0, 20;`
    )
    .then(resp => res.send(resp[0].map(result => Object.assign({}, result))))
    .catch(err => {
      res.status = 500;
      res.send(`Error getting games: ${err}`);
    });
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
 * email, gender, facebook id/google id, name
 */
app.post("/loginUser", (req, res) => {
  knex("user")
    .where("email", req.body.email)
    .first()
    .then(user => {
      if (!user) {
        knex("user")
          .insert({
            vendorID: req.body.id,
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

app.get("/getUserByID", (req, res) => {
  const { id } = req.query;

  knex("user")
    .where("userID", id)
    .first()
    .then(user => {
      if (user) {
        res.send(user);
      } else {
        res.status(500);
        res.send("Error: User does not exist.");
      }
    });
});

app.get("/getGameByID", (req, res) => {
  const { id } = req.query;

  knex("game")
    .where("gameID", id)
    .first()
    .then(game => {
      if (game) {
        res.send(game);
      } else {
        res.status(500);
        res.send("Error: Game does not exist.");
      }
    });
});

app.listen(port, () =>
  console.log(`Local Pickup Sports Manager backend listening on port ${port}!`)
);
