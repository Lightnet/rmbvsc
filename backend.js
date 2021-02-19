/**
 * Project Name: unknown
 * Created by: Lightnet
 * License: CC BY-ND 2.0
 * 
 */

// https://medium.com/@jamischarles/using-import-export-in-node-js-with-esm-7ce9153ff63
require = require("esm")(module/*, options*/);
var script = "";
script="./src/server/polka_server_entry.js";
//script="./src/server/express_server_entry.js";
//script="./src/server/polka_server_test01";
module.exports = require(script);