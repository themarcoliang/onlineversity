document.getElementById('btn1').addEventListener("click", createUser);
document.getElementById('btn2').addEventListener("click", addPersonalCourse);
document.getElementById('btn3').addEventListener("click", signIn);


function createUser(){
    createUserDB('uid','name','school', "sijiasong2008@hotmail.com", "123456");
}

function signIn(){
    signInAuth("sijiasong2008@hotmail.com", "123456", function(user){});
}

function addSchoolCourse(){
    addSchoolCourseDB("McMaster University", "ECON 101");
}

function addPersonalCourse(){
    addPersonalCourseDB("school", "ECON 101");
}
