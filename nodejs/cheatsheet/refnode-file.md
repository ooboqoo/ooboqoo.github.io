# File &amp; Buffer &amp; Stream


## Buffer 缓冲



## Stream 流


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
| fs.readdir(path, callback)  | 读取 path 目录内容, 获取的 `files` 数组不含 `'.'` 和 `'..'`
| fs.exists(path, callback)   | 已废弃，使用 `fs.stat()` 或 `fs.access()` 替代。<span class="marker">注</span>
| fs.stat(path, callback)     | 读取文件状态信息, 获取的 `stats` 是一个 `fs.Stats` 对象
| fs.access(path[, mode], callback) | 
| fs.watch(filename[, options][, listener])  | 监控指定 路径/文件 的变化，该方法在不同系统中的行为差异较大

|||
|------------------------------------------|--------------------
| fs.mkdir(path[, mode], callback)         | 
| fs.link(existingPath, newPath, callback) | 

fs.chmod(path, mode, callback)
fs.fchmod(fd, mode, callback)
fs.lchmod(path, mode, callback)



|||
|-----------------------------|--------------------------------------------------------------------------------
| stats.size      | 
| stats.birthtime | "Birth Time"
| stats.mtime     | "Modified Time"
| stats.ctime     | "Change Time"
| stats.atime     | "Access Time"
|||
| stats.isDirectory()    | 
| stats.isFile()         | 
| stats.isSocket()       | 
| stats.isSymbolicLink() | 





注：在读写操作前不应该去检查文件是否存在，因为即使检查了，当实际操作时还是可能已经改变了状态。


#### fs.read(fd, buffer, offset, length, position, callback)

从 `fd` 句柄指向的文件的 `position` 位置读取 `length` 字节的数据，并写入到 `buffer` 的 `offset` 位置。

`callback(err, bytesRead, buffer)`: 分别为错误对象，读取的字节数 和 缓冲区。

#### fs.write(fd, buffer, offset, length[, position], callback)

从 `buffer` 的 `offset` 位置读取 `length` 字节的 buffer, 并向 `fd` 指针指向的文件从 `position`
位置写入内容。

`callback(err, written, buffer)`: `written` specifies how many bytes were written from `buffer`.

Note that it is unsafe to use fs.write multiple times on the same file without waiting for the callback. For this scenario, fs.createWriteStream is strongly recommended.




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
