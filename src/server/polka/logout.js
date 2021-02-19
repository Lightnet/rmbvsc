/**
 * Project Name: unknown
 * Created by: Lightnet
 * License: CC BY-ND 2.0
 * 
 */

// https://codeburst.io/to-handle-authentication-with-node-js-express-mongo-jwt-7e55f5818181
// https://jasonwatmore.com/post/2020/06/17/nodejs-mongodb-api-jwt-authentication-with-refresh-tokens#authorize-js
// https://livecodestream.dev/post/a-practical-guide-to-jwt-authentication-with-nodejs/
// 
// 
// 
// 

//const fs = require('fs');
var db = require('../db');
const polka = require('polka');
//const jwt = require('jsonwebtoken');
// https://www.npmjs.com/package/jsonwebtoken
//var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
//console.log("token sign");
//console.log(token);
//token = jwt.sign({ foo: 'bar' }, 'shhhhh');
//console.log(token);
//var decoded = jwt.verify(token, 'shhhhh');
//console.log(decoded); // bar
//var config = require('../../../config');
//console.log("config:",config);
//var stoken = jwt.sign({ passphrase: 'guest' }, config.TOKEN_SECRET);
//console.log(stoken);

function write_html(data){
return `
<!doctype html>
<html lang="en">
   <head>
   </head>
   <body>
      <form action="/logout" method="post">
         <label>[Logout Access] </label>
         <br><label> [`+data.alias+` Are you sure want to logout?]</label>
         <br><input type="submit" value="Submit">
      </form>
   </body>
</html>
`;
}

module.exports = polka()
.get('/', (req, res) => {//get page
   //res.write(logout_html);
   res.write(write_html({alias:req.session.alias}));
   res.end();
})
//app.post('/login', urlencodedParser, (req, res) => {//post data
.post('/', (req, res) => {//post data
   console.log("logout post!");
   //console.log(req.body);
   //console.log(req.body.alias);
   //console.log(req.params);
   req.session.token=false;
   req.session.alias="guest";

   res.writeHead(302,{Location:"/"});
   res.end('POST logout!');
});

// https://github.com/lukeed/polka/issues/78
// https://david.dev/polka-js-res-redirect/