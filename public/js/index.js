/* eslint-disable */
import "@babel/polyfill";
import { login, logout, signUp } from "./login";

//DOM ELEMENTS
const loginForm = document.querySelector(".form--login");
const logOutBtn = document.querySelector(".nav__el--logout");
const signUpForm = document.querySelector(".form--signup");
//VALUES
//DELEGATION

if (signUpForm) {
  signUpForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("namesignup").value;
    const email = document.getElementById("emailsignup").value;
    const password = document.getElementById("passwordsignup").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    signUp({ name, email, password, passwordConfirm });
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener("click", logout);
}
