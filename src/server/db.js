/**
 * Project Name: unknown
 * Created by: Lightnet
 * License: CC BY-ND 2.0
 * 
 */

// https://www.quora.com/How-can-I-check-if-a-username-existed-with-Node-js
// https://www.geeksforgeeks.org/mongoose-exists-function/
// https://stackoverflow.com/questions/17786080/how-to-check-if-mongodb-connection-is-alive-in-node-js
// https://github.com/Automattic/mongoose 
// https://stackoverflow.com/questions/39599063/check-if-mongodb-is-connected/39602781
// https://stackoverflow.com/questions/39599063/check-if-mongodb-is-connected/39602781
// https://www.reddit.com/r/node/comments/2jpcul/how_to_check_if_i_connected_to_mongodb/
// https://www.reddit.com/r/node/comments/43ooak/reuse_mongodb_connection_properly_in_expressjs/
// https://www.semicolonworld.com/question/47706/node-js-and-mongodb-reusing-the-db-object
// https://mrvautin.com/re-use-mongodb-database-connection-in-routes/
// https://stackoverflow.com/questions/39599063/check-if-mongodb-is-connected/39602781
// 
//var mongodb = require('mongodb');
//var client;
//var collections = { };

/*
new mongodb.Db( ... ).open((function (err, c) {
    if (!err) {
      client = c;
      client.on('close', function() {
        client = null; // clear client
        collections = { }; // clear old collections
        // connection closed
      });
    } else {
      // error connecting
    }
  });


// get collection
exports.get = function(name, callback) {
    if (client) {
      if (!collections[name]) {
        collections[name] = new mongodb.Collection(client, name);
      }
      callback(null, collections[name]);
    } else {
      // can perform reconnecting and then get collection and call callback
      callback(new Error('not connected'));
    }
  }
*/

const mongoClient = require('mongodb').MongoClient;
const mongoDbUrl = 'mongodb://127.0.0.1:27017';
var mongodb;
const client = new mongoClient(mongoDbUrl,{ useUnifiedTopology: true });
// https://docs.mongodb.com/drivers/node/fundamentals/connection/
async function connect(callback){
  //mongoClient.connect(mongoDbUrl, { useUnifiedTopology: true },(err, db) => {
    //mongodb = db;
    //console.log(mongoClient.isConnected);
    //callback();
  //});
  //console.log("isConnected:",client.isConnected());
  try {
    // Connect the client to the server
    await client.connect();
    //const database = client.db('test');
    mongodb = client.db('test');
    //console.log("isConnected:",client.isConnected());
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });    
    console.log("Connected successfully to server");
    callback();

  } finally {
    // Ensures that the client will close when you finish/error
    //console.log("mongodb client closed!");
    //await client.close();
  }
}
function get(){
  return mongodb;
}
// https://www.w3schools.com/js/js_comparisons.asp
function isConnected(){
  console.log("fun isConnected: ",client.isConnected());
  return client.isConnected() ? true :false;
  //return false;
}

function close(){
  mongodb.close();
}

module.exports = {
  isConnected,
  connect,
  get,
  close
};
