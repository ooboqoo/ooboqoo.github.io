# File &amp; Buffer &amp; Stream


## Buffer 缓冲

在 ES 引入 TypedArray 之前，JS 缺少一种处理二进制数据流的机制。于是 Node.js 引入了 Buffer 来处理八位字节流 octet streams。TypeArray 可用后，Buffer 实现了 Unit8Array API 并作了调整和优化。

Buffer 很像 arrays of integers，但 Buffer 的长度是固定不能更改的，分配内存不包含在 V8 heap 内。

```js
const buf1 = Buffer.alloc(5)        // <Buffer 00 00 00 00 00> 长度5，内容用 `0x0` 填充
const buf2 = Buffer.alloc(5, 1)     // <Buffer 01 01 01 01 01> 长度5，内容用 `0x1` 填充
const buf3 = Buffer.allocUnsafe(5)  // <Buffer 02 00 00 00 06> 长度5，内容随机
const buf4 = Buffer.from([1, 2, 3])        // <Buffer 01 02 03>
const buf5 = Buffer.from('tést')           // <Buffer 74 c3 a9 73 74>  使用默认 'utf8'
const buf6 = Buffer.from('tést', 'latin1') // <Buffer 74 e9 73 74>
```

```js
// 使用构造函数创建 Buffer 已被废弃，因为其行为因第一个参数的不同而有明显改变
new Buffer(array)
new Buffer(arrayBuffer[, byteOffset [, length]])
new Buffer(buffer)
new Buffer(size)
new Buffer(string[, encoding])

Buffer.from(array)
Buffer.from(arrayBuffer[, byteOffset[, length]])
Buffer.from(buffer)
Buffer.from(string[, encoding])
Buffer.from(object[, offsetOrEncoding[, length]])
Buffer.alloc(size[, fill[, encoding]])
Buffer.allocUnsafe(size)
Buffer.allocUnsafeSlow(size)
```

```js
Buffer.poolSize

buf.toJSON()
buf.toString([encoding[, start[, end]]])
```

```js
Buffer.byteLength(string[, encoding])  // 获取一个字符串的字节长度
Buffer.compare(buf1, buf2)
Buffer.concat(list[, totalLength])
Buffer.isBuffer(obj)
Buffer.isEncoding(encoding)

buf[index]
buf.buffer
buf.length
buf.parent
buffer.kMaxLength
buffer.constants.MAX_LENGTH
buffer.constants.MAX_STRING_LENGTH

buf.fill(value[, offset[, end]][, encoding])
buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])
buf.equals(otherBuffer)
buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
buf.slice([start[, end]])
buf.includes(value[, byteOffset][, encoding])
buf.indexOf(value[, byteOffset][, encoding])
buf.lastIndexOf(value[, byteOffset][, encoding])
buf.keys()
buf.entries()
buf.values()
buf.swap16()
buf.swap32()
buf.swap64()
buffer.INSPECT_MAX_BYTES
buffer.transcode(source, fromEnc, toEnc)
```

```txt
buf.readDoubleBE(offset[, noAssert])#
buf.readDoubleLE(offset[, noAssert])#
buf.readFloatBE(offset[, noAssert])#
buf.readFloatLE(offset[, noAssert])#
buf.readInt8(offset[, noAssert])#
buf.readInt16BE(offset[, noAssert])#
buf.readInt16LE(offset[, noAssert])#
buf.readInt32BE(offset[, noAssert])#
buf.readInt32LE(offset[, noAssert])#
buf.readIntBE(offset, byteLength[, noAssert])#
buf.readIntLE(offset, byteLength[, noAssert])#
buf.readUInt8(offset[, noAssert])#
buf.readUInt16BE(offset[, noAssert])#
buf.readUInt16LE(offset[, noAssert])#
buf.readUInt32BE(offset[, noAssert])#
buf.readUInt32LE(offset[, noAssert])#
buf.readUIntBE(offset, byteLength[, noAssert])#
buf.readUIntLE(offset, byteLength[, noAssert])#

buf.write(string[, offset[, length]][, encoding])#
buf.writeDoubleBE(value, offset[, noAssert])#
buf.writeDoubleLE(value, offset[, noAssert])#
buf.writeFloatBE(value, offset[, noAssert])#
buf.writeFloatLE(value, offset[, noAssert])#
buf.writeInt8(value, offset[, noAssert])#
buf.writeInt16BE(value, offset[, noAssert])#
buf.writeInt16LE(value, offset[, noAssert])#
buf.writeInt32BE(value, offset[, noAssert])#
buf.writeInt32LE(value, offset[, noAssert])#
buf.writeIntBE(value, offset, byteLength[, noAssert])#
buf.writeIntLE(value, offset, byteLength[, noAssert])#
buf.writeUInt8(value, offset[, noAssert])#
buf.writeUInt16BE(value, offset[, noAssert])#
buf.writeUInt16LE(value, offset[, noAssert])#
buf.writeUInt32BE(value, offset[, noAssert])#
buf.writeUInt32LE(value, offset[, noAssert])#
buf.writeUIntBE(value, offset, byteLength[, noAssert])#
buf.writeUIntLE(value, offset, byteLength[, noAssert])#
```

## String Decoder

```js
new StringDecoder(encoding='utf8')
decoder.end(buffer?): string
decoder.write(buffer): string
```

与 `buffer.toString()` 的区别是，对于不完整的输入，`decoder.write()` 只会返回完整的部分，对于不完整的部分，会等待下次录入完整信息后再输出，而不像 `toString()` 直接出乱码。

```js
const { StringDecoder } = require('string_decoder')
const decoder = new StringDecoder('utf8')

const buf = Buffer.from('中文')
decoder.write(buf.slice(0, 4))  // '中'
decoder.write(buf.slice(4))     // '文'
decoder.write(buf.slice(0, 2))  // ''
decoder.end()                   // 乱码
```


## Stream 流

https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93

所有 stream 都是 EventEmitter 的实例，stream 模块通过 `require('stream')` 导入。

* Readable - streams from which data can be read, e.g. `fs.createReadStream()`
* Writable - streams to which data can be written, e.g. `fs.createWriteStream()`
* Duplex - streams that are both Readable and Writable, e.g. `net.Socket`
* Transform - Duplex streams that can modify or transform the data, e.g. `zlib.createDeflate()`

```ts
declare module "stream" {
  import * as events from "events";

  class internal extends events.EventEmitter {
    // pipe 才是使用流的正确方式，其他杂七杂八的控制方法和事件其实都用不到，除非真的需要做到精确控制
    // 返回值为传递的 destination
    pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean; }): T;
  }

  namespace internal {
    export class Stream extends internal { }

    export interface ReadableOptions {
      highWaterMark?: number;
      encoding?: string;
      objectMode?: boolean;
      read?: (this: Readable, size?: number) => any;
      destroy?: (error?: Error) => any;
    }

    export class Readable extends Stream implements NodeJS.ReadableStream {
      readable: boolean;
      readonly readableHighWaterMark: number;
      readonly readableLength: number;
      constructor(opts?: ReadableOptions);
      _read(size: number): void;  // 自定义读取时的行为
      read(size?: number): any;   // 执行读取操作
      setEncoding(encoding: string): this;
      pause(): this;
      resume(): this;
      isPaused(): boolean;
      unpipe<T extends NodeJS.WritableStream>(destination?: T): this;
      unshift(chunk: any): void;
      wrap(oldStream: NodeJS.ReadableStream): this;
      push(chunk: any, encoding?: string): boolean; // push 以供读取
      _destroy(err: Error, callback: Function): void;
      destroy(error?: Error): void;

      addListener(event: string, listener: (...args: any[]) => void): this;
      addListener(event: "readable", listener: () => void): this;
      addListener(event: "data", listener: (chunk: Buffer | string) => void): this;
      addListener(event: "end", listener: () => void): this;
      addListener(event: "close", listener: () => void): this;
      addListener(event: "error", listener: (err: Error) => void): this;

      emit(event: string | symbol, ...args: any[]): boolean;
      emit(event: "readable"): boolean;
      emit(event: "data", chunk: Buffer | string): boolean;
      emit(event: "end"): boolean;
      emit(event: "close"): boolean;
      emit(event: "error", err: Error): boolean;

      on(event: string, listener: (...args: any[]) => void): this;
      once(event: string, listener: (...args: any[]) => void): this;
      prependListener(event: string, listener: (...args: any[]) => void): this;
      prependOnceListener(event: string, listener: (...args: any[]) => void): this;
      removeListener(event: string, listener: (...args: any[]) => void): this;
    }

    export interface WritableOptions {
      highWaterMark?: number;
      decodeStrings?: boolean;
      objectMode?: boolean;
      write?: (chunk: string | Buffer, encoding: string, callback: Function) => any;
      writev?: (chunks: Array<{ chunk: string | Buffer, encoding: string }>, callback: Function) => any;
      destroy?: (error?: Error) => any;
      final?: (callback: (error?: Error) => void) => void;
    }

    export class Writable extends Stream implements NodeJS.WritableStream {
      writable: boolean;
      readonly writableHighWaterMark: number;
      readonly writableLength: number;
      constructor(opts?: WritableOptions);
      _write(chunk: any, encoding: string, callback: (err?: Error) => void): void;
      _writev?(chunks: Array<{ chunk: any, encoding: string }>, callback: (err?: Error) => void): void;
      _destroy(err: Error, callback: Function): void;
      _final(callback: Function): void;
      write(chunk: any, encoding?: string, cb?: Function): boolean;
      setDefaultEncoding(encoding: string): this;
      end(chunk?: any, encoding?: string, cb?: Function): void;
      cork(): void;
      uncork(): void;
      destroy(error?: Error): void;

      addListener(event: string, listener: (...args: any[]) => void): this;
      addListener(event: "close", listener: () => void): this;
      addListener(event: "drain", listener: () => void): this;
      addListener(event: "error", listener: (err: Error) => void): this;
      addListener(event: "finish", listener: () => void): this;
      addListener(event: "pipe", listener: (src: Readable) => void): this;
      addListener(event: "unpipe", listener: (src: Readable) => void): this;

      emit(event: string | symbol, ...args: any[]): boolean;
      emit(event: "close"): boolean;
      emit(event: "drain", chunk: Buffer | string): boolean;
      emit(event: "error", err: Error): boolean;
      emit(event: "finish"): boolean;
      emit(event: "pipe", src: Readable): boolean;
      emit(event: "unpipe", src: Readable): boolean;

      on(event: string, listener: (...args: any[]) => void): this;
      once(event: string, listener: (...args: any[]) => void): this;
      prependListener(event: string, listener: (...args: any[]) => void): this;
      prependOnceListener(event: string, listener: (...args: any[]) => void): this;
      removeListener(event: string, listener: (...args: any[]) => void): this;
    }

    export interface DuplexOptions extends ReadableOptions, WritableOptions {
      allowHalfOpen?: boolean;
      readableObjectMode?: boolean;
      writableObjectMode?: boolean;
    }

    // Note: Duplex extends both Readable and Writable.
    export class Duplex extends Readable implements Writable {
      writable: boolean;
      readonly writableHighWaterMark: number;
      readonly writableLength: number;
      constructor(opts?: DuplexOptions);
      _write(chunk: any, encoding: string, callback: (err?: Error) => void): void;
      _writev?(chunks: Array<{ chunk: any, encoding: string }>, callback: (err?: Error) => void): void;
      _destroy(err: Error, callback: Function): void;
      _final(callback: Function): void;
      write(chunk: any, encoding?: string, cb?: Function): boolean;
      setDefaultEncoding(encoding: string): this;
      end(chunk?: any, encoding?: string, cb?: Function): void;
      cork(): void;
      uncork(): void;
    }

    export interface TransformOptions extends DuplexOptions {
      transform?: (chunk: string | Buffer, encoding: string, callback: Function) => any;
      flush?: (callback: Function) => any;
    }

    export class Transform extends Duplex {
      constructor(opts?: TransformOptions);
      _transform(chunk: any, encoding: string, callback: Function): void;
      destroy(error?: Error): void;
    }

    export class PassThrough extends Transform { }
  }

  export = internal;
}
```

### API for Stream Consumers

#### stream.Writable

```txt
Event: 'pipe'   调用 readable.pipe(writable) 向该 writable 输入数据时触发
Event: 'unpipe' 调用 readable.unpipe(writable) 将该 writable 移出 dest 时触发
Event: 'drain'  （重要）缓存下降，腾出了空间供继续写入
Event: 'finish' （重要）调用了 stream.end() 且数据都已完成写入时触发
Event: 'close'  可写入资源关闭了 Note: The stream is not closed when the 'error' event is emitted.
Event: 'error'  出错啦
```

```js
writable.writableHighWaterMark
writable.writableLength

writable.setDefaultEncoding(encoding)  // sets the default encoding for a Writable stream

writable.cork()    // 强制缓存在内存，调用 stream.uncork() or stream.end() 时才正式写入 dest
writable.uncork()  // flushes all data buffered since stream.cork() was called

writable.write(chunk[, encoding][, callback])  // 写入数据
writable.end([chunk][, encoding][, callback])  // 完成最后处理并告知写入完毕
writable.destroy([error])
```

#### stream.Readable

Two Modes: flowing and paused
  * 刚启动时是 paused 模式，有监听 data 或有 pipe 目标就自动转 flowing
  * 去掉 pipe 目标会自动转 paused，但是去掉所有 data 监听器不会自动转回 paused 模式
  * 没有 pipe 目标，也没有添加 data 监听器时，flowing 模式下数据会丢失

Three States: readable.readableFlowing = `null` / `false` / `true` (`true`对应 flowing 模式，前两者对应 paused 模式)

Choose One：不管是用 `pipe()` 还是用 `on('data')` 再或者 `read()`，一个可读流上尽量只用一种方式，不要混用。

```txt
Event: 'readable' 有数据哦，具体说明看文档
Event: 'data'     （重要）给你数据，给你数据，...
Event: 'end'      （重要）数据传完了
Event: 'close'    可读流关闭了
Event: 'error'    出错啦
```

```js
readable.readableHighWaterMark
readable.readableLength
readable.isPaused()  // 判断是否暂停了(pipe() 时系统用，人类一般不用此方法)

readable.setEncoding(encoding)

readable.pipe(destination[, options])
readable.unpipe([destination])

readable.pause()  // 等着，先别主动传数据了，此时需要调用 read() 手动读取数据
readable.resume() // 从 paused 切换到 flowing 模式，持续需要监听 data 事件以获取数据

readable.read([size])    // paused 模式下手动读取数据
                         // 不仔细看文档，看到个 Readable 很容易就直接 .read()，但这样只能拿到 `null`
readable.unshift(chunk)  // 将取出的数据重新写回 readable

readable.wrap(stream)
readable.destroy([error])
```

```js
const readable = getReadableStreamSomehow();
readable.on('readable', function() {
  let data;
  while ((data = this.read()) !== null) {  // `.read()` 只能在 `readable` 事件 handler 中调用
    console.log(data);
  }
});
```

#### stream.Duplex & stream.Transform

```js
transform.destroy([error])
```

```js
// demo - 将用户输入的字符装成大写打印
const {Transform} = require('stream')
process.stdin
  .pipe(new Transform({
    transform (chunk, encoding, callback) {
      this.push(chunk.toString().toUpperCase())       // 可单独 push
      callback(null, chunk.toString().toLowerCase())  // 或放到 callback(隐式调用 push)
    }
  }))
  .on('data', data => console.log(data))
  .pipe(process.stdout)
```


### API for Stream Implementers

|||
----------|-------------------------
Readable  | `_read`
Writable  | `_write`, `_writev`?, `_final`?
Duplex    | `_read`, `_write`, `_writev`?, `_final`?
Transform | `_transform`, `_flush`?, `_final`?

```js
const { Writable } = require('stream')

// 要自定义一个可写流，必须提供 `_write` 的具体实现
class MyWritable extends Writable {
  constructor(options) {
    super(options);
    // ...
  }
  _write(chunk, encoding, callback) { /* ... */ }  // 注意这里带下划线
}

// 对于一些简单的使用场景，可以通过向构造函数 `Writable` 直接传递 `write` 方法创建自定义可写流
const myWritable1 = new Writabel({
  wirte(chunk, encoding, callback) { /* ... */ }   // 注意这里不带下划线
})
```

Node.js 源码：

```js
function Writable(options) {
  // ...
  if (options) {
    if (typeof options.write === 'function') this._write = options.write;
    // ...
  }
  Stream.call(this);
}
```


## File System 文件系统

文件系统模块是一个简单包装的 POSIX I/O 操作方法集。

文件系统模块中的所有方法均有异步和同步版本。

  * 异步方法采用第一个参数来接收 error，而同步方法则需要采用 try/catch 来捕获 error。
  * 高负荷系统中，强烈推荐使用异步版函数，同步版本会阻塞进程。

文件操作函数允许使用文件名的相对路径, 但是记住这个路径是相对于 `process.cwd()` 的。

```js
fs.stat(path, callback)                                  fs.statSync()          // ls -l
    fs.lstat(path, callback)                                 fs.lstatSync()
    fs.fstat(fd, callback)                                   fs.fstatSync()
fs.chmod(path, mode, callback)                           fs.chmodSync()         // chmod
    fs.lchmod(path, mode, callback)                          fs.lchmodSync()
    fs.fchmod(fd, mode, callback)                            fs.fchmodSync()
fs.chown(path, uid, gid, callback)                       fs.chownSync()         // chown
    fs.lchown(path, uid, gid, callback)                      fs.lchownSync()
    fs.fchown(fd, uid, gid, callback)                        fs.fchownSync()
fs.utimes(path, atime, mtime, callback)                  fs.utimesSync()        // touch
    fs.futimes(fd, atime, mtime, callback)                   fs.futimesSync()
fs.access(path[, mode], callback)                        fs.accessSync()        // ls -l
fs.exists(path, callback) @deprecated                        fs.existsSync()        // ls
fs.mkdir(path[, mode], callback)                         fs.mkdirSync()         // mkdir
    fs.mkdtemp(prefix[, options], callback)                  fs.mkdtempSync()
fs.link(existingPath, newPath, callback)                 fs.linkSync()          // link
fs.symlink(target, path[, type], callback)               fs.symlinkSync()       // link -s
fs.readdir(path[, options], callback)                    fs.readdirSync()       // ls
fs.readlink(path[, options], callback)                   fs.readlinkSync()
fs.rename(oldPath, newPath, callback)                    fs.renameSync()        // mv
fs.unlink(path, callback)                                fs.unlinkSync()        // rm
fs.rmdir(path, callback)                                 fs.rmdirSync()         // rmdir
fs.copyFile(src, dest[, flags], callback)                fs.copyFileSync()      // cp

fs.realpath(path[, options], callback)                   fs.realpathSync()
fs.realpath.native(path[, options], callback)            fs.realpathSync.native()

//-------------------------------------------------------------------------------------------
fs.createReadStream(path[, options])
fs.createWriteStream(path[, options])

fs.readFile(pathOrFd[, options], callback)               fs.readFileSync()
fs.writeFile(pathOrFd, data[, options], callback)        fs.writeFileSync()
fs.appendFile(pathOrFd, data[, options], callback)       fs.appendFileSync()

fs.open(path, flags[, mode], callback)                          fs.openSync()
fs.close(fd, callback)                                          fs.closeSync()
fs.read(fd, buffer, offset, length, position, callback)         fs.readSync()
fs.write(fd, buffer[, offset[, length[, position]]], callback)  fs.writeSync()
fs.write(fd, string[, position[, encoding]], callback)          fs.writeSync()
fs.truncate(path[, len], callback)                              fs.truncateSync()
    fs.ftruncate(fd[, len], callback)                               fs.ftruncateSync()
fs.fsync(fd, callback)                                          fs.fsyncSync()  // flush
    fs.fdatasync(fd, callback)                                      fs.fdatasyncSync()

fs.watch(filename[, options][, listener])
fs.watchFile(filename[, options], listener)
fs.unwatchFile(filename[, listener])
```

关于各函数的变异版本说明：
  * 绝大多数都包含异步版本和同步版本，同步版本带 `Sync` 后缀
  * 一些带 `f` 前缀的变异版，通过 file descriptor 读取
  * 一些带 `l` 前缀的变异版，如果碰到 symbolic link 则返回软链接本身的信息

```js
fs.access('./any/path', fs.constants.F_OK, err => { console.log(err ? 'not exist' : 'exists') })
fs.accessSync('etc/passwd', fs.constants.R_OK | fs.constants.W_OK)  // 存在返回 undefined; 不存在抛异常
fs.realpathSync('./nodejs/module/a.js')  // 'E:\\GitHub\\testlab\\nodejs\\module\\a.js'
fs.realpathSync('./nodejs/module/a')     // Error: ENOENT: no such file or directory
```

#### 文件读写操作

|||
|----------------|----------------------------------------------------------------------------
| fs.createReadStream(path, opts?)   | 创建并返回一个 ReadStream 对象
| fs.createWriteStream(path, opts?)  | 创建并返回一个 WriteStream 对象

|||
|-----------------------------------------------------|----------------------------------------------
| fs.readFile(pathOrFd, options?, callback)          | 异步读取一个文件的全部内容
| fs.writeFile(pathOrFd, data, options?, callback)   | 异步将数据写入一个文件，原内容会被覆盖
| fs.appendFile(pathOrFd, data, options?, callback)  | 异步地将数据添加到一个文件的尾部，如文件不存在会新建
| fs.truncate(path, len?, callback)                  | 异步清空一个文件的内容

|||
|------------------------------------------------------------|---------------------------------------
| fs.open(path, flags, mode?, callback)                      | 打开一个文件，并提供句柄供进一步操作
| fs.read(fd, buffer, offset, length, position, callback)    | 从文件指针 fd 读取数据
| fs.write(fd, buffer, offset, length, position?, callback)  | 从缓存中读取数据并写入文件
| fs.write(fd, data, position?, encoding?, callback)         | 向文件中写入字符串
| fs.fsync(fd, callback)                                     | 将文件缓冲同步到磁盘
| fs.close(fd, callback)                                     | 关闭文件句柄

##### fs.read(fd, buffer, offset, length, position, callback)

从 `fd` 句柄指向的文件的 `position` 位置读取 `length` 字节的数据，并写入到 `buffer` 的 `offset` 位置。

`callback(err, bytesRead, buffer)`: 分别为错误对象，读取的字节数 和 缓冲区。

##### fs.write(fd, buffer, offset, length, position?, callback)

从 `buffer` 的 `offset` 位置读取 `length` 字节的 buffer, 并向 `fd` 指针指向的文件从 `position`
位置写入内容。

`callback(err, written, buffer)`: `written` specifies how many bytes were written from `buffer`.

Note that it is unsafe to use fs.write multiple times on the same file without waiting for the callback. For this scenario, fs.createWriteStream is strongly recommended.

#### 系统命令

|||
|-----------------------------|--------------------------------------------------------------------------------
| fs.readdir(path, callback)  | 读取 path 目录内容, 获取的 `files` 数组不含 `'.'` 和 `'..'`
| fs.exists(path, callback)   | 已废弃，使用 `fs.stat()` 或 `fs.access()` 替代。<span class="mark">[注]</span>
| fs.mkdir(path[, mode], callback)         | 新建一个目录
| fs.mkdtemp(prefix[, options], callback)  | 新建一个目录，目录名为 prefix 加 6位随机字符
| fs.link(existingPath, newPath, callback) | 创建指向文件的硬连接
| fs.access(path[, mode], callback)        | 检查文件的存取权限
| fs.utimes(path, atime, mtime, callback)  | 改变文件的系统时间戳，有点 `touch` 的感觉

注：在读写操作前不应该去检查文件是否存在，因为即使检查了，当实际操作时还是可能已经改变了状态。

#### 文件信息

|||
|----------------|----------------------------------------------------------------------------
| fs.Stats       | fs.stat() fs.lstat() fs.fstat() 等方法返回此类实例
| fs.stat(path, callback)     | 读取文件状态信息, 获取的 `stats` 是一个 `fs.Stats` 对象

|||
|-------------------------------------|---------------------------------
| stats.size                          | 文件大小，单位 byte
| stats.birthtime / stats.birthtimeMs | "Birth Time" 创建时间，不带 `Ms` 的返回时间戳文字表示，带 `Ms` 的返回 毫秒数
| stats.mtime     / stats.mtimeMs     | "Modified Time" 上次修改时间
| stats.ctime     / stats.ctimeMs     | "Change Time" 文件状态变更时间
| stats.atime     / stats.atimeMs     | "Access Time" 最近存取时间
|||
| stats.isDirectory()    | 是否目录
| stats.isFile()         | 是否文件
| stats.isSocket()       | 是否是端口
| stats.isSymbolicLink() | 是否是软链接，只有通过 `fs.lstat()` 方法获得的对象才有这方法

#### 文件监控

|||
|------------------------------------------|--------------------
| fs.FSWatcher   | 此类的实例具有 Event: 'change'; Event: 'error'; watcher.close()
| fs.watch(filename[, options][, listener])  | 监控指定 路径/文件 的变化，该方法在不同系统中的行为差异较大


<style>
  td:first-Child { color: red; }
  h2 a { text-decoration: none; }
</style>
