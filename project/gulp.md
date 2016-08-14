# Gulp 学习笔记

<div>
<h2>Gulp 入门教程</h2>
<p>入门教程：http://www.ydcss.com/archives/18（全网最酷，一看就懂）</p>
<p>本页笔记根据此入门教程整理，便于个人复习。</p>
<h3>gulp 常用地址</h3>
<p class="ti2">gulp官方网址：<a href="//gulpjs.com/" target="_blank">http://gulpjs.com</a></p>
<p class="ti2">gulp插件地址：<a href="//gulpjs.com/plugins" target="_blank">http://gulpjs.com/plugins</a></p>
<p class="ti2">gulp 官方API：<a href="https://github.com/gulpjs/gulp/blob/master/docs/API.md" target="_blank">https://github.com/gulpjs/gulp/blob/master/docs/API.md</a></p>
<p class="ti2">gulp 中文API：<a href="../424" target="_blank">http://www.ydcss.com/archives/424</a></p>
</div>

<div>
<h3>简介：</h3>
<p>gulp是前端开发过程中对代码进行构建的工具，是自动化项目的构建利器；她不仅能对网站资源进行优化，而且在开发过程中很多重复的任务能够使用正确的工具自动完成；使用她，我们不仅可以很愉快的编写代码，而且大大提高我们的工作效率。</p>
<p>gulp是基于Nodejs的自动任务运行器， 她能自动化地完成 javascript/ coffee/ sass/ less/ html/ image/ css 等文件的的测试、检查、合并、压缩、格式化、浏览器自动刷新、部署文件生成，并监听文件在改动后重复指定的这些步骤。在实现上，她借鉴了Unix操作系统的管道（pipe）思想，前一级的输出，直接变成后一级的输入，使得在操作上非常简单。通过本文，我们将学习如何使用Gulp来改变开发流程，从而使开发更加快速高效。</p>
<p>gulp 和 grunt 非常类似，但相比于 grunt 的频繁 IO 操作，gulp 的流操作，能更快地更便捷地完成构建工作。</p>
<hr>
<p>在学习前，先谈谈大致使用 gulp 的步骤，给读者以初步的认识。首先当然是安装 nodejs，通过 nodejs 的 npm 全局安装和项目安装 gulp，其次在项目里安装所需要的 gulp 插件，然后新建 gulp 的配置文件 gulpfile.js 并写好配置信息（定义gulp任务），最后通过命令提示符运行 gulp 任务即可。</p>
<p>安装nodejs -&gt; 全局安装gulp -&gt; 新建package.json -&gt; 项目安装gulp及其插件 -&gt; 配置gulpfile.js -&gt; 运行任务</p>
<hr>

<h3 id="lesson1">1、安装 nodejs</h3>
<p>gulp 是基于 nodejs，理所当然需要安装 nodejs</p>

<h3 id="lesson3">3、npm 介绍</h3>
<p>3.1 npm（node package manager）是 nodejs 的包管理器，用于 node 插件管理（安装、卸载、管理依赖等）</p>
<p>3.2 使用npm安装插件：命令提示符执行 <code>npm install &lt;name&gt; [-g] [--save-dev]</code></p>
<p>3.2.1 <code>&lt;name&gt;</code> node插件名称。例：<code>npm install gulp-less --save-dev</code></p>
<p>3.2.2 <code>-g</code> 全局安装。将会安装在<code>C:\Users\Administrator\AppData\Roaming\npm</code>，并且写入系统环境变量；如不带该参数，将会安装在当前定位目录node_modules文件夹下。</p>
<p>全局安装可以通过命令行在任何地方调用；本地安装用于 require() 调用。</p>
<p>3.2.3 <code>--save</code> 将保存配置信息至 package.json</p>
<p>3.2.4 <code>-dev</code> 保存至 package.json 的 devDependencies 节点，不指定则保存至 dependencies 节点</p>
<blockquote>package.json 文件介绍：通过将配置信息写入 package.json 并将其加入版本管理，传递项目文件时，无需传递依赖包，其他开发者通过执行 <code>npm install</code>，就可以根据 package.json 自动下载依赖包）</blockquote>
<p>3.3 使用 npm 卸载插件：<code>npm uninstall &lt;name&gt; [-g] [--save-dev]</code> PS：不要直接删除本地插件包</p>
<p>3.4 使用 npm 更新插件：<code>npm update &lt;name&gt; [-g]  [--save-dev]</code></p>
<p>3.4.1 更新全部插件：<code>npm update [--save-dev]</code></p>
<p>3.5 查看npm帮助：<code>npm help</code></p>
<p>3.6 当前目录已安装插件：<code>npm list</code></p>

<h3 id="lesson4">4 选装 cnpm</h3>
<p>4.1 因为 npm 安装插件是从国外服务器下载，受网络影响大，可能出现异常。淘宝团队提供了国内镜像：“这是一个完整 npmjs.org 镜像，你可以用此代替官方版本(只读)，同步频率目前为 10分钟 一次以保证尽量与官方服务同步。”</p>
<p>4.2 官方网址：<a href="//npm.taobao.org/" target="_blank">http://npm.taobao.org</a></p>
<p>4.3 安装：命令提示符执行<code>npm install cnpm -g --registry=https://registry.npm.taobao.org</code></p>

<h3 id="lesson5">5 全局安装 gulp</h3>
<p>5.1 全局安装 gulp 目的是为了通过她执行 gulp 任务。</p>
<p>5.2 安装：命令提示符执行 <code>cnpm install gulp -g</code></p>
<p>5.3 查看是否正确安装 <code>gulp -v</code></p>

<h3 id="lesson6">6 新建 package.json 文件</h3>
<p>6.1 package.json 是基于 nodejs 项目必不可少的配置文件，它是存放在项目根目录的普通json文件；</p>
<p>6.2 它是这样一个json文件<strong>（注意：json文件内是不能写注释的，复制下列内容请删除注释）</strong>：</p>
<pre class="js">
{
  "name": "test",   //项目名称（必须）
  "version": "1.0.0",   //项目版本（必须）
  "description": "This is for study gulp project !",   //项目描述（必须）
  "homepage": "",   //项目主页
  "repository": {    //项目资源库
    "type": "git",
    "url": "https://git.oschina.net/xxxx"
  },
  "author": {    //项目作者信息
    "name": "surging",
    "email": "surging2@qq.com"
  },
  "license": "ISC",    //项目许可协议
  "devDependencies": {    //项目依赖的插件
    "gulp": "^3.8.11",
    "gulp-less": "^3.0.0"
  }
}
</pre>

<p>6.3 我们可以手动新建这个配置文件，但更为有效的方法是符执行 <code>npm init</code></p>
<p>6.4 查看 package.json 帮助文档，执行 <code>npm help package.json</code></p>

<h3 id="lesson7">7 项目安装 gulp 及其插件</h3>
<p>7.1 本地安装 gulp <code>cnpm install gulp --save-dev</code></p>
<blockquote>全局安装了 gulp 为什么还要再装一次：<br>全局安装 gulp 是为了执行 gulp 任务，本地安装 gulp 则是为了通过 require() 调用 gulp 插件的功能。</blockquote>
<p>7.2 按需安装 gulp 的插件，如 <code>cnpm install gulp-less --save-dev</code></p>
<blockquote>gulp-less 将会安装在 node_modules 的 gulp-less 目录下，该目录下有一个使用帮助文档 README.md</blockquote>
<p>7.3 如果是拷贝的他人项目文件，可以直接执行 <code>npm install --save-dev</code><p>

<h3 id="lesson8">8 新建 gulpfile.js 文件（重要）</h3>
<p>gulpfile.js 是 gulp 的项目配置文件，是位于项目根目录的普通js文件（其实放在其他文件夹下也能正常工作）</p>
<pre class="js">
/* 导入工具包 require('node_modules里对应模块') */
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less');
/* 定义一个testLess任务（自定义任务名称）*/
gulp.task('testLess', function () {
    gulp.src('src/less/index.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css
});
/* 定义默认任务，elseTask 为其他任务，该示例没有定义 elseTask 任务 */
gulp.task('default',['testLess', 'elseTask']); // 虽然没有实际定义default，但会执行定义的两个前置任务
 
//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径
</pre>

<h3 id="lesson9">9 运行 gulp</h3>
<p>命令执行格式 <code>gulp 任务名称</code></p>
<p>如执行前面定义的编译 less 任务：<code>gulp testLess</code></p>
<p>注：当执行 <code>gulp default</code> 或 <code>gulp</code> 将会调用 default 任务</p>

<h3 id="lesson10">10 使用 webstorm 运行 gulp 任务</h3>
<p>使用方法：将项目导入 webstorm，右键 gulpfile.js 选择“Show Gulp Tasks”打开 Gulp 窗口，若出现“No task found”，选择右键“Reload tasks”，双击运行即可。</p>
<h3 id="lesson11">11 总结</h3>
<p>11.1、安装 nodejs；</p>
<p>11.2、新建 package.json 文件；</p>
<p>11.3、全局和本地安装 gulp；</p>
<p>11.4、安装 gulp 插件；</p>
<p>11.5、新建 gulpfile.js 文件；</p>
<p>11.6、通过命令提示符运行 gulp 任务。</p>
</div>

<div>
<h2>自用文档模板</h2>
<h3>插件列表</h3>
<table><tbody>
<tr><td><a href="https://browsersync.io/docs/gulp">Browsersync(not plugin)</a></td><td>Time-saving synchronised browser testing</td></tr>
<tr><td><a href="https://www.npmjs.com/package/gulp-less/">gulp-less</a></td><td>A LESS plugin for Gulp</td></tr>
<tr><td><a href="https://www.npmjs.com/package/gulp-sourcemaps/">gulp-sourcemaps</a></td><td>Source map support</td></tr>
<tr><td><a href="https://www.npmjs.com/package/gulp-autoprefixer/">gulp-autoprefixer</a></td><td>Prefix CSS</td></tr>
<tr><td><a href="https://www.npmjs.com/package/gulp-concat/">gulp-concat</a></td><td>Concatenates files</td></tr>
<tr><td><a href="https://www.npmjs.com/package/gulp-clean-css/">gulp-clean-css</a></td><td>Minify css with clean-css</td></tr>
<tr><td><a href="https://www.npmjs.com/package/gulp-uglify/">gulp-uglify</a></td><td>Minify .js files with UglifyJS</td></tr>
</tbody></table>

<pre class="js">
/* 模块导入 */
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    reload = browserSync.reload,
    base = 'app'  // 设定一个 base 参数方便更改监控的子目录

/* Styles */
gulp.task('less', function () {
  return gulp.src(base+'/less/*.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('.'))  // 若不指定路径，map会嵌在css文件内
    .pipe(gulp.dest(base+'/styles'));
});

/* 监视文件改动并重新载入 */
gulp.task('default', function() {
  browserSync({ server: { baseDir: base} });
  gulp.watch('less/**/*.less', {cwd: base},['less']); // **匹配less的0个或多个子文件夹
  gulp.watch(['*.html', 'styles/**/*.css', 'scripts/**/*.js'], {cwd: base}, reload);
});
</pre>
</div>

<div>
<h2>其他好文索引</h2>
<p>另外一篇很火的 <a href="https://markpop.github.io/2014/09/17/Gulp%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/">Gulp 入门教程</a></p>
<p>这篇看着也不错 https://www.toptal.com/nodejs/an-introduction-to-automation-with-gulp</p>
<p>Gulp 中文文档，也不错 https://github.com/lisposter/gulp-docs-zh-cn</p>
<p>我现在用的学习环境，是照着这篇文章做的 <a href="http://www.gulpjs.com.cn/docs/recipes/server-with-livereload-and-css-injection/">拥有实时重载（live-reloading）和 CSS 注入的服务器</a></p>
</div>