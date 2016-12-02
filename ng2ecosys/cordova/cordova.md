# Apache Cordova

## CLI

```bash
# 创建项目
$ cordova create test com.cordova.test test  # <文件夹名> <包名> <app名>

# 平台操作
$ cordova platforms add android  # 添加平台
$ cordova platforms rm android   # 移除平台
$ cordova platforms ls           # 查看平台

# 插件操作
$ cordova plugin add cordova-plugin-file  # 添加官方插件
$ cordova plugin add https://github.com/phonegap/phonegap-plugin-barcodescanner.git # 添加第三方插件
$ cordova plugin rm cordova-plugin-file   # 删除插件
$ cordova plugin list                     # 查看插件

# 编译调试
$ cordova serve android  # 在浏览器预览
$ cordova build          # 给所有添加的平台生成安装包
$ cordova build android  # 只生成 android 安装包

```


## 文件夹目录

hooks：存放自定义cordova命令的脚本文件。每个project命令都可以定义before和after的Hook，比如：before_build、after_build。没用过，不展开了。

platforms：平台目录，各自的平台代码就放在这里，可以放一下平台专属的代码，现在这个目录应该是空的，后面会介绍如何创建平台。

plugins：插件目录，安装的插件会放在这里。后面会有专门的文章介绍开发插件。

www：最重要的目录，存放项目主题的HTML5和JS代码的目录。app一开始打开的就是这个目录中index.html文件。

config.xml：主要是cordova的一些配置，比如：项目使用了哪些插件、应用图标icon和启动页面SplashScreen，修改app的版本，名字等信息，还有平台的配置。

