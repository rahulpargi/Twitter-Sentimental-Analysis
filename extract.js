var placeLookup = require('place-lookup');
var apiKey = "AIzaSyAcnaZOe_I6QzuaIK23TkLzCE6LswbX8sw";

placeLookup("dahod", apiKey, function(test){
    console.log(test) // Do whatever with the results
});