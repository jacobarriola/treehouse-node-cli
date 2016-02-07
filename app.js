var profile = require('./profile');
// console.dir(process.argv);

// Skip the first two items in the argv array
var users = process.argv.slice(2);

// Grab the user(s) information
users.forEach(profile.get);
