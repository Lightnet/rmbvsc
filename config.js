/**
 * Project Name: unknown
 * Created by: Lightnet
 * License: CC BY-ND 2.0
 * 
 */


// https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
// https://codingsans.com/blog/node-config-best-practices
var env = 'development';
var host = "localhost";
var port = 3000;
var location = "local";
var secret = 'secret-key';
var TOKEN_SECRET = 'token-key';

var db = {
    host : "localhost",
    user : "guest",
    password : "guest",
    name : "test",
    collection : "testb"
}

var email ={
    address:"guest@random.com",
    passphrase:"",
    type:"random",
    port: 81
}

export {
    secret,
    TOKEN_SECRET,
    env,
    host,
    port,
    location,
    db,
    email
}


/*
var config = {};

config = {
    env : 'development'
    ,host : "localhost"
    ,port : 3000
}

export default config;
*/
//module.exports = config;