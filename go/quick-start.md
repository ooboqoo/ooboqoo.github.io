# Quick Start

## 安装配置

### 安装

到 https://golang.org/dl/ 下载安装包安装即可。

### 开发环境

VS Code + Go 扩展。

安装完插件启动 VS Code 时会提示缺少工具，让点击安装，此时安装会失败(被墙了)，可通过命令行再重新安装一遍：

```bash
# 先将 SS 设为全局代理，然后
$ set http_proxy=127.0.0.1:1080
$ set https_proxy=127.0.0.1:1080
$ go get -u -v github.com/ramya-rao-a/go-outline
$ go get -u -v <其他分析工具>
```


## 简介








