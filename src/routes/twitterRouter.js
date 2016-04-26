var express = require('express');
var twitterRouter = express.Router();

var Twitter = require('twitter-node-client').Twitter;
var config = {
	"consumerKey": "0MgbC5pl7dB2LyJzy5avL2ojm",
	"consumerSecret": "Nu8whvHO7bN2MAF8WNisoWhj1jfu9M1DCjJBblxHQOSHlTESlm",
	"accessToken": "452771912-MZhMp2pC3KaNYecv8oyzU1WPQIlf3oqUm3yH10iR",
	"accessTokenSecret": "eZwiRmzAkSQsUcUkCcM1Vew7uOEGeg8W1yTjJtW8PFLLR",
}
var twitter = new Twitter(config);

var router = function(nav){

	twitterRouter.route('/')
		.get(function(req, res){
			twitter.getSearch({'q':'ola', 'lang': 'en', 'count': 100},
				function (err, response, body) {
    				console.log('ERROR----------');
    				console.log(err);
				},
				function (data) {
    				data = JSON.parse(data)
    				console.log(data.statuses);
					res.render('twitterListView', {
						tweets: data.statuses
					});    				
				}
			);
		});

	return twitterRouter;
};

module.exports = router;
