import express from 'express';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json';

const app = express();
const port = 3000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://buno-61925.firebaseio.com"
});
const db = admin.database(); // Database instance.
const ref = db.ref(); // Reference for the Firebase-root.
const gamesRef = ref.child("Games");

// ALlows CORS VERY IMPORTANT DO NOT REMOVE
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json()); // JSON-parser. Nice to have when fetching data from POST req.



// This route is a test environment for pushing/getting data to/from Firebase.
app.get("/data", (req, res) => {
  console.log("Nothing here atm...");
});

// Console logs all users in database.
app.get("/listUsers", (req, res) => {
  function listAllUsers(nextPageToken) {
    // List batch of users, 1000 at a time.
    admin
      .auth()
      .listUsers(1000, nextPageToken)
      .then(function(listUsersResult) {
        listUsersResult.users.forEach(function(userRecord) {
          console.log("user", userRecord.toJSON());
        });
        if (listUsersResult.pageToken) {
          // List next batch of users.
          listAllUsers(listUsersResult.pageToken);
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
app.post("/createGame", (req, res) => {
  let response = req.body;
  let gameName = response.gameName;

  gamesRef.push({
    gameName: gameName,
    deck: {
      blue: 3,
      red: 6
    },
    users: {
      userId: "namn1",
      userId: "hdaifuhdf"
    }
  });
  console.log(`Full response: ${response}`);
  console.log(`Game Name: ${gameName}`);
});

app.get("/listGameNames", (req, res) => {
  

  gamesRef.once('value', function(snapshot) {
    var gameNames = [];
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      gameNames.push(childData.gameName);
      console.log(childData.gameName);
      // ...
    });
    console.log(gameNames);
    res.send(gameNames);
  });

  
});

// Deletes a game instance.
// TODO: Make this route delete a game object in database.
app.delete("/deleteGame", (req, res) => {
  console.log("Nothing here yet.");
});

// POST request for registering a new player.
app.post("/newPlayer", (req, res) => {
  let response = req.body;
  let displayName = response.displayName;
  let uid = response.uid;

  admin
    .auth()
    .createUser({
      uid: uid,
      displayName: displayName
    })
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user:", userRecord.uid);
      console.log(userRecord);
    })
    .catch(function(error) {
      console.log("Error creating new user:", error);
    });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
