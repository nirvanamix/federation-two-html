// gulp version 4.0.0
// npm install --save-dev gulp-less gulp-sass gulp-watch gulp-autoprefixer gulp-cssmin gulp-rename browser-sync gulp-sourcemaps
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemap = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
// Static server
function lacal_host(done){
	browserSync.init({
		server: {
			baseDir: "./"
		},
		port: 300
	});
}
// scss
function function_css(done){
	gulp.src('scss/style.scss')
	.pipe(sass({errorLogToConsole: true}))
	.on('error', console.error.bind(console))
	.pipe(autoprefixer({cascade: false}))
	.pipe(gulp.dest('css/'))
	.pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('css/'))
	.pipe(browserSync.stream());
	// init
	done();
}
// reload function
function browerReload(done){
	browserSync.reload();
	// init
	done();
}
// watch function
function watch_fun(){
	gulp.watch('scss/*.scss', function_css);
	// reload browe
	gulp.watch('./**/*.html', browerReload);
	gulp.watch('./**/*.js', browerReload);
	gulp.watch('./**/*.php', browerReload);
}
// init tasks
gulp.task('default', gulp.parallel(lacal_host, watch_fun));