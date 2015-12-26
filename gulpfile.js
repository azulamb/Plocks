var gulp = require( 'gulp' );
var typescript = require( 'gulp-typescript' );
var concat = require( 'gulp-concat' );
var uglify = require( 'gulp-uglify' );

var config =
{
	src: [ './src/*.ts' ],
	dst: './',
	options: { target: 'ES5', module: 'commonjs', sortOutput: true }
};

gulp.task( 'build', function ()
{
	return gulp
		.src( config.src )
		.pipe( typescript( config.options ) )
		.js
		.pipe( concat( 'plocks.js' ) )
		.pipe( gulp.dest( config.dst ) );
});

gulp.task( 'release', [ 'build' ], function ()
{
	return gulp
		.src( 'plocks.js' )
		.pipe( concat( 'plocks.min.js' ) )
		.pipe( uglify() )
		.pipe( gulp.dest( config.dst ) );
});

gulp.task( 'default', [ 'build' ] );
