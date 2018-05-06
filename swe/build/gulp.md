# Gulp

http://gulpjs.com  
https://gulpjs.org  
http://www.ydcss.com/archives/18（全网最酷入门教程，一看就懂）


## 教程

### 简介

Gulp 是前端开发过程中对代码进行构建的工具，是自动化项目的构建利器；她不仅能对网站资源进行优化，而且在开发过程中很多重复的任务能够使用正确的工具自动完成；使用她，我们不仅可以很愉快的编写代码，而且大大提高我们的工作效率。

Gulp 是基于 Node.js 的自动任务运行器，她能自动化地完成 javascript/coffee/sass/less/html/image/css 等文件的的测试、检查、合并、压缩、格式化、浏览器自动刷新、部署文件生成，并监听文件在改动后重复指定的这些步骤。在实现上，她借鉴了 Unix 操作系统的管道思想，前一级的输出，直接变成后一级的输入，使得在操作上非常简单。

Gulp 和 Grunt 非常类似，但相比于 Grunt 的频繁 IO 操作，Gulp 的流操作，能更快地更便捷地完成构建工作。

Gulp 使用步骤：全局安装 Gulp CLI -> 新建 package.json -> 项目安装 Gulp 及其插件 -> 配置 gulpfile.js -> 运行任务

```bash
$ npm install -g gulp-cli
$ npm install -D gulp gulp-less
$ touch gulpfile.js    # 创建并定义任务
$ gulp taskname        # 执行任务
```

### gulpfile.js

gulpfile.js 是 Gulp 的项目配置文件，是位于项目根目录的普通 js 文件（其实放在其他文件夹下也能正常工作）

```js
var gulp = require('gulp'), // 本地安装 gulp 所用到的地方
    less = require('gulp-less');

/* 定义一个 testLess 任务（自定义任务名称）*/
gulp.task('testLess', function () {
    gulp.src('src/less/index.less') // 该任务针对的文件
        .pipe(less()) // 该任务调用的模块
        .pipe(gulp.dest('src/css')); // 将会在 src/css 下生成 index.css
});

/* 定义默认任务，elseTask 为其他任务，该示例没有定义 elseTask 任务 */
gulp.task('default', ['testLess', 'elseTask']); // 虽然没有实际定义 default，但会执行定义的两个前置任务
                                                // 所依赖的任务会并发执行，没有先后顺序

// gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
// gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
// gulp.dest(path[, options]) 处理完后文件生成路径
```

### 实现一个 plugin

参考例子 https://github.com/terrierscript/gulp-unzip/blob/master/index.js

```js
const { Transform } = require('stream');
module.exports = function () {
  return new Transform({
    objectMode: true,
    transform(file, encoding, callback) {
      file.contents = Buffer.from('123456');
      callback(null, file);
    },
  });
};
```


## 自用文档模板

[拥有实时重载 live-reloading 和 CSS 注入的服务器](http://www.gulpjs.com.cn/docs/recipes/server-with-livereload-and-css-injection/)

### 插件列表

||
----------------------------------------------------------------------|----------------------------------
[Browsersync(not plugin)](https://browsersync.io/docs/gulp)           | Time-saving synchronised browser testing
[gulp-less](https://www.npmjs.com/package/gulp-less/)                 | A LESS plugin for Gulp
[gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps/)     | Source map support
[gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer/) | Prefix CSS
[gulp-concat](https://www.npmjs.com/package/gulp-concat/)             | Concatenates files
[gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css/)       | Minify css with clean-css
[gulp-uglify](https://www.npmjs.com/package/gulp-uglify/)             | Minify .js files with UglifyJS

```js
/* 模块导入 */
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    reload = browserSync.reload,
    base = 'app';  // 设定一个 base 参数方便更改监控的子目录

/* Styles */
gulp.task('less', function () {
  return gulp.src(base + '/less/*.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('.'))  // 若不指定路径，map 会嵌在 css 文件内
    .pipe(gulp.dest(base + '/styles'));
});

/* 监视文件改动并重新载入 */
gulp.task('default', function () {
  browserSync({server: {baseDir: base}});
  gulp.watch('less/**/*.less', {cwd: base}, ['less']); // ** 匹配 less 的 0 个或多个子文件夹
  gulp.watch(['*.html', 'styles/**/*.css', 'scripts/**/*.js'], {cwd: base}, reload);
});
```
