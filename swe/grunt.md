# Grunt

英文官网 https://gruntjs.com/  
中文网 http://www.gruntjs.net/

## 快速入门

### 安装 CLI

```bash
$ npm install -g grunt-cli
```

每次运行 `grunt` 时，他就利用 node 提供的 `require()` 系统查找本地安装的 Grunt。正是由于这一机制，你可以在项目的任意子目录中运行 `grunt`。

如果找到一份本地安装的 Grunt，CLI 就将其加载，并传递 Gruntfile 中的配置信息，然后执行你所指定的任务。为了更好的理解 Grunt CLI 的执行原理，请[阅读源码](https://github.com/gruntjs/grunt-cli/blob/master/bin/grunt)。

注：项目组坚持的模式是，CLI 全局安装，而 grunt 须安装在本地。这样的目的是避免不同版本的 grunt 引起的混乱。

### 准备一个新的 Grunt 项目

一般需要在你的项目中添加两份文件：`package.json` 和 `Gruntfile.js`。

`package.json`: 此文件被 npm 用于存储项目的元数据，以便将此项目发布为 npm 模块。你可以在此文件中列出项目依赖的 grunt 和 Grunt 插件，放置于 devDependencies 配置段内。

`Gruntfile.js`: 用来配置或定义任务（task）并加载 Grunt 插件。应当放在项目根目录中(和 package.json 同级)。

#### `package.json` 示例

```json
{
  "name": "my-project-name",
  "version": "0.1.0",
  "devDependencies": {
    "grunt": "~0.4.5",
    "grunt-contrib-concat": "^1.0.1",
    "grunt-contrib-jshint": "~0.10.0",
    "grunt-contrib-nodeunit": "~0.4.1",
    "grunt-contrib-uglify": "~0.5.0"
  }
}
```

#### `Gruntfile.js` 示例

```js
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // 属性
    pkg: grunt.file.readJSON('package.json'),
    // 任务
    uglify: {
      // 针对任务的配置项
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      // 任务的一个目标
      build: {
        // 针对于特定目标的配置项
        options: { }
        // 源文件
        src: 'src/<%= pkg.name %>.js',
        // 输出文件
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
```

### 配置说明

#### "wrapper" 函数

每一份 Gruntfile (和 grunt 插件) 都遵循同样的格式，你所书写的 Grunt 代码必须放在此函数内：

```js
module.exports = function(grunt) {
  // Do grunt-related things in here
};
```


#### 项目和任务配置

大部分的 Grunt 任务都依赖某些配置数据，这些数据被定义在一个 object 内，并传递给 `grunt.initConfig` 方法。

在下面的案例中，`grunt.file.readJSON('package.json')` 将存储在 `package.json` 文件中的 JSON 元数据引入到 grunt config 中。 由于 `<% %>` 模板字符串可以引用任意的配置属性，因此可以通过这种方式来指定诸如文件路径和文件列表类型的配置数据，从而减少一些重复的工作。

你可以在这个配置对象中(传递给 `initConfig()`方法的对象)存储任意的数据，只要它不与你任务配置所需的属性冲突，否则会被忽略。此外，由于这本身就是 JavaScript，你不仅限于使用 JSON；你可以在这里使用任意的有效的JS代码。如果有必要，你甚至可以以编程的方式生成配置。

与大多数 task 一样，`grunt-contrib-uglify` 插件中的 `uglify` **任务**要求它的配置被指定在一个**同名属性**中。在这里有一个例子, 我们指定了一个 banner **选项**(用于在文件顶部生成一个注释)，紧接着是一个单一的名为 build 的 uglify **目标**，用于将一个 js 文件压缩为一个目标文件。

```js
// Project configuration.
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  uglify: {
    options: {
      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    },
    build: {
      src: 'src/<%= pkg.name %>.js',
      dest: 'build/<%= pkg.name %>.min.js'
    }
  }
});
```

#### 加载 Grunt 插件和任务

像 `concatenation` `minification` `grunt-contrib-uglify` 和 `linting` 这些常用的任务 task 都已经以 grunt 插件的形式被开发出来了。只要在 `package.json` 文件中被列为 `dependency` 的包，并通过 `npm install` 安装之后，都可以在 `Gruntfile` 中以简单命令的形式使用：

```js
// 加载能够提供"uglify"任务的插件。
grunt.loadNpmTasks('grunt-contrib-uglify');
```

注：插件其实就是一个 task。

#### 自定义任务

通过定义 `default` 任务，可以让 Grunt 默认执行一个或多个任务。在下面的这个案例中，执行 grunt 命令时如果不指定一个任务的话，将会执行 `uglify` 任务。这和执行 `grunt uglify` 或者 `grunt default` 的效果一样。`default` 任务列表数组中可以指定任意数目的任务（可以带参数）。

```js
// Default task(s).
grunt.registerTask('default', ['uglify']);
```

如果 Grunt 插件中的任务不能满足你的项目需求，你还可以在 `Gruntfile` 中自定义任务。例如，在下面的 `Gruntfile` 中自定义了一个 `default` 任务，并且他甚至不依赖任务配置：

```js
module.exports = function(grunt) {

  // A very basic default task.
  grunt.registerTask('default', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });

};
```

特定于项目的任务不必在 `Gruntfile` 中定义。他们可以定义在外部 .js 文件中，并通过 `grunt.loadTasks` 方法加载。


## 任务配置详解

### Grunt Configuration

使用 `grunt.initConfig` 方法来配置任务，该方法接收一个配置对象，此配置对象可包含各种属性，属性可分两类：
  * 任务配置属性，任务执行时，会到配置对象的同名属性下取针对任务的配置信息。
  * 其他属性，除了任务配置属性外，还可以随便放置其他属性，除非配置中有使用，否则这些属性会被简单忽略。

### Task Configuration and Targets

一个任务可包含多个目标，执行任务时，如果指定了目标，仅该目标会执行，而如果没有指定目标，则所有目标都会被执行。

下面的配置，`grunt concat:foo` 只会执行 foo 目标，而 `grunt concat` 则会依次执行 foo 和 bar 目标。

```js
grunt.initConfig({
  concat: {
    foo: {
      // concat task "foo" target options and files go here.
    },
    bar: {
      // concat task "bar" target options and files go here.
    },
  }
});
```

### Options

在任务以及目标中都可以设置 options 属性来对具体行为进行配置。目标中的配置会覆盖任务的配置，而任务的配置会覆盖默认配置。

### Files

因为多数任务都是用来执行文件操作的，所以 Grunt 对文件声明提供了强大的支持。

内容很多，暂略。。。





## 插件笔记

https://gruntjs.com/plugins

```js
{
  "grunt-contrib-clean": "~0.5.0",
  "grunt-contrib-copy": "~0.4.1",
  "grunt-contrib-concat": "~0.5.1",
  "grunt-contrib-cssmin": "0.13.0",
  "grunt-contrib-jshint": "~0.7.1",
  "grunt-contrib-uglify": "~0.9.1",
  "grunt-marsrev": "~1.2.0",
  "grunt-safety": "~0.1.2",
  "grunt-replace": "~0.9.2",
  "grunt-replace-url": "~0.1.1",
  "grunt-contrib-htmlmin": "2.3.0"
}
```
