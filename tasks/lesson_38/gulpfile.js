const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

function style() {
    return gulp.src('./scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer({
                overrideBrowserslist: ['last 5 versions', '> 1%'],
                cascade: false
            }),
            cssnano()
        ]))
        .pipe(gulp.dest('./css'));
}

function watch() {
    gulp.watch('./scss/**/*.scss', style);
}

exports.style = style;
exports.watch = watch;
exports.default = style;
