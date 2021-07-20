# FlatBuffers

https://google.github.io/flatbuffers/


参考文章 https://mp.weixin.qq.com/s/SFQkDQ90aIApFTFFKvIScQ

* 反序列化速度极快（或者说无需解码）
* 默认值不占存储空间（Table 结构内的变量）
* 字节对齐
* 向前向后兼容（Struct 结构除外）
* 在 add 字段时没有顺序要求（Table 结构）
* 可根据 Schema 自动生成编解码器
* 可根据 Schema 自动生成 Json


名词辨析

* Model 「模型」是对现实世界的抽象
* Schema 「模式」，多指一套「编码规范」，如 XML Schema 等
* Scheme 一般指比较明确的「方案」、「体系」


### FlatBuffers Schema

FlatBuffers 通过 Schema 文件定义数据结构，Schema 定义与其他框架使用的 IDL 语言类似。FlatBuffers 的 Schema 是一种类 C 的语言。FlatBuffers 也支持 Protocol Buffers 中的 .proto 格式。

### 序列化

简单来说 FlatBuffers 就是把对象数据，保存在一个一维的数组中，将数据都缓存在一个 ByteBuffer 中，每个对象在数组中被分为两部分。元数据部分：负责存放索引。真实数据部分：存放实际的值。然而 FlatBuffers 与大多数内存中的数据结构不同，它使用严格的对齐规则和字节顺序来确保 buffer 是跨平台的。此外，对于 table 对象，FlatBuffers 提供前向/后向兼容性和 optional 字段，以支持大多数格式的演变。除了解析效率以外，二进制格式还带来了另一个优势，数据的二进制表示通常更具有效率。


### 反序列化

FlatBuffers 反序列化的过程就很简单了。由于序列化的时候保存好了各个字段的 offset，反序列化的过程其实就是把数据从指定的 offset 中读取出来。

### 自动生成代码

FlatBuffers 的自动化包括自动生成编码解码接口和自动生成 Json，自动化生成编解码接口和自动生成 Json，都依赖 schem 的解析。

### 优缺点

优点

* 解码速度极快

缺点

* 二进制数据不可读
* 向后兼容有限，在 Schema 中添加或删除字段必须小心



