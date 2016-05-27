var gulp = require( 'gulp' );
var typescript = require( 'gulp-typescript' );
var rename = require( 'gulp-rename' ); 
var browserify = require( 'browserify' );
var source = require( 'vinyl-source-stream' );
var uglify = require( 'gulp-uglify' );
var cssmin = require('gulp-cssmin');

var config =
{
	src: [ './src/plocks.ts' ],
	dst: './build',
	out: 'plocks.js',
	options: { target: 'ES5', module: 'commonjs', sortOutput: true },
	entries: { entries: [ 'build/main.js' ] }
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

gulp.task( 'build', [ 'typescipt', 'copy' ], function()
{
	return browserify( config.entries )
		.bundle()
		.pipe( source( config.out ) )
		.pipe( gulp.dest( './' ) );
});

gulp.task( 'css', function()
{
	return gulp
		.src( 'plocks.css' )
        .pipe( cssmin() )
		.pipe( rename( { extname: '.min.css' } ) )
		.pipe( gulp.dest( './' ) );
});


gulp.task( 'release', [ 'build', 'css' ], function ()
{
	return gulp
		.src( config.out )
		.pipe( uglify() )
		.pipe( rename( { extname: '.min.js' } ) )
		.pipe( gulp.dest( './' ) );
});

gulp.task( 'default', [ 'build' ] );
