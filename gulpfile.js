/* eslint-disable */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');

var paths = {
    styles: {
        src: './assets/scss/**/*.scss',
    },
};

function styles() {
    return gulp
        .src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(
            autoprefixer({
                cascade: true,
            }),
        )
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./assets/css'));
}

/*
 * task to minify the css files
 * SCSS files are converted to CSS and than minified by the following task
 */
function minifyCSS() {
    return gulp
        .src('assets/css/style.css')
        .pipe(
            cleanCSS({ debug: true }, function (details) {
                console.log('=========================================');
                console.log(details.name + ': ' + details.stats.originalSize);
                console.log(details.name + ': ' + details.stats.minifiedSize);
                console.log('=========================================');
            }),
        )
        .pipe(
            rename({
                suffix: '.min',
            }),
        )
        .pipe(gulp.dest('assets/css/min'));
}

// Optimizing Images
function optimiseImages() {
    return (
        gulp
            .src('./assets/images/**/*.+(png|jpg|jpeg|gif|svg)')
            // Caching images that ran through imagemin
            .pipe(
                imagemin({
                    interlaced: true,
                }),
            )
            .pipe(gulp.dest('./img'))
    );
}

function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch("./assets/css/style.css", minifyCSS);
}

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.series(gulp.parallel([styles, minifyCSS]));

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */

exports.styles = styles;
exports.watch = watch;
exports.build = build;
/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;
