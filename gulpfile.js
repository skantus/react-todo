var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

gulp.task('js', function () {
  browserify('./views/jsx/app.jsx')
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('public/javascripts'))
});

gulp.task('watch', function () {
  gulp.watch('./views/jsx/**/*.jsx', ['js'])
})

gulp.task('default', ['js', 'watch']);
