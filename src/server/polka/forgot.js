/**
 * Project Name: unknown
 * Created by: Lightnet
 * License: CC BY-ND 2.0
 * 
 */

const fs = require('fs');
const polka = require('polka');

var file_forgot_path = "./src/html/forgot.html";
var file_forgot_html = fs.readFileSync(   file_forgot_path, 'utf8');

module.exports = polka()
.get('/', (req, res) => {//get page
  //res.end('signup!');
  res.write(file_forgot_html);
  res.end();
})
.post('/', (req, res) => {//post data
  console.log(req.body);
  res.end('POST forgot!');
});