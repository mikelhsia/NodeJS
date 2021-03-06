var path = require('path');
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');

gulp.task('js', () => {
    gulp.src('./js/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./static/js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./static/js'))
});

gulp.task('css', () => {
    gulp.src('./less/styles.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./static/css'))
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./static/css'));
});

gulp.task('watchers', () => {
    gulp.watch('less/**/*.less', ['css']);
});

gulp.task('default', ['js', 'css', 'watchers']);
