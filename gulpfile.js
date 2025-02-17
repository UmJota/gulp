const gulp = require('gulp');
const sass = require('gulp-sass')(require("sass"));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate'); 
const imagemin = require('gulp-imagemin')

function comprimeImage() {
    return gulp.src("./source/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
}

function comprimeJavaScript() {
    return gulp.src('./source/script/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/script'))
}

function compilaSass() {
    return gulp.src('./source/styles/main.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

exports.default = function() {
    gulp.watch("./source/styles/*.scss",{ignoreInitial: false}, gulp.series(compilaSass));
    gulp.watch("./source/script/*.js",{ignoreInitial: false}, gulp.series(comprimeJavaScript));
    gulp.watch("./source/images/*",{ignoreInitial: false}, gulp.series(comprimeImage));
}
