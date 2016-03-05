
/*Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});
*/

//New challenge


Parse.Cloud.define("sendNewChallenge", function(request, response) {
  /*
  Params:
  destinationUser : objectID of destinationUser
  destinationUsername : destination username (for logging and push message)
  senderName : senderUsername
  */
    var senderUsername = request.params.senderName;
    var destinationUserObjectId = request.params.destinationUser; //actually user objectId
    var destinationUsername = request.params.destinationUsername;
    var pushMessage = 'New challenge from ' + senderUsername;

    if(destinationUserObjectId == null) {
      response.error("destination object Id not passed in!");
      return;
    }

    var userQuery = new Parse.Query(Parse.User);
    userQuery.equalTo('objectId' , destinationUserObjectId);

    var pushQuery = new Parse.Query(Parse.Installation);
    pushQuery.matchesQuery('user' , userQuery);

    Parse.Push.send({
      where: pushQuery,
      data: {
        "content-available" : 1,
        alert: pushMessage
        }
    }, {
      success: function() {
        console.log('Push successfully sent from: ' + senderUsername + ' to ' + destinationUsername);
        response.success('true');
      },
      error: function(error) {
        console.log(error);
        response.error(error);
      }
    });
});

Parse.Cloud.define("completedChallenge" , function(request, response) {
  var senderUsername = request.params.senderName;
  var destinationUserObjectId = request.params.destinationUser; //actually user objectId
  var destinationUsername = request.params.destinationUsername;
  var pushMessage = 'Challenge response from ' + senderUsername;

  if(destinationUserObjectId == null) {
    response.error("destination object Id not passed in!");
    return;
  }

  var userQuery = new Parse.Query(Parse.User);
  userQuery.equalTo('objectId' , destinationUserObjectId);

  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.matchesQuery('user' , userQuery);

  Parse.Push.send({
    where: pushQuery,
    data: {
      "content-available" : 1,
      alert: pushMessage
      }
  }, {
    success: function() {
      console.log('Push successfully sent from: ' + senderUsername + ' to ' + destinationUsername);
      response.success('true');
    },
    error: function(error) {
      console.log(error);
      response.error(error);
    }
  });
});

/*

Old code for reference:


Parse.Cloud.afterSave("Activity", function(request, response) {
  //being explicit for debugging.
  var user = Parse.User.current();
  var username = user.username;
  var destinationUser = request.object.get('toUser').objectId;
  var destinationUsername = request.object.get('toUser').username;

  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo ('objectId', destinationUser);

  Parse.Push.send({
            where: pushQuery,
            data: {
                alert: "New Challenge from: " + username
                }
            }, {
            success: function(){
                console.log("Message sent successfully! Sender: " + username + " Reciever: " + destinationUsername);
                response.success('true');
            },
            error: function(error){
              console.log(error);
              response.error(error);
            }
    });
});

Parse.Cloud.afterSave("Activity", function(request, response) {
  //being explicit for debugging.
  var user = Parse.User.current();
  var username = user.username;
  var destinationUser = request.object.get('toUser').objectId;
  var destinationUsername = request.object.get('toUser').username;

  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo ('objectId', destinationUser);

  Parse.Push.send({
            where: pushQuery,
            data: {
                alert: "New Challenge from: " + username
                }
            }, {
            success: function(){
                console.log("Message sent successfully! Sender: " + username + " Reciever: " + destinationUsername);
                response.success('true');
            },
            error: function(error){
              console.log(error);
              response.error(error);
            }
    });
});
*/