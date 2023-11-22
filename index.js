const express = require("express"),
  app = express(),
  bodyParser = require("body-parser");

// use express-async-errors for express < v5
// no issues if express is >= v5 since it handles global errors in the middleware
require("express-async-errors");

const db = require("./db"),
  meetingRoutes = require("./controllers/meeting.controller");

//middleware
// set body-parser
app.use(bodyParser.json());
// set routes
app.use("/api/meetings", meetingRoutes);

// global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send("something went wrong");
});

// first make sure db connection is successful
// then start the express server
db.query("SELECT 1")
  .then(() => {
    console.log("db connection successful");
    app.listen(3000, () => console.log("listening on port 3000"));
  })
  .catch((err) => console.log("db connection failed. \n" + err));
