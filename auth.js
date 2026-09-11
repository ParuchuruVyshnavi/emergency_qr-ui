document.addEventListener("DOMContentLoaded", function(){


const loginBtn = document.getElementById("loginBtn");
if(loginBtn){
loginBtn.addEventListener("click", function(){

let email = loginEmail.value.trim();
let password = loginPassword.value.trim();

let user = JSON.parse(localStorage.getItem("user"));

if(!user || email !== user.email || password !== user.password){
alert("Invalid credentials");
return;
}

localStorage.setItem("loggedIn","true");
window.location = "main.html";
});
}


const signupBtn = document.getElementById("signupBtn");
if(signupBtn){
signupBtn.addEventListener("click", function(){

let name = signupName.value.trim();
let email = signupEmail.value.trim();
let password = signupPassword.value.trim();

if(!name || !email || !password){
alert("All fields required");
return;
}

localStorage.setItem("user",
JSON.stringify({name,email,password}));

alert("Signup successful");
window.location = "index.html";
});
}


const logoutBtn = document.getElementById("logoutBtn");
if(logoutBtn){
logoutBtn.addEventListener("click", function(){
localStorage.removeItem("loggedIn");
window.location = "index.html";
});
}


if(window.location.pathname.includes("index.html")){
if(localStorage.getItem("loggedIn") !== "true"){
window.location = "index.html";
}
}

});
