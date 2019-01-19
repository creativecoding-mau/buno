const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3000;
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const uuidv1 = require('uuid/v1');


app.options("*", cors()); // Activate CORS on server.
app.use(bodyParser.json()); // JSON-parser. Nice to have when fetching data from POST req.

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://buno-61925.firebaseio.com"
});
const db = admin.database(); // Database instance.
const ref = db.ref(); // Reference for the Firebase-root.
const gamesRef = ref.child("Games");
const usersRef = ref.child("Users");

// This route is a test environment for pushing/getting data to/from Firebase.
app.get("/data", (req, res) => {
  gamesRef.push({
    gameName: "poliGame",
    deck: {
      blue: 3,
      red: 6
    },
    users: {
      userId: "namn1",
      userId: "hdaifuhdf"
    }
  });
});

// Returns an array of all active games.
// TODO: Get an array with all gameNames in database.
app.get("/listGames", (req, res) => {
  console.log("Nothing here yet.");
});

// Creates a game instance.
// TODO: Make this route create a game object in database.
app.post('/createGame', (req, res) => {
  app.post('/createGame', (req, res) => { // Gissar på att det är så här det ska se ut //Felix
    let response = req.body;              // gif serviceAccountKey
    let gameName = response.gameName;
    console.log(`Full response: ${response}`);
    console.log(`Game Name: ${gameName}`);
  });
});

// Deletes a game instance.
// TODO: Make this route delete a game object in database.
app.delete("/deleteGame", (req, res) => {
  console.log("Nothing here yet.");
});

// POST request for registering a new player.
// TODO: push data to Firebase.
app.post("/newPlayer", (req, res) => {
  let response = req.body;
  let name = response.userName;

  let uid = uuidv1();

  admin
    .auth()
    .createCustomToken(uid)
    .then(function(customToken) {
      // Send token back to client
      console.log(customToken);
      res.send(customToken);
    })
    .catch(function(error) {
      console.log("Error creating custom token:", error);
    });

  usersRef.push({
    displayName: name,
    uid: uid
  });

  console.log(`Name: ${name}`);
  console.log(`uid: ${uid}`);
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
