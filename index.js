// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var S3Adapter = require('parse-server').S3Adapter;

var api = new ParseServer({
<<<<<<< HEAD
  // facebookAppIds: ['355436981293305']
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
  publicServerURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
  fileKey: process.env.FILE_KEY,
  clientKey: process.env.CLIENT_KEY,
||||||| aaa8754... updated mLab and comment out cloud code
  databaseURI: databaseUri || 'mongodb://pxc:painXchange123@ds011004-a0.mlab.com:11004/painxchange',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'tSAUWWTxFbQdf00ljtMmANE3JCLCJAUEEI5EBctl',
  masterKey: process.env.MASTER_KEY || 'e5oYzp1t3BxI3C6RgjnodVKWiqkSd9CTXmr5NlhF', //Add your master key here. Keep it secret!
  clientKey: 'fwkx5EMCD4iu2yQEhuUZo4UHjBMwN3j5QcLjuKbt',
  fileKey: 'fefb9bda-b2b4-4bd9-a8f2-fa528170ef62',
  serverURL: process.env.SERVER_URL || 'https://pacific-lowlands-64465.herokuapp.com/parse'  // Don't forget to change to https if needed
  // publicServerURL: 'https://pacific-lowlands-64465.herokuapp.com'
=======
  databaseURI: databaseUri || 'mongodb://pxc:painXchange123@ds023428.mlab.com:23428/painxchange',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'tSAUWWTxFbQdf00ljtMmANE3JCLCJAUEEI5EBctl',
  masterKey: process.env.MASTER_KEY || 'e5oYzp1t3BxI3C6RgjnodVKWiqkSd9CTXmr5NlhF', //Add your master key here. Keep it secret!
  clientKey: 'fwkx5EMCD4iu2yQEhuUZo4UHjBMwN3j5QcLjuKbt',
  fileKey: 'fefb9bda-b2b4-4bd9-a8f2-fa528170ef62',
  serverURL: process.env.SERVER_URL || 'https://pacific-lowlands-64465.herokuapp.com/parse'  // Don't forget to change to https if needed
  // publicServerURL: 'https://pacific-lowlands-64465.herokuapp.com'
>>>>>>> parent of aaa8754... updated mLab and comment out cloud code
  filesAdapter: new S3Adapter(
    process.env.S3_KEY_ID,
    process.env.S3_SECRET_KEY,
    process.env.S3_BUCKET_ID,
    {directAccess: true}
  ),
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }

});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('Make sure to star the parse-server repo on GitHub! testing');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
