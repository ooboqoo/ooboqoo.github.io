# 资源索引

https://deno.land  
https://www.youtube.com/watch?v=M3BM9TB-8yA


## 依赖项目

### V8

https://v8.dev/

V8 是 Google 出品的 JavaScript/WebAssembly 引擎。用 C++ 编写，被 Chrome 浏览器和 Node.js 所使用。

V8 并不是原生支持 TypeScript。所有运行在 Deno 上的 TypeScript 代码会被编译成 JavaScript 代码，并缓存在 .deno 目录。


### Tokio

Node 的 libuv 在 Deno 下被换成了用 Rust 写的 Tokio。

Tokio 依赖 Rust 的 Future 特性，这个特性类似于 JS 的 Promise。


### FlatBuffers

FlatBuffers 是 Google 开发的，高效的跨语言、跨平台的序列化库。被 Deno 用来处理 V8 和 Rust 之间的消息通信。



