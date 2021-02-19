class Person {
  constructor(fname, lname, age, address) {
    this.fname = fname;
    this.lname = lname;
    this.age = age;
    this.address = address;
  }

  get fullname() {
    return this.fname +"-"+this.lname;
  }
}

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
const { el, mount } = redom;
const hello = el("h1", "Hello world2!");
mount(document.body, hello);

// https://stackoverflow.com/questions/50591679/cannot-call-class-as-a-function-javascript/50592635
//var Foo = require("./foo.js");
//console.log(Foo);
//var foo = new Foo.Foo();
///console.log(foo);
//foo.log("test");
import { Bar } from "../common/sharetest";
import { Foo } from "./foo.js";
console.log(Foo);
var foo = new Foo();
console.log(foo);
foo.log("test");

var bar = new Bar();
bar.log("test client");