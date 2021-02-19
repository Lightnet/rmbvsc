// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
// https://www.digitalocean.com/community/tutorials/nodejs-express-basics
// https://www.tutorialspoint.com/nodejs/nodejs_express_framework.htm
// https://stackabuse.com/handling-authentication-in-express-js/
// 
// 
// 

const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
//const uuid = require('uuid/v4');
//const uuid = require('uuid');
import { v4 as uuidv4 } from 'uuid';
const session = require('express-session');

function authentication(req, res, next){
  console.log('authentication check...');
  console.log(req.sessionID);
  console.log(req.session);
  if(req.session.token == null){
    req.session.token = false;
  }

  next();
}

app.use(express.static('public'));

app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

// add & configure middleware
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware');
    console.log(req.sessionID);
    //return uuid() // use UUIDs for session IDs
    return uuidv4();
  },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(authentication);

function draw_html(data){
//var index_html =`
  return `
<html>
   <body>
      <label> Welcome Guest! </label>
      <a href="/login">Login</a>
      <a href="/signup">Sign Up</a>
      <a href="/forgot">Forgot</a>
   </body>
</html>
`;
}

app.get('/', (req, res) => {
  //res.send('Hello World!');
  //res.send(index_html);
  res.send(draw_html({}));
});

var login_html =`
<html>
   <body>
      <form action = "/login" method = "POST">
         Alias: <input type = "text" name = "alias">
         <br>Passphrase: <input type = "text" name = "passphrase">
         <br><input type = "submit" value = "Submit">
      </form>
   </body>
</html>
`;
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
// https://www.tutorialspoint.com/expressjs/expressjs_routing.htm
app.get('/login', (req, res) => {
  res.send(login_html);
});

app.post('/login', urlencodedParser  ,(req, res) => {
  console.log(req.body);
  let response = {
    alias: req.body.alias,
    passphrase: req.body.passphrase
  }
  console.log(response);
  //res.send('Hello World!');
  res.end(JSON.stringify(response));
});

var signup_html =`
<html>
   <body>
      <form action = "/signup" method = "POST">
         Alias: <input type = "text" name = "alias">
         <br>Passphrase: <input type = "text" name = "passphrase">
         <br><input type = "submit" value = "Submit">
      </form>
   </body>
</html>
`;

app.get('/signup', (req, res) => {
  res.send(signup_html);
});

app.post('/signup', urlencodedParser  ,(req, res) => {
  console.log(req.body);
  let response = {
    alias: req.body.alias,
    passphrase: req.body.passphrase
  }
  console.log(response);
  //res.send('Hello World!');
  res.end(JSON.stringify(response));
});



app.get('/forgot', (req, res) => {
  res.send(signup_html);
});

app.post('/forgot', urlencodedParser  ,(req, res) => {
  console.log(req.body);
  let response = {
    alias: req.body.alias,
    passphrase: req.body.passphrase
  }
  console.log(response);
  //res.send('Hello World!');
  res.end(JSON.stringify(response));
});

app.all('/secret', function(req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})