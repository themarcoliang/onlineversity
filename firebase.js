
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
  var user = {};

  function createUserDB(username, name, school, email, password) {
    user = {
      username: username,
      name: name,
      school: school,
      email: email,
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(data){
      console.log(data);

      db.ref('users/' + data.user.uid).set(user);
      user.uid = data.user.uid;
    }).catch(function(error) {
      console.log("create error:", error);
    });

    
  }

  function signInAuth(email, password, callback){
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(data){
      db.ref('/users/' + data.user.uid).once('value').then(function(snapshot) {
        user = snapshot.val();
        user.uid = data.user.uid;
        console.log(user);
        callback(user);
      });
    }).catch(function(error) {
      console.log("sign in error:", error);
    });

  }

  function signOutAuth(){
    firebase.auth().signOut().then(function() {
      console.log("Sign-out successful.");
    }).catch(function(error) {
      console.log("Sign-out failed.");
    });
  }

  function addSchoolCourseDB(school, course){
    db.ref('/school/' + school).push({
      course : true
    })
  }

  function addPersonalCourseDB(school, course){
    if(school != user.school) {
      console.log( "This course is not from your school");
      return false;
    }

    var callback = function(courseObj){
      console.log("course obj:", courseObj);
      if(courseObj){
        db.ref('/users/' + user.uid + "/courses/" + course).set(true);
      }
      else console.log("This course does not exist");
    }

    db.ref('/school/' + school + "/" + course).once('value').then(function(snapshot) {
      callback(snapshot.val());
    });

  }