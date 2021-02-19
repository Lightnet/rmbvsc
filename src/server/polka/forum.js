/**
 * Project Name: unknown
 * Created by: Lightnet
 * License: CC BY-ND 2.0
 * 
 */

//const fs = require('fs');
const polka = require('polka');

//var file_signup_path = "./src/html/signup.html";
//var file_signup_html = fs.readFileSync(   file_signup_path, 'utf8');

module.exports = polka()
.get('/', (req, res) => {//get page
  res.write("Forum Access");
  res.end();
})
.post('/', (req, res) => {//post data
  res.end('POST Forum!');
});