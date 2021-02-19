/**
 * Project Name: unknown
 * Created by: Lightnet
 * License: CC BY-ND 2.0
 * 
 */


// https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
// https://dba.stackexchange.com/questions/7573/difference-between-mongodbs-find-and-findone-calls/7587
// https://bezkoder.com/node-js-mongodb-auth-jwt/
// 
// 
// 
// 
// 

//const polka = require('polka');
const fs = require('fs');
var db = require('../db');
var config = require('../../../config');
//console.log("config:",config);
const jwt = require('jsonwebtoken');
const polka = require('polka');

var file_signup_path = "./src/html/signup.html";
var file_signup_html = fs.readFileSync(   file_signup_path, 'utf8');

var user ={
  alias:"",
  passphrase:"",
  email:"",
  date:""
}

function getTIMESTAMP() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).substr(-2);
  var day = ("0" + date.getDate()).substr(-2);
  var hour = ("0" + date.getHours()).substr(-2);
  var minutes = ("0" + date.getMinutes()).substr(-2);
  var seconds = ("0" + date.getSeconds()).substr(-2);

  return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
}

module.exports = polka()
.get('/', (req, res) => {//get page
  //res.end('signup!');
  res.write(file_signup_html);
  res.end();
})
.post('/', (req, res) => {//post data
  console.log(req.body);
  //res.end('POST signup!');
  //db.get()
  let collection = db.get().collection('user');
  collection.findOne({alias : req.body.alias}, function(err, doc){
    //console.log("NAME: ",req.body.alias);
    if (err) throw err;
    //console.log(doc.length);
    console.log(doc);
    //if (doc && doc.length) //if it does
    if (doc) //if it does
    {
      console.log("Found user");
      res.end('POST signup!');
    }
    else // if it does not 
    {
      console.log("Not in docs");
      let newuser = user;
      newuser.alias = req.body.alias;
      console.log("req.body.passphrase:",req.body.passphrase1);
      let pass = req.body.passphrase1;
      let token = jwt.sign({passphrase:pass}, config.TOKEN_SECRET);
      newuser.passphrase=token;

      newuser.date = getTIMESTAMP();
      
      db.get().collection("user").insertOne(newuser, function(err, doc) {
        if (err) throw err;
        console.log("1 document inserted");
        //db.close();
        res.end('Created Alias!');
      });
      
      res.end('POST Create User!');
    }
  });

  //res.end('POST signup!');
});
