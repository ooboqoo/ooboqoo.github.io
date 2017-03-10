# Electron

https://github.com/electron/electron   
https://electron.atom.io/   

```bash
$ set ELECTRON_MIRROR="http://npm.taobao.org/mirrors/electron/"  # 配置淘宝镜像，linux 下用 export 命令
$ npm install electron -g
```

## Quick Start

https://github.com/electron/electron/blob/master/docs/tutorial/quick-start.md

```bash
$ git clone https://github.com/electron/electron-quick-start
$ cd electron-quick-start
$ electron .
```

## Application Distribution

https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md

> 预编译版淘宝镜像地址：https://npm.taobao.org/mirrors/electron

To distribute your app with Electron, you need to download Electron's [prebuilt binaries](https://github.com/electron/electron/releases). Next, the folder containing your app should be named `app` and placed in Electron's resources directory as shown in the following examples. Note that the location of Electron's prebuilt binaries is indicated with `electron/` in the examples below.

```text
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Then execute `electron.exe` on Windows, and Electron will start as your app. The `electron` directory will then be your distribution to deliver to final users.

### Packaging Your App into a File

Apart from shipping your app by copying all of its source files, you can also package your app into an [asar](https://github.com/electron/asar) archive to avoid exposing your app's source code to users.

```bash
$ npm install -g asar
$ asar --help
$ asar pack app app.asar
```

To use an `asar` archive to replace the `app` folder, you need to rename the archive to `app.asar`, and put it under Electron's resources directory like below, and Electron will then try to read the archive and start from it.

```text
electron/resources/
└── app.asar
```

More details can be found in [Application packaging](https://electron.atom.io/docs/tutorial/application-packaging).

### Rebranding with Downloaded Binaries

After bundling your app into Electron, you will want to rebrand Electron before distributing it to users.

You can rename `electron.exe` to any name you like, and edit its icon and other information with tools like [rcedit](https://github.com/electron/rcedit/releases).

```txt
rcedit "path-to-exe-or-dll" --set-icon "path-to-ico" --set-file-version "10.7"  # 仅限 windows
```

### Packaging Tools

Apart from packaging your app manually, you can also choose to use third party packaging tools to do the work for you:

* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron-userland/electron-packager)

### Rebranding by Rebuilding Electron from Source

It is also possible to rebrand Electron by changing the product name and building it from source. To do this you need to modify the `atom.gyp` file and have a clean rebuild.
