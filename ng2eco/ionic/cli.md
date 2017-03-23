# Ionic 2 CLI

### 常用命令

```bash
# 更新 Ionic CLI
$ npm install -g cordova ionic

# 更新 Ionic 项目
$ ionic lib update
$ npm install

# 快捷调试
$ ionic serve

# 打包
$ ionic build android
```

### generate

Create pages and services.

```bash
$ ionic g page myPage
  # Create app/pages/my-page/my-page.html
  # Create app/pages/my-page/my-page.ts
  # Create app/pages/my-page/my-page.scss

$ ionic g provider MyData
  # Create app/providers/my-data/my-data.ts
```

### platform

Add platform target for building an Ionic app.

```bash
$ ionic platform add android@5.0.0
  # --noresources|-r  Do not add default Ionic icons and splash screen resources
  # --nosave|-e  Do not save the platform to the package.json file
```

清理目录后这步容易报错，请确保操作目录至少存在 `www` 和 `config.xml`

### run

Run an Ionic project on a connected device

```bash
$ ionic run
  # --livereload|-l
  # --address
  # --port|-p
  # --livereload-port|-r
  # --consolelogs|-c  Print app console logs to Ionic CLI (livereload req.)
  # --serverlogs|-s  Print dev server logs to Ionic CLI (livereload req.)
  # --debug|--release
  # --device|--emulator|--target=FOO
```

### serve

Start a local development server for app dev/testing

```bash
$ ionic serve
  # --consolelogs|-c  Print app console logs to Ionic CLI
  # --serverlogs|-s Print dev server logs to Ionic CLI
  # --port|-p 
  # --livereload-port|-r  
  # --nobrowser|-b  Disable launching a browser
  # --nolivereload|-d Do not start live reload
  # --noproxy|-x  Do not add proxies
  # --address 
  # --all|-a  Have the server listen on all addresses (0.0.0.0)
  # --browser|-w  
  # --browseroption|-o  
  # --lab|-l  Test your apps on multiple screen sizes and platform types
  # --nogulp  Disable running gulp during serve
  # --platform|-t 
```

### start

Starts a new Ionic project in the specified PATH

```bash
$ ionic start
  # --v2  Create a V2 project.
  # --appname|-a  
  # --id|-i 
  # --no-cordova|-w Create a basic structure without Cordova requirements
  # --sass|-s Setup the project to use Sass CSS precompiling
  # --list|-l List starter templates available
  # --io-app-id 
  # --template|-t 
  # --zip-file|-z
```