# Protocol Buffers

https://developers.google.com/protocol-buffers

Protocol buffers are a language-neutral, platform-neutral extensible mechanism for serializing structured data.

### 比较

[JSON vs Protocol Buffers vs FlatBuffers](https://codeburst.io/json-vs-protocol-buffers-vs-flatbuffers-a4247f8bda6f)

JSON 在性能上肯定是最辣鸡的，但人类易读，工具支持完善，在性能要求不苛刻的场景是首选。

Protocol Buffers 和 FlatBuffers 在性能上有显著优势，且 FlatBuffers 略胜一筹。但二进制内容不可读。适用于微服务间通信。

FlatBuffers 要比 Ptotocol Buffers 要写更多代码。

