var gulp = require( 'gulp' );
var typescript = require( 'gulp-typescript' );
var rename = require( 'gulp-rename' ); 
var browserify = require( 'browserify' );
var source = require( 'vinyl-source-stream' );
var uglify = require( 'gulp-uglify' );

var config =
{
	src: [ './src/*.ts' ],
	dst: './build',
	out: 'plocks.js',
	outmin: 'plocks.js',
	options: { target: 'ES5', module: 'commonjs', sortOutput: true },
	entries: { entries: [ 'build/main.js', './build/plocks.js', './build/config.js', './build/plock.js' ] }
};

gulp.task( 'typescipt', function ()
{
	return gulp
		.src( config.src )
		.pipe( typescript( config.options ) )
		.js
		.pipe( gulp.dest( config.dst ) );
});

gulp.task( 'copy', function ()
{
	return gulp
		.src( [ 'src/main.js' ] )
		.pipe( gulp.dest( config.dst ) );
});

gulp.task( 'build', [ 'typescipt', 'copy' ],function()
{
	return browserify( config.entries )
		.bundle()
		.pipe( source( config.out ) )
		.pipe( gulp.dest( './' ) );
});

gulp.task( 'release', [ 'build' ], function ()
{
	return gulp
		.src( config.out )
		.pipe( uglify() )
		.pipe( rename( { extname: '.min.js' } ) )
		.pipe( gulp.dest( './' ) );
});

gulp.task( 'default', [ 'build' ] );
