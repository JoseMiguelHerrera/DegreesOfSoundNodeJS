/*eslint-env node */
var express = require('express');
var router = express.Router();
var SC = require('node-soundcloud');
clientID='3d200aa64409fdf50aaebf53956e10f2';
//6849af7a6f85c482f26555ad6a27ef39  LOCAL
//3d200aa64409fdf50aaebf53956e10f2 new bluemix

//initialize API authorization 
SC.init({
    id: clientID,
  secret: 'c430ddbadd4214141bf263d7f8daedc9', //b0e7ca46ffe9a161d8aafb6cda3d9490 LOCAL //c430ddbadd4214141bf263d7f8daedc9 new bluemix
  uri: 'http://degreesofsound.com/main'       //http://localhost:6004/main LOCAL //new bluemix http://degreesofsoundteamv2.mybluemix.net/main
});
//after authentication, souncloud will redirect to this URI, where API calls will be made.
// The info above has to match the info at the soundcloud developers website. 
// The URI will have to be changed between localhost and the bluemix address for testing.

router.get('/*', initOAuth);

function initOAuth(req, res) {
  var url = SC.getConnectUrl();
  console.log(url);
  res.writeHead(301, {"Location": url});//redirection to soundcloud
  res.end();
}

module.exports = router;