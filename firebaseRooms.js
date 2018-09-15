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

function createRoomDB(room, course, callback){
    var roomsRef = db.ref('rooms/' + course);

    roomsRef.on('child_added', function(data) {
        console.log(data, data.val());
        roomsRef.off();
        callback(data.key);
    });
    roomsRef.push(room);   
}

function leaveRoomDB(roomID, course){
    var roomRef = db.ref('rooms/'+course+'/'+roomID);
    roomRef.once('value').then(function(snapshot) {
        var room = snapshot.val();
        console.log(room);
        if(room.memberCount == 1) roomRef.remove();
        else {
            room.memberCount--;
            roomRef.update(room);
        }
    });
}

function joinRoomDB(roomID, course){
    var roomRef = db.ref('rooms/'+course+'/'+roomID);
    roomRef.once('value').then(function(snapshot) {
        var room = snapshot.val();
        if(!room) {
            console.log("error!!! no room");
        } else {
            console.log(room);
            room.memberCount++;
            roomRef.update(room);
        }
        
    });
}


//tags filtering and stuff