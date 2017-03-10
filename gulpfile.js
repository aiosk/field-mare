const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');

global.isWatching = false;

const babelOpts = {
    presets: ['es2015']
};

gulp.task('html', () => {
    return gulp.src('./src/html/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('css', () => {
    return gulp.src(`./src/css/main.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['ff >= 4', 'Chrome >= 19', 'ie >= 9'],
            cascade: false
        }))
        .pipe(gulp.dest(`./dist/css/`));
});

gulp.task('js', () => {
    return gulp.src(['./src/js/*.js'])
        .pipe(babel(babelOpts))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('build', ['css', 'js', 'html']);

gulp.task('setWatch', () => {
    return global.isWatching = true;
});


gulp.task('default', ['build', 'setWatch'], () => {
    gulp.watch('./src/css/**/*.scss', ['css']);

    gulp.watch('./src/html/**/*.pug', ['html']);
    gulp.watch('./src/js/*.js', ['js']);
});
