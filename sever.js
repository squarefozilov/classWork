// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Reservation DATA
// =============================================================
var bookedReservation = [
  {
  name: "John Smith",
  phone: "888-555-1234",
  email: "jsmith@gmail.com",
  id: 12345
},
{
  name: "Ann Jones",
  phone: "888-555-9874",
  email: "annjones1@gmail.com",
  id: 98428
},
{
  name: "Leann Lee",
  phone: "888-555-3248",
  email: "lealee34@yahoo.com",
  id: 49857
}
];

var waitingRes = {};
 

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/view", function(req, res) {
  res.sendFile(path.join(__dirname, "viewTables.html"));
});

// Displays all tables reserved
app.get("/api/table", function(req, res) {
  var reserved = req.params.bookedReservation;
  console.log(reserved);

  for (let i = 0; i < bookedReservation.length; i++) {
   if (reserved === bookedReservation[i].routeName) {
    return res.json(bookedReservation[i].id);
   }
  }

  return res.json(false);
});

// Displays waiting list
app.get("/api/wait", function(req, res) {
  var waiting = req.params.waitingReservation;

  console.log(waiting);

  for (var i = 0; i < waitingReservation.length; i++) {
    if (waiting === waitingReservation[i].routeName) {
      return res.json(waitingReservation[i].id);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/table", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);

  bookedReservation.push(newReservation);

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});