var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

app.use(express.static('public'));

app.set('views', './src/views');

// to set ejs as view engine
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index');
});


app.listen(3000, function(msg) {
	console.log('running server on port: '+port);
});

var nav = [
	{
		link: '/books',
		text: 'Book'
	},
	{
		link: '/authors',
		text: 'Author'
	}
];

// defining controllers
var twitterRouter = require('./src/routes/twitter')(nav);

app.use('/twitter', twitterRouter);
