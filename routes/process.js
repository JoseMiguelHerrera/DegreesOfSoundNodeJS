var express = require('express');
var router = express.Router();
var Hashtable = require('jshashtable'); // javascript hashtable library
var Client = require('node-rest-client').Client;
var util = require('util');

// handle POST requests at routes that match /process
router.post('*', coreAlg); //switch between coreAlg(for production) getPath (dummy data)


function getPath(req, res, next) {
	var client = new Client();	 
	client.get("http://DoSComputev2.mybluemix.net/api/dummy", function (data, response) {
	    console.log(response);
		res.render('process', data);
	});
}

function coreAlg(req, res) {
	var DEGREE_DEFAULT=1;
	var DEGREE_MAX=2;
	var degreeToUse=Number(req.body.degree);
	
	if(degreeToUse>DEGREE_MAX || degreeToUse<1)
	{
		degreeToUse=DEGREE_DEFAULT;
	}

	console.log(req.body.artistPermalink);
	 
	var client = new Client();
	var args = {
	    data: 	{ artistPermaLink: req.body.artistPermalink, currUserPermalink: req.body.currUserPermalink, degree: degreeToUse , clientID: clientID, email: req.body.email},
	    headers: { "Content-Type": "application/json" }
	};
	
	//http://0.0.0.0:5000/api/entryPoint FOR LOCAL //http://DoSComputev2.mybluemix.net/api/entryPoint LIVE
	client.post("http://DoSComputev2.mybluemix.net/api/entryPoint", args, function (data, response) {
		console.log(util.inspect(data, false, null));
		res.send(data);

	});
	 	
}

module.exports = router;	




