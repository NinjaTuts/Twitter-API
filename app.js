var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public'));

app.set('views', './src/views');

// to set jade as view engine
// app.set('view engine', 'jade');

// to set hbs as view engine
// var handlebars = require('express-handlebars');
// app.engine('.hbs', handlebars({extname: '.hbs'}));
// app.set('view engine', '.hbs');

// to set ejs as view engine
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('index', {
		nav: [{
			link: '/books',
			text: 'Books'
		},{
			link: '/authors',
			text: 'Authors'
		}]
	});
});

// app.get('/books', function(req, res){
// 	res.send('hello books');
// });

app.listen(5000, function(msg){
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
var bookRouter = require('./src/routes/bookRouter')(nav);
var adminRouter = require('./src/routes/adminRouter')(nav);
var twitterRouter = require('./src/routes/twitterRouter')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/twitter', twitterRouter);
