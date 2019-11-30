// ================
// FIREBASE
// ================

var config = {
    apiKey: "AIzaSyD2BgHIS1aY2LNjmpbZpeI0SQkzCHOBX8E",
    authDomain: "traintime-1de75.firebaseapp.com",
    databaseURL: "https://traintime-1de75.firebaseio.com",
    projectId: "traintime-1de75",
    storageBucket: "traintime-1de75.appspot.com",
  };

  firebase.initializeApp(config);
  
  var database = firebase.database();

// ================
// TRAIN LOGIC
// ================

// Button for adding train times
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrainTime = moment($("#trainTime").val().trim(), "HH:mm").subtract(1, "years").format("X");  
  var frequency = $("#frequencyInput").val().trim();

  // Creates local "temporary" object for holding train data
  var trainName = {
    name: trainName,
    destination: destination,
    time: firstTrainTime,
    frequency: frequency
  };

  // Uploads train data to the database
  database.ref().push(trainName);

  // Logs everything to console
  console.log(trainName.name);
  console.log(trainName.destination);
  console.log(trainName.time);
  console.log(trainName.frequency);

  alert("train successfully added");

  // Clears all of the text boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#trainTime").val("");
  $("#frequencyInput").val("");
});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().time;
  var frequency = childSnapshot.val().frequency;

  // Train Info
  console.log("Train Name: " + trainName);
  console.log("Destination: " + destination);
  console.log("Train Time: " + firstTrainTime);
  console.log("Frequency: Every " + frequency + " mins");

  // Frequency/Minutes Away Conversions
  var firstTrainConversion = moment(firstTrainTime, "HH:mm").subtract(1, "years");

  var trainDiff = moment().diff(moment(firstTrainConversion), "minutes");
  var trainRemainder = trainDiff % frequency;
  var minutesAway = frequency - trainRemainder;
  var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");
 
  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway)

  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});