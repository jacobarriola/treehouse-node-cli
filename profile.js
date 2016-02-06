var https = require('https');

// Print out message
function printMessage(username, badgeCount, points) {
	var message = username + " has " + badgeCount + " total badges and " + points
	+ " in JavaScript.";
	console.log(message);
}

// Print out error messages
function printError(error) {
  console.error(error.message);
}

function getProfile(username) {
  // Connect ot the API URL
  var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response){
  	var body = "";
  	// Read the data
  	response.on('data', function(chunk){
  		body += chunk;
  	});
  	response.on('end', function() {
  		if(response.statusCode === 200) {
  			try {
          // Parse the data
  				var profile = JSON.parse(body);
          // Print the data
  				printMessage(profile.name, profile.badges.length, profile.points.JavaScript)
  			} catch(error) {
  				// Parse Error
  				printError(error);
  			}
  		} else {
  			// Status Code Error
  			printError({message: "There was an error getting the profile for " + username});
  		}
  	});
  });

  // Connection Error
  request.on('error', printError)
}

// For this module, export the getProfile function and make it available in app.js
module.exports.get = getProfile;
