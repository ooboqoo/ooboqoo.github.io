# 构建专题

## 常见问题

### 构建时内存溢出

https://mp.weixin.qq.com/s/XIRY1-Oa0Ms-bwpPnH6A4w

Node 进程的内存限制

> Currently, by default V8 has a memory limit of 512mb on 32-bit systems, and 1gb on 64-bit systems. The limit can be raised by setting `--max-old-space-size` to a maximum of ~1gb (32-bit) and ~1.7gb (64-bit), but it is recommended that you _split your single process into several workers_ if you are hitting memory limits.

解决问题最简单暴力的方法就是增加内存分配，如使用 `node --max-old-space-size=4096`。

这个项目是 TS 项目，ts 文件的编译是比较占用内存的，如果把这部分独立成一个单独的进程，情况会有所改善。

_tsconfig.js_ 中有一个配置选项 `transpileOnly`，默认为关闭，如果我们开启，那么项目构建时间可以少一半，内存占用也大大减少。但这样有个问题，就是项目编译时就没有类型检查了，也不会输出声明文件。

好在官方推荐了一个插件 _fork-ts-checker-webpack-plugin_，可以将这部分工作拿到单独的进程中进行。










