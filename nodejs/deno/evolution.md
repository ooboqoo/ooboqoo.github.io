# Deno 进化史





### 发布

Deno, a Secure Runtime for JavaScript and TypeScript - Ryan  https://www.youtube.com/watch?v=doug6st5vAs


### 简介

【Deno的目标】

Deno的目标是为现代程序员提供一个高开发效率的脚本环境。

与NodeJS类似，Deno使用的是事件驱动的架构，提供了一组无阻塞的核心IO机制，以及它们的阻塞版本。

Deno可以用来创建Web服务器，执行科学计算等。


【技术概述】

[Tokio](https://github.com/tokio-rs/tokio) 作为异步事件驱动平台被引入，取代 [libuv](https://github.com/libuv/libuv)




### 语言迭代

Deno 最初是用 Go 编写的，使用 Protocol Buffer 来实现特权方（Go，具有系统调用权限）和非特权方（V8）之间的序列化。

不过，由于担心重复运行时间和垃圾收集压力，Go 语言很快就被 Rust 取代了。







### 通信方案迭代

序列化库性能比较 https://github.com/thekvs/cpp-serializers

Deno 进程间通信方案变迁
* 使用 Protobuf
* 发现 Protobuf 序列化、反序列化太耗时，[调研](https://github.com/denoland/deno/issues/269)后换成了 Flatbuffer
* 发现 Flatbuffer 还是慢、并且导致构建配置过于复杂，搞成了两层，低频操作用 JSON，高频操作自己实现 https://github.com/denoland/deno/issues/2801



并采用 FlatBuffer 来实现更快的“零拷贝”序列化和反序列化。但后来在2019年4月发布的基准测试结果显示，FlatBuffers在序列化方面的开销很大，所以2019年8月FlatBuffers最终被移除。

2018年11月，Deno仿照Go的标准库创建了一个标准库，提供了大量的工具和实用程序，部分解决了NodeJS的依赖树爆炸的问题。




FlatBuffers
Flatbuffers 是一个由 Google 开发的，高效的跨平台的序列化库。他允许在不同的语言之间传递和接受消息，这其中没有打包和解包的性能损耗。

对于Deno来说，FlatBuffers 被用来在进程内部的“特权方”和“无特权方”之间进行消息通信。很多公开的 Deno APIs 内部，在 TypeScript 前台创建了包含序列化数据的 buffers，然后这些 buffers 被传递到 Rust ，使得 Rust 可以处理这些请求。在处理完这些请求后，Rust 后台也创建了包含序列化数据的 buffers 回传给 TypeScript，其中，反序列化这些 buffers 使用的是 FlatBuffers 编译器产生的文件。

相比较于 Node，Node 对于每一个特权调用创建了很多 V8 的扩展，而借助于 Flat Buffers，Deno 仅仅需要暴露出在 TypeScript 和 Rust 之间进行消息发送和消息接受的方法。

在 Go 原型中，Flatbuffers 被用来取代 Protocol Buffers，来避免序列化的性能损耗。具体可以查看 这个讨论 来获得更多的信息。












