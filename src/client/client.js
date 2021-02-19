/**
 * 
 */

console.log("hello world client!");
// https://github.com/lukeed/polka/blob/master/examples/with-socketio/public/index.html
var socket = io();
// Log a message
function log (message, options) {
  console.log(message);
  //var $el = $('<li>').addClass('log').text(message);
  //addMessageElement($el, options);
}
socket.on('connect', function () {
  log('you have been connected');
});
socket.on('disconnect', function () {
  log('you have been disconnected');
});
socket.on('reconnect', function () {
  log('you have been reconnected');
});
socket.on('reconnect_error', function () {
  log('attempt to reconnect has failed');
});
//https://redom.js.org/#introduction

//========================================
//const { text, mount } = require("redom");
//const hello = text("hello");
//mount(document.body, hello);
//hello.textContent = "hi!";

//import { el, mount } from "redom";
//const { el, mount } = redom;
//const hello = el("h1", "Hello world2!");
//mount(document.body, hello);

// https://stackoverflow.com/questions/50591679/cannot-call-class-as-a-function-javascript/50592635
//var Foo = require("./foo.js");
//console.log(Foo);
//var foo = new Foo.Foo();
///console.log(foo);
//foo.log("test");
//import { Bar } from "../common/sharetest";
//import { Foo } from "./foo.js";
//console.log(Foo);
//var foo = new Foo();
//console.log(foo);
//foo.log("test");
//var bar = new Bar();
//bar.log("test client");

const { el, mount } = redom;

/*
const tile_input = el("h1", "Access Login!");
//mount(document.body, hello);
var label_userid = el("label", "User:");
var input_userid =  el("input", { type: "text", id:"userid",value:"guest" } );
var label_passphrase = el("label", "Passphrase:");
var input_passphrase =  el("input", { type: "password", id:"passphrase",value:"guest" });
// https://github.com/redom/redom/issues/36
var button_login = el("button", "Login");
var button_register = el("button", "Register");
var button_forgot = el("button", "Forgot");

function btn_login(){
  console.log("btn_login button");
  var userdata =  document.getElementById("userid");
  var passphrasedata =  document.getElementById("passphrase");
  console.log(userdata.value);
  console.log(passphrasedata.value);
}

function btn_regiter(){
  console.log("btn_regiter button");
}

function btn_forgot(){
  console.log("btn_forgot button");
}

button_login.addEventListener('click', btn_login);
button_register.addEventListener('click', btn_regiter);
button_forgot.addEventListener('click', btn_forgot);

const div_access = el("#AccessPanel", [
  tile_input
  ,label_userid
  ,input_userid
  ,label_passphrase
  ,input_passphrase
  ,button_login
  ,button_register
  ,button_forgot
]);


mount(document.body, div_access);

// https://redom.js.org/#components
// https://redom.js.org/#lifecycle

class EL_Login {
  constructor() {
      this.el = el("h1");
  }
  update(data) {
      this.el.textContent = "Hello " + data + "!";
  }
}
*/

/*
class Hello {
  constructor() {
      this.el = el("h1", "Hello RE:DOM!");
  }
  onmount() {
    console.log("mounted Hello");
  }
  onremount() {
    console.log("remounted Hello");
  }
  onunmount() {
    console.log("unmounted Hello");
  }
}
*/


// https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch








