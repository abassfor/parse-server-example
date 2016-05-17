// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;

var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var S3Adapter = require('parse-server').S3Adapter;

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://pxc:painXchange123@ds023428.mlab.com:23428/painxchange',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'tSAUWWTxFbQdf00ljtMmANE3JCLCJAUEEI5EBctl',
  masterKey: process.env.MASTER_KEY || 'e5oYzp1t3BxI3C6RgjnodVKWiqkSd9CTXmr5NlhF', //Add your master key here. Keep it secret!
  clientKey: 'fwkx5EMCD4iu2yQEhuUZo4UHjBMwN3j5QcLjuKbt',
  fileKey: 'fefb9bda-b2b4-4bd9-a8f2-fa528170ef62',
  serverURL: process.env.SERVER_URL || 'https://pacific-lowlands-64465.herokuapp.com/parse'  // Don't forget to change to https if needed
  // publicServerURL: 'https://pacific-lowlands-64465.herokuapp.com'
  filesAdapter: new S3Adapter(
    "AKIAJR5A4DJSE4CUUY6Q",
    "O3pwpE+pyGgvLAuR/LB5yteKDxZEuiNFJJJ9rLeo",
    "painxchange",
    {directAccess: true}
  ),
  // facebookAppIds: ['355436981293305']
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a web site.');
});

var port = process.env.PORT || 1337;
app.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});
