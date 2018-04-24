# File &amp; Buffer &amp; Stream


## Buffer 缓冲

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

```txt
Buffer.poolSize

Buffer.byteLength(string[, encoding])
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
buf.toJSON()
buf.toString([encoding[, start[, end]]])
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


## Stream 流

所有 stream 都是 EventEmitter 的实例，stream 模块通过 `require('stream')` 导入。

* Readable - streams from which data can be read, e.g. `fs.createReadStream()`
* Writable - streams to which data can be written, e.g. `fs.createWriteStream()`
* Duplex - streams that are both Readable and Writable, e.g. `net.Socket`
* Transform - Duplex streams that can modify or transform the data, e.g. `zlib.createDeflate()`

### API for Stream Consumers

#### stream.Writable

```txt
Event: 'close' 可写入资源关闭了 Note: The stream is not closed when the 'error' event is emitted.
Event: 'drain' 缓存下降，可继续写入了
Event: 'error' 出错啦
Event: 'finish' 调用了 stream.end() 且数据都已完成写入时触发
Event: 'pipe' 调用 readable.pipe(writable) 向该 writable 输入数据时触发
Event: 'unpipe' 调用 readable.unpipe(writable) 将该 writable 移出 dest 时触发
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

Two Modes
Three States
Choose One

```txt
Event: 'close'     可读流关闭了
Event: 'data'      数据准备好了，拿走
Event: 'end'       这里已经没有更多数据了，都被取走了
Event: 'error'     出错啦
Event: 'readable'  您有新的消息
```

```js
readable.readableHighWaterMark
readable.readableLength
readable.isPaused()  // 判断是否暂停了(pipe() 时系统用，人类一般不用此方法)

readable.setEncoding(encoding)

readable.pause()  // 等着，先别主动传数据了
readable.resume() // 从 paused 切换到 flowing 模式

readable.pipe(destination[, options])
readable.unpipe([destination])

readable.unshift(chunk)  // 将取出的数据重新写回 readable
readable.wrap(stream)

readable.read([size])
readable.destroy([error])
```

#### stream.Duplex & stream.Transform

transform.destroy([error])

### API for Stream Implementers

Simplified Construction

Implementing a Writable Stream
Constructor: new stream.Writable([options])

```js
writable._write(chunk, encoding, callback)
writable._writev(chunks, callback)
writable._destroy(err, callback)
writable._final(callback)
```

Errors While Writing
An Example Writable Stream
Decoding buffers in a Writable Stream

Implementing a Readable Stream
new stream.Readable([options])
readable._read(size)
readable._destroy(err, callback)
readable.push(chunk[, encoding])

Errors While Reading
An Example Counting Stream

Implementing a Duplex Stream
new stream.Duplex(options)
An Example Duplex Stream
Object Mode Duplex Streams

Implementing a Transform Stream
new stream.Transform([options])
Events: 'finish' and 'end'
transform._flush(callback)
transform._transform(chunk, encoding, callback)
Class: stream.PassThrough

```js
// learnyounode 练习 12 代码
// 根据传入的 req 返回大写形式的 res
const http = require('http'),
  port = +process.argv[2],
  createTransStream = require('./program12_createtransstream.js');
http.createServer((req, res) => {
  req.pipe(createTransStream(function(chunk) {
    return chunk.toString().toUpperCase();
  })).pipe(res);
}).listen(port);

// program12_createtransstream.js
const Transform = require('stream').Transform;
module.exports = function createTransStream(func) {
  return new Transform({
    transform(chunk, encoding, callback) {
      this.push(func(chunk));
      callback();
    }
  });
};
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
fs.exists(path, callback)                                fs.existsSync()        // ls
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

fs.readFile(path[, options], callback)                   fs.readFileSync()
fs.writeFile(file, data[, options], callback)            fs.writeFileSync()
fs.appendFile(file, data[, options], callback)           fs.appendFileSync()

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
fs.realpathSync('./nodejs/module/a.js')  // 'E:\\GitHub\\testlab\\nodejs\\module\\a.js'
fs.realpathSync('./nodejs/module/a')     // Error: ENOENT: no such file or directory
```

#### 文件读写操作

|||
|----------------|----------------------------------------------------------------------------
| fs.createReadStream(path, [opts])   | 创建并返回一个 ReadStream 对象
| fs.createWriteStream(path, [opts])  | 创建并返回一个 WriteStream 对象

|||
|-----------------------------------------------------|----------------------------------------------
| fs.readFile(filename, [options], callback)          | 异步读取一个文件的全部内容
| fs.writeFile(filename, data, [options], callback)   | 异步将数据写入一个文件，原内容会被覆盖
| fs.appendFile(filename, data, [options], callback)  | 异步地将数据添加到一个文件的尾部，如文件不存在会新建

|||
|------------------------------------------------------------|---------------------------------------
| fs.open(path, flags, [mode], callback)                     | 打开一个文件，并提供句柄供进一步操作
| fs.read(fd, buffer, offset, length, position, callback)    | 从文件指针 fd 读取数据
| fs.write(fd, buffer, offset, length[, position], callback) | 从缓存中读取数据并写入文件
| fs.write(fd, data[, position[, encoding]], callback)       | 向文件中写入字符串
| fs.fsync(fd, callback)                                     | 将文件缓冲同步到磁盘
| fs.close(fd, callback)                                     | 关闭文件句柄

##### fs.read(fd, buffer, offset, length, position, callback)

从 `fd` 句柄指向的文件的 `position` 位置读取 `length` 字节的数据，并写入到 `buffer` 的 `offset` 位置。

`callback(err, bytesRead, buffer)`: 分别为错误对象，读取的字节数 和 缓冲区。

##### fs.write(fd, buffer, offset, length[, position], callback)

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
| fs.link(existingPath, newPath, callback) | 
| fs.access(path[, mode], callback)        | 
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


## OS 操作系统

只列了部分 API，注意这里的基本都是方法

|||
|------------------------|-------------------------------------------------------------------------------
| os.platform()          | [string] 平台名, 同 `process.platform`，取值 `'win32'` `'darwin'` `'linux'` 等
| os.homedir()           | [string] 用户主目录
|||
| os.EOL                 | [string] 行末标记 (POSIX `\n`) (Win `\r\n`)
| os.freemem()           | [integer] 空闲系统内存，返回表示字节数的整数
| os.totalmem()          | [integer] 所有系统内存，返回表示字节数的整数
| os.tmpdir()            | [string] 默认临时文件目录
| os.hostname()          | [string] 主机名
| os.loadavg()           | [Array] 返回一个数组，包含1, 5, 15分钟平均负载，Win 系统下始终为 `[0, 0, 0]`
| os.type()              | [string] 操作系统名 `'Linux'` `Darwin` `Windows_NT` 等
| os.uptime()            | [number] 开机秒数，Win 平台下带小数部分
| os.userInfo([options]) | [Object] 返回当前有效用户的信息

<style>
  td:first-Child { color: red; }
  h2 a { text-decoration: none; }
</style>
