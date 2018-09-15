
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

  function createUserDB(userObj) {
    user = userObj;

    firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(function(data){
      console.log(data);

      delete user.password;
      db.ref('users/' + data.user.uid).set(user);

      //redirect to home
      window.location.replace('file:///C:/Users/sijia/Documents/Programming/HTN/frontend/home.html');
    }).catch(function(error) {
      console.log("create error:", error);
    });

    
  }

  function signInAuth(email, password){
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(data){
        window.location.replace('file:///C:/Users/sijia/Documents/Programming/HTN/frontend/home.html');
    }).catch(function(error) {
      alert("sign in error:", error);
    });

  }

  function signOutAuth(){
    firebase.auth().signOut().then(function() {
      console.log("Sign-out successful.");
    }).catch(function(error) {
      console.log("Sign-out failed.");
    });
  }

  function getUserDB(){
    var userAuth = firebase.auth().currentUser;
    if(!userAuth) {
      alert("Not logged in");
      window.location.replace('file:///C:/Users/sijia/Documents/Programming/HTN/frontend/sign_in.html');
      return;
    }
    db.ref('/users/' +userAuth.uid).once('value').then(function(snapshot) {
      user = snapshot.val();
      user.uid = userAuth.uid;
      console.log(user);
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

