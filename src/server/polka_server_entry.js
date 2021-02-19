/**
 * Project Name: unknown
 * Created by: Lightnet
 * License: CC BY-ND 2.0
 * 
 */
// https://dev.to/tienbku/node-js-express-login-example-with-mysql-database-2n51

/**
 * https://www.npmjs.com/package/polka
 */

console.log("init web services server...");

//var { Bar } = require("../common/sharetest");
const fs = require('fs');
const http = require('http');
const server = http.createServer();
const sirv = require('sirv');
const polka = require('polka');
const compress = require('compression')();
const io = require('socket.io');
//const cors = require('cors');
//const helmet = require('helmet');
const { json } = require('body-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

const config = require('../../config');
//console.log(config);
//var bar = new Bar();

console.log("init web services server...");

// https://openbase.com/js/sirv/documentation

// Init `sirv` handler
//const assets = sirv('./public', {
  //maxAge: 31536000, // 1Y
  //maxAge: 10, // 1Y
  //immutable: true
//});

// https://blog.marksauerutley.com/sapper-authenticated-sessions/
// https://www.codota.com/code/javascript/functions/helmet/helmet
//const server = http.createServer();
//const sleep = ms => new Promise(r => setTimeout(r, ms));
// https://docs.mongodb.com/drivers/node/quick-start/
//const { MongoClient } = require("mongodb");
//var url = "mongodb://localhost:27017/test";
// https://docs.mongodb.com/drivers/node/quick-start/
//const client = new MongoClient(url, { useUnifiedTopology: true });
//const pizzaDocument = {
  //name: "Neapolitan pizza",
  //shape: "round",
  //toppings: [ "San Marzano tomatoes", "mozzarella di bufala cheese" ],
//};
/*
async function run() {
  try {
    await client.connect();
    const database = client.db('test');
    const collection = database.collection('tests');
    //works
    // https://docs.mongodb.com/drivers/node/fundamentals/crud/write-operations/insert/
    //const result = await collection.insertOne(pizzaDocument);
    //console.dir(result.insertedCount); // should print 1 on successful insert
    // Query for a movie that has the title 'Back to the Future'
    //const query = { title: 'Back to the Future' };
    //const movie = await collection.findOne(query);
    //console.log(movie);
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
    console.log("pass");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/

//async function authenticate(req, res, next) {
//  let token = req.getHeader('authorization');
//  if (!token) return app.send(res, 401);
//  req.user = await Users.find(token); // <== fake
//  next(); // done, woot!
//}

// https://www.codota.com/code/javascript/functions/polka/Polka/post
// https://stackoverflow.com/questions/62936641/svelte-sapper-body-empty-on-post
// https://renedellefont.com/writing/login-node-polka-passport/

//var urlencodedParser = bodyParser.urlencoded({ extended: false });
//const mongoClient = require('mongodb').MongoClient;
var db = require('./db');
console.log("init database connection...");
//console.log("isConnected: ",db.isConnected());
db.connect(()=>{
  //mongoClient
  console.log("web server db isConnected: ", db.isConnected());
  console.log("mongodb connect!");
});
console.log("init polka http server...");
var app = polka({ server });
console.log("init polka modules and configs...");

//const sleep = ms => new Promise(r => setTimeout(r, ms));

// https://stackabuse.com/handling-cors-with-node-js/
//var cors_config = {
  //allowedHeaders: ['Content-Type','Authorization']
  //,credentials: true
  //,origin: true
  //,optionsSuccessStatus: 200
//};
//app.use(cors(cors_config));

// https://stackoverflow.com/questions/43150051/how-to-enable-cors-nodejs-with-express
//Definition des CORS Middleware 
/*
app.use(function(req, res, next) {
  //res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Accept,Authorization,Origin");
  //res.setHeader("Access-Control-Allow-Origin", "*");
  //res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  //res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});`enter code here`
*/
// server side session?
app.use(
  session({
    secret: 'SECRET_KEY',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 31536000
    }
  })
);

//app.use(helmet()); //js error // need for production later

// https://github.com/lukeed/polka
// https://dev.to/kvng_zeez/introducing-polka-a-micro-web-server-3p55
// https://github.com/lukeed/sirv/issues/55
// https://stackoverflow.com/questions/60355894/write-on-session-with-sapper-and-svelte
// https://stackoverflow.com/questions/65206960/sapper-polka-authentication
// 

//.get('*', (req, res, next) => {
  //console.log(`~> user token: ${req.token}`);
  //res.end('Hello, valid user');
  //next();
//});

// Log every request
function logger(req, res, next) {
  console.log(`~> Received ${req.method} on ${req.url}`);
  next(); // move on
}
app.use(logger);
// url post body params
app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress);
// web files
const assets = sirv('./public', {
  //maxAge: 31536000, // 1Y
  maxAge: 10 // 
  //,immutable: true
});
app.use(assets);

/**
 * Top level Checks Access for token check for user
 */
async function authenticate(req, res, next) {
  //console.log(req.path);
  //console.log(req.session);
  if(req.session.token==null){
    req.session.token=false;
  }
  if(req.session.alias==null){
    req.session.alias=false;
  }
  console.log(req.session.alias);
  
  //need to fixed this! For sub route...
  if(req.path == "/"){//need to display default page
    return next();
  }
  if(req.session.alias==false){
    res.statusCode=401;
    res.end('No token!');
    return next();
  }
  if(req.path == "/login"){//need user to login to get token
    return next();
  }
  if(req.path == "/signup"){//need user to signup to register account
    return next();
  }
  if(req.path == "/forgot"){//need user to forgot to get account
    return next();
  }
  //console.log(req.session);
  //console.log(req.session.token);
  let token = req.session.token;
  //console.log("token:", token);
  if (!token) return (res.statusCode=401,res.end('No token!'));
  //console.log( token);
  //req.user = await Users.find(token); // <== fake
  next(); // done, woot!
}
// user token checks
// does not check sub url it need to add helper
app.use(authenticate);

//===============================================
// https://github.com/lukeed/polka/issues/73
// https://github.com/ravener/polka-ejs
// https://stackoverflow.com/questions/55310267/how-to-import-routes-in-polka-js-similar-to-express-route
// https://reposhub.com/nodejs/http/lukeed-polka.html
// https://david.dev/polka-express-alternative/
// https://www.npmjs.com/package/polka-ejs
// 

//var file_index_path = "./index.html";
//var file_index_html = fs.readFileSync(    file_index_path, 'utf8');

function index_html(data){
  let text_html =`
  <!doctype html>
  <html lang="en">
     <head>
        <script src="https://redom.js.org/redom.min.js"></script>
        <script src="/socket.io/socket.io.js"></script>
        `;
  text_html +=`</head><body>`;
  text_html +='<script src="/client_index.js"></script>';
  //text_html +=`<a href="/login">Login</a> | <a href="/signup">Signup</a> | <a href="/forgot">Forgot</a>`;
  //text_html +=`<br> Welcome `+data.alias+`!<br>This is work in progress...`;
  text_html +=`</body></html>`;

  return text_html;
}

function main_text(data){
  return `
<!doctype html>
<html lang="en">
    <head>
      <script src="https://redom.js.org/redom.min.js"></script>
      <script src="/socket.io/socket.io.js"></script>  
    </head>
  <body>
    <script src="/client_index.js"></script>
    <!--
    <a href="/game">Game</a>
    <a href="/message">Message</a>
    <a href="/chat">Chat</a>
    <a href="/board">Board</a>
    <a href="/forum">Forum</a>
    <a href="/logout">Logout</a>
    <label>[DEV]</label>
    <a href="/database">Database</a>
    <a href="/moderator">Moderator</a>
    <a href="/admin">Admin</a>
    <a href="/workshop">Work Shop</a>
    <br><label> Welcome ` + data.alias + `!</label>
    -->
  </body>
</html>
`;
}

//top url for index > localhost:xxxx/
app.get('/', async (req, res) => {//get page
  res.setHeader('Content-Type', 'text/html');
  //res.json({ "name": "guest"}); //nope
  //await sleep(500);
  //need to fixed this access pages
  if(!req.session.token){
    //res.write(file_index_html);
    res.write(index_html({alias:"Guest"}));
  }else{
    //res.write("Welcome user!");
    let alias=req.session.alias;
    res.write(main_text({alias:alias}));
  }
  res.end();
});

const login = require('./polka/login');
app.use('login', login);

const signup = require('./polka/signup');
app.use('signup', signup);

const logout = require('./polka/logout');
app.use('logout', logout);

const forgot = require('./polka/forgot');
app.use('forgot', forgot);

const game = require('./polka/game');
app.use('game', game);

const message = require('./polka/message');
app.use('message', message);

const chat = require('./polka/chat');
app.use('chat', chat);

const forum = require('./polka/forum');
app.use('forum', forum);

const board = require('./polka/board');
app.use('board', board);

const pdatabase = require('./polka/database');
app.use('database', pdatabase);

const workshop = require('./polka/workshop');
app.use('workshop', workshop);

const moderator = require('./polka/moderator');
app.use('moderator', moderator);

const admin = require('./polka/admin');
app.use('admin', admin);

// https://stackoverflow.com/questions/62936641/svelte-sapper-body-empty-on-post
app.get('/user', async (req, res) => {//get page
  //res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Type', 'application/json');
  //let json = JSON.stringify({ error:'Missing CSRF token' });
  let json = JSON.stringify({ alias:req.session.alias });
  //res.end(`{alias:"GUEST"}`);
  res.end(json);
});

//===============================================
// SERVER LISTEN
console.log("init server...");

if(config == null){
  app.listen(3000, err => {
    if (err) throw err;
    console.log(`> Running on localhost:3000`);
  });
}else{
  app.listen(config.port, err => {
    if (err) throw err;
    console.log(`> Running on localhost:`+ config.port);
  });
}
//===============================================
// SOCKET>IO
//this is need to be last line for conflict
console.log("init socket.io network...");

io(server).on('connection', socket => {
  console.log("connect!");
  socket.on('disconnect', _ => {
		console.log("Disconnected");
	});
});
//===============================================