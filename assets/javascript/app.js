// Initialize Firebase
var config = {
apiKey: "AIzaSyDkHdWIwlXbwPbMjFzXXSj48QDiUG-R70Q",
authDomain: "train-scheduler-c04be.firebaseapp.com",
databaseURL: "https://train-scheduler-c04be.firebaseio.com",
storageBucket: "train-scheduler-c04be.appspot.com",
messagingSenderId: "485475814300"
};
firebase.initializeApp(config);

var database = firebase.database();
var trainName;
var destination;
var firstTrainTime;
var frequency;
var nextArrival;
var minutesAway;


$("#submit").on("click", function(event) {


    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();
    frequency = $("#frequency").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    });
});




database.ref().on("child_added", function(snap) {
    
    var firstTrainCapture = snap.val().firstTrainTime;
    var firstTrainTimeConverted = moment(firstTrainCapture, "hh:mm");
    var currentTime = moment();
    differenceInMinutes = moment().diff(firstTrainTimeConverted, "minutes");
    var remainder = differenceInMinutes % snap.val().frequency;
    minutesAway = snap.val().frequency - remainder;
    var nextTrain = moment().add(minutesAway, "minutes");
    nextArrival = nextTrain.format("hh:mm");

    var newRow = $("<tr>");
    newRow.append($("<td>" + snap.val().trainName + "</td>"));
    newRow.append($("<td>" + snap.val().destination + "</td>"));
    newRow.append($("<td>" + snap.val().frequency + "</td>"));
    newRow.append($("<td>" + nextArrival + "</td>"));
    newRow.append($("<td>" + minutesAway + "</td>"));
    $("tbody").append(newRow);
});