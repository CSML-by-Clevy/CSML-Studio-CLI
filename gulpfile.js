const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

function run() {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              esmodules: true,
            },
          },
        ],
      ],
      retainLines: true,
    }))
    .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '../src' }))
    .pipe(gulp.dest('dist'));
}

gulp.task('default', run);
gulp.task('watch', () => {
  gulp.watch('src/**/*', { ignoreInitial: false }, run);
});
