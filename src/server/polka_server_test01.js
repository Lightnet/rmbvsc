
const polka = require('polka');
const fs = require('fs');
var bodyParser = require('body-parser');
const { json } = require('body-parser');
// https://blog.marksauerutley.com/sapper-authenticated-sessions/
import session from 'express-session';

const app = polka();

const sleep = ms => new Promise(r => setTimeout(r, ms));
// https://github.com/lukeed/polka/issues/18
async function authenticate(req, res, next) {
  console.log("req.session.token:",req.session.token);
  //console.log("req.session:",req.session);
  //console.log("req.user:",req.user);
  if(req.path == "/login"){//need user to login to get token
    return next();
  }
  //if(req.user === 'undefined'){
    //req.user="none";
  //}
  //console.log(req.user);
  //let token = req.headers['authorization'];
  //if (!token) return (res.statusCode=401,res.end('No token!'));//default
  if (!token) return (res.statusCode=200,res.end('No token!'));
  //req.user = await Users.find(token); // <== fake
  next(); // done, woot!
}
// https://github.com/lukeed/polka/blob/master/examples/with-body-parser/index.js
app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));
app.parse = require('parseurl');
// https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d
// https://www.npmjs.com/package/express-session
app.use(session({
    secret: 'SomeSecretStringThatIsNotInGithub',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 31536000
    }
    //store: new FileStore({
      //path: `.sessions`
    //})
  }));

app
  .use(authenticate)
  .get('/', async (req, res) => {
    
    // log middleware's findings
    console.log('~> current user', req.user);
    // force sleep, because we can~!
    await sleep(500);
    // send greeting
    res.end(`Hello, ${req.user.name}`);
  });

var file_login_path = "./src/html/login.html";
var file_login_html = fs.readFileSync(file_login_path, 'utf8');

app.get('/login', (req, res) => {//get page
    res.write(file_login_html);
    res.end();
});

app.post('/login', (req, res) => {//post data
    console.log("login post!");
    console.log(req.body);
    console.log(req.body.alias)  
    console.log(req.params);
    req.user="test_token";
    req.session.token="tokentest....";
    res.end('POST login!');
});

app.listen(3000, err => {
    if (err) throw err;
    console.log(`> Running on localhost:3000`);
});
  