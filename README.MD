# Project Name: RMBVSU
 Random Module Void Space Units

# License: CC BY-ND 2.0
  https://creativecommons.org/use-remix/

# Created By: Lightnet

# Date: 2021.02.12

# Status / Feautures:
 * Accounts ( work in progress )
 * Anti spams, bots and others (not build yet)
 * User Infereface (work in progress)
 * Game Logics ( not build yet )
 * 2D art image ( not build yet )
 * module blocks ( not build yet )
 * physics ( not build yet )
 * sandbox editor ( not build yet )
 * Forum ( not build yet )
 * Chat ( not build yet )
 * 

# Software / Programs:
 * MongoDB v4.4.4
 * Visual Studio Code v1.53.2
 * Nodejs v14.15.5

# Packages:
 * gulp
 * mongodb
 * polka
 * redom
 * socket.io
 * webpack
 * @babel/core
 * other packages

# Information:
  Idea design to build the simple base station and shipbattle to build real time strategy game prototype test.
  To create tick or real time cpu logic of browser and connection of the bandwidth limited for scaling.

  Reason is limited by server hardware and ram to deal with logic and processing data to server to client game experience.

# Build and Design:
  Working toward using babeljs.io to have share lib script to create network test.
  To used object ID and manage the objects in syncs.

# Build & Run:
```
  npm install
  gulp default
```

# Layout Dir:
```
root
-docs
-node_module (folder for nodejs)
-public ( web host )
-src ( client / server / sharelib )
-.babelrc (config not used in gulp will conflict congfig for server and client builds)
-gulpfile.js ( gulp )
-index.html ( web front page index )
-package.json ( npm packages and config )
-backend.js ( server )
-app.js ( server )
-webpack.config.js ( client build )
-webpack.backend.config.js ( client build )
```

# BUILD:
```
  gulp default
```
# .babelrc:
  Mixed config conflict to babeljs 7
```
{
  "presets": ["@babel/env"]
}
```

# Notes:
 * req.session.<any varaible> = store data
 * req.user (doesn't work / something about the configs prevent saving)
 * 


# Links:
 * 