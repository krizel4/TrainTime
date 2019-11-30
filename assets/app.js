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