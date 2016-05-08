var gulp = require('gulp');
var notify = require('gulp-notify');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('nodemon');

var jsfiles = ['*.js','src/**/*.js'];

gulp.task('style', function(){
	return gulp.src(jsfiles)
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish',{
		verbose: true		
	}))
	.pipe(jscs());
});

/**
 *
 * Copy CSS, SCSS and JS dependencies from bower_components to respective folders
 *
*/
gulp.task('copyBower', function() {
	return gulp.src('bower_components/bootstrap/dist/css/bootstrap.min.css')
	  .pipe(gulp.dest('./public/css')),

	  gulp.src('bower_components/bootstrap/dist/fonts/**')
	  .pipe(gulp.dest('./public/fonts')),

		gulp.src('bower_components/bootstrap/dist/js/bootstrap.min.js')
	  .pipe(gulp.dest('./public/js')),

	  gulp.src('bower_components/jquery/dist/jquery.min.js')
	  .pipe(gulp.dest('./public/js'))
		.pipe(notify({ message: 'Copied Bower dependencies', onLast: true }));
});

gulp.task('serve', function() {
	var options = {
		script: 'app.js',
		delayTime: 1,
		watch: jsfiles
	};

	return nodemon(options)
		.on('restart', function(ev){
			console.log('restarting...');
		});
});
