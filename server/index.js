"use strict";

// Basic express setup:
const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const DataHelpersFactory = require("./lib/data-helpers.js");
const tweetsRoutes = require("./routes/tweets");
let DataHelpers;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Mongo setup:
const MongoClient   = require('mongodb').MongoClient;
const MONGODB_URI   = 'mongodb://localhost:27017/tweeter';

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  console.log('Connected: ', MONGODB_URI);

  DataHelpers = DataHelpersFactory(db);

  app.use("/tweets", tweetsRoutes(DataHelpers));

  app.listen(PORT, () => {
    console.log("Tweeter listening on port " + PORT);
  });
});
