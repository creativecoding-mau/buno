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


// Console logs all users in database.
app.get("/listUsers", (req, res) => {
  function listAllUsers(nextPageToken) {
    // List batch of users, 1000 at a time.
    admin.auth().listUsers(1000, nextPageToken)
      .then(function(listUsersResult) {
        listUsersResult.users.forEach(function(userRecord) {
          console.log("user", userRecord.toJSON());
        });
        if (listUsersResult.pageToken) {
          // List next batch of users.
          listAllUsers(listUsersResult.pageToken)
        }
      })
      .catch(function(error) {
        console.log("Error listing users:", error);
      });
  }
  // Start listing users from the beginning, 1000 at a time.
  listAllUsers();
});

// Creates a game instance.
// TODO: Make this route create a game object in database.
app.post('/createGame', (req, res) => {
  let response = req.body;              
  let gameName = response.gameName;
  console.log(`Full response: ${response}`);
  console.log(`Game Name: ${gameName}`);
});


// Deletes a game instance.
// TODO: Make this route delete a game object in database.
app.delete("/deleteGame", (req, res) => {
  console.log("Nothing here yet.");
});

// POST request for registering a new player.
app.post("/newPlayer", (req, res) => {
  let response = req.body;
  let name = response.userName;
  let uid = uuidv1();
  
  admin.auth().createUser({
    uid: uid,
    displayName: name,
  })
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user:", userRecord.uid);
      console.log(userRecord);
    })
    .catch(function(error) {
      console.log("Error creating new user:", error);
    });

  console.log(`Name: ${name}`);
  console.log(`uid: ${uid}`);
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
