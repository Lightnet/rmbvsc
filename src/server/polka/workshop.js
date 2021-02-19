/**
 * Project Name: unknown
 * Created by: Lightnet
 * License: CC BY-ND 2.0
 * 
 */

 //const fs = require('fs');
//var db = require('../db');
//const jwt = require('jsonwebtoken');
const polka = require('polka');

var { authenticate } = require('./auth');
//var config = require('../../../config');

function draw_html(data){
  return `
<!doctype html>
<html lang="en">
    <head>
    </head>
    <body>
      <label>[Work Shop Access] </label><a href="/">Home</a>
      <br><label>Alias: `+data.alias+`</label>
    </body>
</html>
`;
}

module.exports = polka()
.get('/', authenticate ,(req, res) => {//get page
  //res.write("Moderator Access");
  let alias = req.session.alias;
  console.log(alias);
  //if(alias!=false){
    res.write(draw_html({alias:alias}));
  //}else{
    //res.write("Access Denied!");
  //}
  res.end();
})
.post('/', (req, res) => {//post data
  res.end('POST ACCESS!');
});