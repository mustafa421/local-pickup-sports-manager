const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Hello from API"));

/**
 * We currently get the following fields from the request object
 * email, gender, facebook id, name
 */
app.post("/createGame", (req, res) => {
  console.log(req.body);
  res.send(req.body);
  // TODO - Check if user exists in database, if not, create new user
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
