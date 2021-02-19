/**
 * Project Name: unknown
 * Created by: Lightnet
 * License: CC BY-ND 2.0
 * 
 */


const {src, dest, watch, series } =require('gulp');
const babel =require('gulp-babel');
//const connect = require("gulp-connect");
const plumber = require("gulp-plumber");
const nodemon = require('gulp-nodemon');
// https://medium.com/@dzhurovivan/javascript-development-environment-with-babel-webpack-gulp-and-eslint-c42b5243852f
//const webpack = require('webpack');
const webpack = require('webpack-stream');
const rename = require('gulp-rename');


//const client_file = 'src/./*.js';
const client_file = [
  'src/client/client.js'
  //,'src/client/*.js'
];
const client_output = './public/';
const server_file = [
  'src/server/server.js'
  ,'src/server/*.js'
];
const server_output = '.';
const server_webhost = './backend.js';

var dev_mode = 'dev';
var html_files = [];
  html_files.push('src/html/termsofservice.html');
  //html_files.push('index.html');
  //html_files.push('src/html/*.html');

function client_build(){
  return src(client_file)
  .pipe(plumber())
  //.pipe(babel())
  // Transpile the JS code using Babel's preset-env.
  .pipe(
    babel({
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false
          }
        ]
      ]
    })
  )
  .pipe(dest(client_output));
}
exports.client_build = client_build;

function src_js(_input,_name){
  return src(_input)
  .pipe(plumber())
  //.pipe(babel())
  // Transpile the JS code using Babel's preset-env.
  .pipe(
    babel({
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false
          }
        ]
      ]
    })
  )
  .pipe(rename(_name+'.js'))
  .pipe(dest(client_output));
}

function client_index_build(){
  return src_js('./src/client/client_index.js','client_index');
}
exports.client_index_build = client_index_build;

function client_main_build(){
  return src_js('./src/client/client_main.js','client_main');
}
exports.client_main_build = client_main_build;

function client_game_build(){
  return src_js('./src/client/client_game.js','client_game');
}
exports.client_game_build = client_game_build;

function client_workshop_build(){
  return src_js('./src/client/client_workshop.js','client_workshop');
}
exports.client_workshop_build = client_workshop_build;

function client_moderator_build(){
  return src_js('./src/client/client_index.js','client_moderator');
}
exports.client_moderator_build = client_moderator_build;

function client_admin_build(){
  return src_js('./src/client/client_admin.js','client_admin');
}
exports.client_admin_build = client_admin_build;

// https://stackoverflow.com/questions/62152762/regeneratorruntime-is-not-defined-gulp-webpack-babel
function webpack_client_build(callback){
  //return src(['src/client/client.js','src/client/*.js'])
  return src(['src/client/client.js'])
     .pipe(webpack( require('./webpack.config.js') ))
     .pipe(dest(client_output));
  /*
  webpack(require('./webpack.config.js'), function (err, stats) {
    if (err) {
      console.log(err.toString());
    }    
    console.log(stats.toString());
    callback();
  });
  */
}
exports.webpack_client_build = webpack_client_build;

function server_build(){
  return src(server_file)
  .pipe(plumber())
  //.pipe(babel())
  // Transpile the JS code using Babel's preset-env.
  .pipe(
      babel({
        presets: [
          [
            "@babel/env",
            {
              modules: false
            }
          ]
        ]
      })
  )
  .pipe(dest(server_output))
}
exports.server_build = server_build;

function copy_html(done){
  return src(html_files)
    .pipe(dest(client_output));
}
exports.copy_html = copy_html;

function watchFiles(done){
  watch(client_file, webpack_client_build);
  //watch(server_file, server_build);
  watch(html_files, copy_html);

  watch('./src/client/client_index.js', client_index_build);
  watch('./src/client/client_main.js', client_main_build);
  watch('./src/client/client_game.js', client_game_build);
  watch('./src/client/client_workshop.js', client_workshop_build);
  watch('./src/client/client_moderator.js', client_moderator_build);
  watch('./src/client/client_admin.js', client_admin_build);
  done();
}
exports.watch = watchFiles;

//function gconnect(){
  //return connect.server({
    //root: ".",
    //livereload: true
  //});
//}
//exports.gconnect = gconnect;

var ignoreFiles = [
  'gulpfile.js'
  , 'webpack.backend.config.js'
  , 'webpack.config.js'
  , './src/client'
];

function web_server(done){
  return nodemon({
    script: server_webhost
  , ext: 'js html'
  , ignore: ignoreFiles
  , env: { 'NODE_ENV': 'development' }
  , done: done
  });
}
exports.web_server = web_server;

exports.build = client_build;
exports.default = series(
  //client_build,
  client_index_build,
  client_main_build,
  client_game_build,
  client_workshop_build,
  client_moderator_build,
  client_admin_build,
  
  webpack_client_build,
  copy_html,
  //server_build,
  watchFiles,
  web_server
  //gconnect
);