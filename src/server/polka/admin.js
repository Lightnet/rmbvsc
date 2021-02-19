/**
 * Project Name: unknown
 * Created by: Lightnet
 * License: CC BY-ND 2.0
 * 
 */


const fs = require('fs');
const polka = require('polka');

var file_admin_path = "./src/html/admin.html";
var file_admin_html = fs.readFileSync(   file_admin_path, 'utf8');

module.exports = polka()
.get('/', (req, res) => {//get page
  //res.end('signup!');
  res.write(file_admin_html);
  res.end();
})
.post('/', (req, res) => {//post data
  console.log(res.body);
  res.end('POST Admin!');
});