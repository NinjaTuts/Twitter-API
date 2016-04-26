var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
	{
		title: 'steve jobs', 
		author: 'walter issacson'
	},
	{
		title: 'time machine', 
		author: 'h g wells'
	}
];

var router = function(nav){
	adminRouter.route('/addBooks')
	.get(function(req, res){
		// for mongodb connection		
		var url= 'mongodb://localhost:27017/libraryApp';
		mongodb.connect(url, function(err, db){
			var collection = db.collection('books');
			collection.insertMany(books, function(err, results){
				res.send(results);
				db.close();
			});
		});
	});
	return adminRouter;
};

module.exports = router;
