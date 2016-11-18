# NPM &amp; Yarn

## NPM

```bash
$ npm config get registry  # 查看源设置
$ npm config set registry https://registry.npm.taobao.org/  # 设置淘宝源
```

## Yarn

```bash
# 初始化项目
$ yarn init

# 添加一个依赖包
$ yarn add [package]@[version]
$ yarn add [package]@[tag]

# 更新依赖包
$ yarn upgrade [package]@[version]

# 删除依赖包
$ yarn remove [package]

# 安装所有依赖
$ yarn
$ yarn install
```

### NPM 及 Yarn 命令

https://yarnpkg.com/en/docs/migrating-from-npm

npm                                       | Yarn
----------------------------------------- | -------------------------------------
`npm install`                             | `yarn install`
 (N/A)                                    | `yarn install --flat`
 (N/A)                                    | `yarn install --har`
 (N/A)                                    | `yarn install --no-lockfile`
 (N/A)                                    | `yarn install --pure-lockfile`
`npm install [package]`                   | (N/A)
`npm install --save [package]`            | `yarn add [package]`
`npm install --save-dev [package]`        | `yarn add [package] [--dev/-D]`
 (N/A)                                    | `yarn add [package] [--peer/-P]`
`npm install --save-optional [package]`   | `yarn add [package] [--optional/-O]`
`npm install --save-exact [package]`      | `yarn add [package] [--exact/-E]`
 (N/A)                                    | `yarn add [package] [--tilde/-T]`
`npm install --global [package]`          | `yarn global add [package]`
`npm rebuild`                             | `yarn install --force`
`npm uninstall [package]`                 | (N/A)
`npm uninstall --save [package]`          | `yarn remove [package]`
`npm uninstall --save-dev [package]`      | `yarn remove [package]`
`npm uninstall --save-optional [package]` | `yarn remove [package]`
`npm cache clean`                         | `yarn cache clean`
`rm -rf node_modules && npm install`      | `yarn upgrade`

推荐下载安装包安装，据说会自动设置 Path。我 `npm install yarn` 后费好大劲才找到 global 地址 `%USERPROFILE%\AppData\Local\Yarn\config\global\node_modules\.bin` 然后还得手动去设置 `PATH` 变量(设置完不用重启系统，重启终端即可)。



