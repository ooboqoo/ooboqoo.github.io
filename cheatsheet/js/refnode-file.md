# File &amp; Buffer &amp; Stream

<style>
  td:first-Child { color: red; }
  h2 a { text-decoration: none; }
</style>

## File System 文件系统

文件系统模块是一个简单包装的 POSIX I/O 操作方法集。

文件系统模块中的所有方法均有异步和同步版本。

  * 异步方法采用第一个参数来接收 error，而同步方法则需要采用 try/catch 来捕获 error。
  * 高负荷系统中，强烈推荐使用异步版函数，同步版本会阻塞进程。

文件操作函数允许使用文件名的相对路径, 但是记住这个路径是相对于 `process.cwd()` 的。

|||
|----------------|----------------------------------------------------------------------------
| fs.FSWatcher   | 此类的实例具有 Event: 'change'; Event: 'error'; watcher.close()
| fs.Stats       | fs.stat() fs.lstat() fs.fstat() 等方法返回此类实例
| fs.ReadStream  | 此类的实例具有 Event: 'open'; Event: 'close'; readStream.path
| fs.WriteStream | 此类的实例具有 Event: 'open'; Event: 'close'; writeStream.path; writeStream.bytesWritten

|||
|------------------------------------------------------------|----------------------------------------------
| fs.createReadStream(path, [opts])                          | 创建并返回一个 ReadStream 对象
| fs.createWriteStream(path, [opts])                         | 创建并返回一个 WriteStream 对象
| fs.open(path, flags, [mode], callback)                     | 打开一个文件，并提供句柄供进一步操作
| fs.read(fd, buffer, offset, length, position, callback)    | 从文件指针 fd 读取数据
| fs.write(fd, buffer, offset, length[, position], callback) | 从缓存中读取数据并写入文件
| fs.write(fd, data[, position[, encoding]], callback)       | 向文件中写入字符串
| fs.close(fd, callback)                                     | 关闭文件句柄
| fs.readFile(filename, [options], callback)                 | 异步读取一个文件的全部内容
| fs.writeFile(filename, data, [options], callback)          | 异步将数据写入一个文件，原内容会被覆盖
| fs.appendFile(filename, data, [options], callback)         | 异步地将数据添加到一个文件的尾部，如文件不存在会新建

|||
|-----------------------------|--------------------------------------------------------------------------------
| fs.readdir(path, callback)  | 读取 path 目录内容 callback(err, files): files 数组不含 '.' 和 '..'
| fs.exists(path, callback)   | 检查指定路径的文件或者目录是否存在 callback(exists): 存在true 不存在false
| fs.stat(path, callback)     | 读取文件状态信息 callback(err, stats): stats 是一个 fs.Stats 对象
| fs.watch(filename, [options], [listener])  | 监控指定 路径/文件 的变化，该方法在不同系统中的行为差异较大

#### fs.read(fd, buffer, offset, length, position, callback)

从 `fd` 句柄指向的文件的 `position` 位置读取 `length` 字节的数据，并写入到 `buffer` 的 `offset` 位置。

`callback(err, bytesRead, buffer)`: 分别为错误对象，读取的字节数 和 缓冲区。

#### fs.write(fd, buffer, offset, length[, position], callback)

从 `buffer` 的 `offset` 位置读取 `length` 字节的 buffer, 并向 `fd` 指针指向的文件从 `position`
位置写入内容。

`callback(err, written, buffer)`: `written` specifies how many bytes were written from `buffer`.

Note that it is unsafe to use fs.write multiple times on the same file without waiting for the callback. For this scenario, fs.createWriteStream is strongly recommended.
