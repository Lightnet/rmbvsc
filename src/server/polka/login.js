/**
 * Project Name: unknown
 * Created by: Lightnet
 * License: CC BY-ND 2.0
 * 
 */
// https://codeburst.io/to-handle-authentication-with-node-js-express-mongo-jwt-7e55f5818181
// https://jasonwatmore.com/post/2020/06/17/nodejs-mongodb-api-jwt-authentication-with-refresh-tokens#authorize-js
// https://livecodestream.dev/post/a-practical-guide-to-jwt-authentication-with-nodejs/
// generateAccessToken
// https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
// https://livecodestream.dev/post/a-practical-guide-to-jwt-authentication-with-nodejs/
// 

const fs = require('fs');
var db = require('../db');
const jwt = require('jsonwebtoken');
const polka = require('polka');
var config = require('../../../config');
// https://www.npmjs.com/package/jsonwebtoken
//var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
//console.log("token sign");
//console.log(token);
//token = jwt.sign({ foo: 'bar' }, 'shhhhh');
//console.log(token);
//var decoded = jwt.verify(token, 'shhhhh');
//console.log(decoded); // bar
//console.log("config:",config);
//var stoken = jwt.sign({ passphrase: 'guest' }, config.TOKEN_SECRET);
//console.log(stoken);

var file_login_path = "./src/html/login.html";
var file_login_html = fs.readFileSync(file_login_path, 'utf8');

module.exports = polka()
.get('/', (req, res) => {//get page
  //console.log("mongodb isConnected: ",db.isConnected());
  //console.log(db.get());
  //res.end('login!');
  res.write(file_login_html);
  res.end();
})
.post('/', (req, res) => {//post data
  console.log("login post!");
  //console.log(req.body);
  //console.log(req.body.alias);
  //console.log(req.params);
  let collection = db.get().collection('user');

  collection.findOne({alias : req.body.alias}, function(err, doc){
    if (err) throw err;
    console.log(doc);
    if (doc) //if it does
    {
      let token = req.body.passphrase;// jwt.sign({passphrase:req.body.passphrase}, config.TOKEN_SECRET);
      let detoken = jwt.verify(doc.passphrase, config.TOKEN_SECRET);
      console.log(token);
      console.log(detoken);
      //console.log(doc.passphrase);
      if(token == detoken.passphrase){
        console.log("FOUND!");
        req.session.token=true;
        req.session.alias=doc.alias;
        res.writeHead(302,{Location:"/"});
      }
      res.end('Login User!');
    }else{
      res.end('No User!');
    }
  });
  //res.writeHead(302,{Location:"/"});
  //res.end('POST login!');
});

// https://github.com/lukeed/polka/issues/78
// https://david.dev/polka-js-res-redirect/