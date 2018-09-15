document.getElementById('btn').addEventListener("click", createUser());

function createUser(){
    createUserDB('uid','name',{facebook: "myId"},'password');
}



