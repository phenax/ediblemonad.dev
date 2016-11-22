const gulp= require('gulp');
const autoprefixer= require('gulp-autoprefixer');
const sass= require('gulp-sass');
const minify= require('gulp-clean-css');

const BUILD_DIR= "./src/dist/css";
const APP_DIR= "./src/scss";


function getCompiledStream() {
	return gulp
		.src(`${APP_DIR}/*.scss`)
		.pipe(sass());
}

function getProductionCompiledStream() {
	return getCompiledStream()
		.pipe(autoprefixer('last 5 version'))
		.pipe(minify({compatibility: 'ie8'}));
}

gulp.task('build', _ => {

	let compiler= getCompiledStream;

	if(process.argv.includes('-p')) {
		compiler= getProductionCompiledStream;
	}

	return compiler()
		.pipe(gulp.dest(BUILD_DIR));
});


gulp.task('watch', ['build'], _ => {
	gulp.watch(`${APP_DIR}/**/*.scss`, ['build']);
});

gulp.task('default', ['watch']);
