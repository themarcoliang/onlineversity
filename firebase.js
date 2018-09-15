
//Init all firebase
var config = {
    apiKey: "AIzaSyDzPpDgjg7yeJi8MP165IJVcDKEHOe_Tn8",
    authDomain: "htnonlineversity.firebaseapp.com",
    databaseURL: "https://htnonlineversity.firebaseio.com",
    storageBucket: "htnonlineversity.appspot.com",
    messagingSenderId: "6129973572"
  };
  firebase.initializeApp(config);

  // Get a reference to the realtime database service
  var db = firebase.database();

  function createUserDB(username, name, contacts, password) {

    firebase.database().ref('users/' + username).set({
      username: name,
      contact: contacts,
      password : password
    });
  }

  function searchUser(username){
    return firebase.database().ref('/users/' + username).once('value').then(function(snapshot) {
      var username = snapshot.val().username;
      // ...
    });
  }