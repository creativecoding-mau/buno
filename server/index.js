const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

app.options('*', cors()); // Activate CORS on server.
app.use(bodyParser.json()); // JSON-parser. Nice to have when fetching data from POST req.

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://buno-61925.firebaseio.com'
});
const db = admin.database(); // Database instance.
const ref = db.ref(); // Reference for the Firebase-root.

// Gets all the data from the Firebase-database.
app.get('/data', (req, res) => {
  ref.once('value', function(snapshot) {
    res.send(snapshot.val());
  });
});

// Returns an array of all active games.
// TODO: Get an array with all gameNames in database.
app.get('/listGames', (req, res) => {
    console.log('Nothing here yet.')
});

// Creates a game instance.
// TODO: Make this route create a game object in database.
app.post('/createGame', (req, res) => {
    console.log('Nothing here yet.')
});

// Deletes a game instance.
// TODO: Make this route delete a game object in database.
app.delete('/deleteGame', (req, res) => {
    console.log('Nothing here yet.')
});

// POST request for registering a new player. TODO: push data to Firebase.
app.post('/newPlayer', (req, res) => {
  let response = req.body;
  let name = response.userName;
  console.log(`Full response: ${response}`);
  console.log(`Name: ${name}`);
});


app.listen(port, () => console.log(`Server listening on port ${port}!`));