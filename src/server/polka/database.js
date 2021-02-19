/**
 * Project Name: unknown
 * Created by: Lightnet
 * License: CC BY-ND 2.0
 * 
 */

const fs = require('fs');
var db = require('../db');
const polka = require('polka');

var logout_html =`
<!doctype html>
<html lang="en">
    <head>
    </head>
    <body>
      <form action="/database" method="post">
          <label>[Database Access] </label><a href="/">Home</a>
          <br><label>Alias: </label>
          <br><input id="alias" name="alias" value="guest">
          <br><input type="submit" value="Submit">
      </form>
    </body>
</html>
`;

//export function assign(app){
  //var db = require('./db');
module.exports = polka()
.get('/', (req, res) => {//get page
    //console.log("mongodb isConnected: ",db.isConnected());
    //console.log(db.get());
    //res.end('login!');
    res.write(logout_html);
    res.end();
})
.post('/', (req, res) => {//post data
  console.log("logout post!");
  //console.log(req.body);
  console.log(req.params);
  //res.writeHead(302,{Location:"/"});
  res.end('POST database!');
});
//}