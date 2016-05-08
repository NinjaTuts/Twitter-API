var express = require('express');
var twitterRoute = express.Router();

var Twitter = require('twitter-node-client').Twitter;
var config = {
	"consumerKey"					: "0MgbC5pl7dB2LyJzy5avL2ojm",
	"consumerSecret"			: "Nu8whvHO7bN2MAF8WNisoWhj1jfu9M1DCjJBblxHQOSHlTESlm",
	"accessToken"					: "452771912-MZhMp2pC3KaNYecv8oyzU1WPQIlf3oqUm3yH10iR",
	"accessTokenSecret"		: "eZwiRmzAkSQsUcUkCcM1Vew7uOEGeg8W1yTjJtW8PFLLR"
}

var twitter = new Twitter(config);
var router = function(nav) {

	twitterRoute.route('/')
		.get(function(req, res) {
			res.render('twitterListView');
		});

	twitterRoute.route('/search')
		.get(function(req, res) {
			var search = req.query.q;
			var count = req.query.count;
			twitter.getSearch(
				{
					'q': (search ? search : null),
					'lang': 'en',
					'count': (count ? count : 20)
				},
				function (err, response, body) {
  				console.log('ERROR----------');
  				console.log(err);
				},
				function (data) {
  				data = JSON.parse(data);
					res.setHeader('Content-Type', 'application/json');
  				res.send(JSON.stringify(data.statuses));   				
				}
			);
		});

	return twitterRoute;
};

module.exports = router;
