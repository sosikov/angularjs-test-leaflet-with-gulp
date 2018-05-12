var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var minify = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var annotate = require('gulp-ng-annotate');
var rimraf = require('rimraf');
var uglify = require('gulp-uglify');

var path = {
    scripts : [
        'node_modules/angular/angular.js',
        'app/app.js',
        'app/modules/**/*.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
    ],
    styles : [
        'app/styles.scss',
        'app/modules/**/*.scss',
    ],
    built : [
        'app/app.min.css',
        'app/app.min.js',
        'app/**/*.html'
    ],
    clean : 'app/build'
};

gulp.task('scripts', function () {
    gulp.src(path.scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(annotate({add: true}))
        .pipe(uglify())
        .pipe(gulp.dest('app/build'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/build'))
});

gulp.task('styles', function () {
    gulp.src(path.styles)
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.scss'))
        .pipe(sass())
        .pipe(minify())
        .pipe(gulp.dest('app/build'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/build'))
});

// gulp.task('web', function () {
//     connect.server({
//         root: 'app/',
//         port: 4000,
//         fallback: 'app/index.html',
//         livereload: true
//     });
// });

// gulp.task('reload', function () {
//     gulp.src(path.built)
//         .pipe(watch(path.built))
//         .pipe(connect.reload())
// });

// gulp.task('watch', function () {
//     watch(path.scripts, function () {
//         gulp.start('scripts');
//     });
//     watch(path.styles, function () {
//         gulp.start('styles');
//     });
// });

gulp.task('clean', function (callback) {
    rimraf(path.clean, callback);
});

gulp.task('build', ['scripts', 'styles']);
