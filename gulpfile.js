/* 模块导入 */
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

/* 监视文件改动并重新载入 */
gulp.task('default', function() {
  browserSync({
    server: { baseDir: '.'},
    browser: "chrome",
    snippetOptions: {
      rule: {
        match: /<\/body>/i,
        fn: function (snippet, match) { return snippet + match; }
      }
    }
  });
  gulp.watch(['**/*.html', '*.css', '*.js'], reload);
});