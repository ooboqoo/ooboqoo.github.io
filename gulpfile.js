var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  less = require('gulp-less'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  // imagemin = require('gulp-imagemin');
  reload = browserSync.reload;

/* Styles */
gulp.task('less', function() {
  gulp.src('./less/main.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({ browsers: ['last 2 version','> 5%', 'IE 8'], cascade: false }))
//    .pipe(cleanCSS())
    .pipe(sourcemaps.write()) // 若不指定路径，map会嵌在css文件内
    .pipe(gulp.dest('.'));
});

/* 监视文件改动并重新载入 */
gulp.task('default', function() {
  browserSync({
    server: { baseDir: '.' },
    online: true,
    browser: "chrome",
    snippetOptions: {
      rule: {
        match: /<\/body>/i,
        fn: function(snippet, match) {
          return snippet + match;
        }
      }
    }
  });
  gulp.watch('less/*.less', ['less']);
  gulp.watch(['**/*.html', '**/*.md', '*.css', '001/*', '*.js'], reload);
});
