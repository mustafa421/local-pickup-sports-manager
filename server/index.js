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

app.post("/editUser", (req, res) => {
  const { userID, name, email } = req.body;

  if (userID != null && (name != null || email != null)) {
    let updateBody = {};
    if (name != null && email != null) {
      updateBody = {
        username: name,
        email
      };
    } else if (name != null) {
      updateBody = {
        username: name
      };
    } else {
      updateBody = {
        email
      };
    }
    knex("user")
      .where("userID", req.body.userID)
      .update(updateBody)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        res.status = 500;
        res.send(`Error updating user: ${err}`);
      });
  } else {
    res.send("One or more required fields empty");
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
  WHERE ADDTIME(dateTime, CONCAT(duration, ":00")) > NOW()
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
 * userID: string -> the user's db id
 * gameID: string -> the ID of the game that is being joined
 * name:   string -> name of the user joining this game
 */
app.post("/joinGame", (req, res) => {
  knex("joingame")
    .where("userID", req.body.userID)
    .first()
    .then(joingame => {
      if (!joingame) {
        knex("joingame")
          .insert({
            userID: req.body.userID,
            gameID: req.body.gameID,
            name: req.body.name
          })
          .then(() => {
            knex("joingame")
              .where("userID", req.body.userID)
              .first()
              .then(joinedgame => {
                res.send(joinedgame);
              })
              .catch(err => {
                res.status = 500;
                res.send(`Error joining player to this game: ${err}`);
              });
          });
      } else {
        try {
          res.send(joingame);
        } catch (err) {
          res.status = 500;
          res.send(`Error joining player to this game: ${err}`);
        }
      }
    });
});

/**
 * userID: string -> the user's db id
 * gameID: string -> the ID of the game that is being joined
 * name:   string -> the name of the user interested
 */
app.post("/interestedGame", (req, res) => {
  knex("interestedgame")
    .where("userID", req.body.userID)
    .first()
    .then(interestgame => {
      if (!interestgame) {
        knex("interestedgame")
          .insert({
            userID: req.body.userID,
            gameID: req.body.gameID,
            name: req.body.name
          })
          .then(() => {
            knex("interestedgame")
              .where("userID", req.body.userID)
              .first()
              .then(interestedgame => {
                res.send(interestedgame);
              })
              .catch(err => {
                res.status = 500;
                res.send(`Error adding player interest to this game: ${err}`);
              });
          });
      } else {
        res.send(interestgame).catch(err => {
          res.status = 500;
          res.send(`Error adding player interest to this game: ${err}`);
        });
      }
    });
});

/**
 * gameID: id of game to get joined players from
 */
app.get("/getJoined", (req, res) => {
  const { gameID } = req.query;

  knex("joingame")
    .select("name")
    .where("gameID", gameID)
    .then(resp => res.send(resp.map(obj => obj.name)))
    .catch(err => {
      res.status = 500;
      res.send(`Error, no users joined this game: ${err}`);
    });
});

/**
 * gameID: id of game to get joined players from
 */
app.get("/getInterested", (req, res) => {
  const { gameID } = req.query;
  knex("interestedgame")
    .select("name")
    .where("gameID", gameID)
    .then(resp => res.send(resp.map(obj => obj.name)))
    .catch(err => {
      res.status = 500;
      res.send(`Error, no users interested in this game: ${err}`);
    });
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
