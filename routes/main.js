/*eslint-env node */
var express = require('express');
var router = express.Router();
var SC = require('node-soundcloud'); //server-side soundcloud object

// handle GET requests at routes that match /main*
router.get('*', redirectHandler);

// handles client authorization and redirect after soundcloud authentication 
function redirectHandler(req, res) {
  
  var authcode = req.query.code;
  SC.authorize(authcode, function(err, accessToken) {
	if (err) {
	  throw err;
	} else {
		    
	  SC.get('/me', function(err, me) {
  		if (err) {
     res.redirect('../'); //if user either cancels SC auth or does it wrongly, redirec back to intro page
  		} else {
  		  res.render('main', { me_username: me.username, me_followers: me.followers_count, me_followings: me.followings_count, me_permalink: me.permalink, me_avatar_url: me.avatar_url });
		  }
	  });
    }
  });
}


module.exports = router;