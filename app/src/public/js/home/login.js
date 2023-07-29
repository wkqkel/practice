"use strict";

const id = document.querySelector("#id");
const password = document.querySelector("#password");
const loginButton = document.querySelector("#login-button");

let count = 0;

loginButton.addEventListener("click", login);

function login() {
  const req = {
    id: id.value,
    password: password.value,
  };
  console.log(req);
}
