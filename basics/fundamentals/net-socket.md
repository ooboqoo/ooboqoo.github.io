# 套接字


### 进程间通信的方式

Linux 六大进程间通信方式：管道、消息队列、共享内存、信号量、socket、信号、文件数锁

管道

匿名管道(Pipe)：在内核中申请一块固定大小的缓冲区，程序拥有写入和读取的权利，一般使用 fork 函数实现父子进程的通信。  
命名管道(Named Pipe)：在内核中申请一块固定大小的缓冲区，程序拥有写入和读取的权利，没有血缘关系的进程之间也可以通信。  
管道的特点：1 面向字节流；2 生命周期随内核；3 自带同步互斥机制；4 半双工，单向通信

信号(Signal)：信号是比较复杂的通信方式，用于通知接受进程有某种事件发生，除了用于进程间通信外，进程还可以发送信号给进程本身。

消息(Message)队列：消息队列是消息的链接表。有足够权限的进程可以向队列中添加消息，被赋予读取权限的进程则可以读走队列中的消息。消息队列克服了信号承载信息量少，管道只能承载无格式字节流以及缓冲区大小受限等缺点。

共享内存：使得多个进程可以访问同一块内存空间，是最快的 IPC 形式。往往与其他通信机制，如信号量结合使用，来达到进程间的同步互斥。

信号量(Semaphore)：主要作为进程间以及同一个进程不同线程之间的同步手段。

套接字(Socket)：更为一般的进程间通信机制，可用于不同机器之间的进程通信。

### 套接字 Socket

#### 关于翻译

Socket 套接字，Context 上下文，Handle 句柄，Macro 宏，等翻译都比较生涩，但都是被普遍接受的翻译。

在计算机领域，CPU Socket 还被翻译为 「插座」，但到软件领域就硬生生改名为「套接字」了。

Socket 是一种进程间通信机制，提供一种供应用程序访问通信协议的操作系统调用，并且通过将 socket 与 Unix 系统文件描述符相整合，使得网络读写数据（或服务调用）和读写本地文件一样容易。此时，按汉语理解，已经具备了「套接」（建立网络通讯或进程间通讯）和「字」（可交互的有序指令串）的概念。

助记：套接管：将两根水管接起来；套接字：将 byte流 套接起来

#### Internet socket

Socket 套接字，是 Linux 跨进程通信 IPC 方式的一种。相比其他 IPC 方式，Socket 更牛的地方在于，它不仅可以做到同一台主机内跨进程通信，还可以在不同主机间跨进程通信。根据通信域的不同可以划分成2种 **UNIX domain socket** 和 **Internet socket**。

通过主机IP可以唯一锁定主机，通过端口可以定位到程序，而进程间通信我们还需要知道通信用的什么协议。这样一来 *IP+端口+协议* 的组合就可以唯一标识网络中一台主机上的一个进程。

Socket 根据通信协议的不同可以分为
* 流式套接字，使用 TCP 协议，提供可靠的、面向连接的通信流
* 数据报套接字，使用 UDP 协议，使用 UDP 协议需要应用程序自己对数据进行校验和排序
* 原始套接字，允许对底层协议如 IP 或 ICMP 直接访问

#### UNIX domain socket

UNIX domain socket 又叫 IPC socket，用于实现同一主机上的进程间通信。Socket 原本是为网络通讯设计的，后来才发展出本地 IPC 机制。虽然 Internet domain socket 也可用于同一台主机的进程间通信（通过 loopback 地址 127.0.0.1），但 UNIX domain socket 用于 IPC 更有效率：不需要经过网络协议栈，不需要打包拆包、计算校验和、维护序号和应答等，只是将应用层数据从一个进程拷贝到另一个进程。这是因为，IPC 机制本质上是可靠的通信，而网络协议是为不可靠的通讯设计的。

UNIX domain socket 是全双工的，API 接口语义丰富，相比其它 IPC 机制有明显的优势，目前已成为使用最广泛的 IPC 机制。

了解 Docker 的同学应该知道 Docker daemon 监听一个 /var/run/docker.sock 文件，这个 Socket 就是一个 UNIX domain socket。

#### Internet socket 实践

https://zhuanlan.zhihu.com/p/234806787

在一切皆文件的 Unix-like 系统中，进程生产的 socket 通过 socket文件 来表示，进程通过向 socket文件 读写内容实现消息的传递。在 Linux 系统中，通常 socket文件 在 `/proc/<pid>/fd/` 文件路径下。启动我们的 socket-server，我们来窥探一下对应的 socket文件。

```go
package main

import (
	"fmt"
	"net"
	"os"
	"strings"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8008" // Default port number if PORT environment variable is not set
	}

	// Create a listener on port 8008
	listener, err := net.Listen("tcp", ":"+port)
	if err != nil {
		fmt.Println("Error listening:", err.Error())
		return
	}
	defer listener.Close()

	fmt.Println("Server listening on 127.0.0.1:8008")

	for {
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println("Error accepting connection:", err.Error())
			break
		}

		fmt.Println("Accepted new connection from:", conn.RemoteAddr().String())

		// Handle the connection in a new goroutine
		go handleConnection(conn)
	}
}

func handleConnection(conn net.Conn) {
	// Close the connection when the function ends
	defer conn.Close()

	for {
		// Read data from the connection
		buffer := make([]byte, 4096)
		n, err := conn.Read(buffer)
		if err != nil {
			fmt.Println("Error reading:", err.Error())
			return
		}

		str := strings.TrimSpace(string(buffer[0:n]))
		args := strings.Split(str, " ")
		switch args[0] {
		case "ping":
			conn.Write([]byte("pong\n"))
		case "echo":
			echoStr := strings.Join(args[1:], " ") + "\n"
			conn.Write([]byte(echoStr))
		case "quit":
			return
		default:
			fmt.Printf("Unsupported command: %s\n", args[0])
		}
	}
}
```

先启动 server，再开一个窗口，我们先查看 server 进程的 pid

```bash
$ lsof -i :8008
COMMAND   PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
socket-de   1 root    3u  IPv6  24931      0t0  TCP *:8008 (LISTEN)
```

可以看到我们的 server pid 为 1，接下来我们来查看下 server 监听的 socket

```bash
$ ls -l /proc/1/fd
total 0
lrwx------ 1 root root 64 Jun 14 12:23 0 -> /dev/null
l-wx------ 1 root root 64 Jun 14 12:23 1 -> 'pipe:[19390]'
l-wx------ 1 root root 64 Jun 14 12:23 2 -> 'pipe:[19391]'
lrwx------ 1 root root 64 Jun 14 12:23 3 -> 'socket:[24931]'
lrwx------ 1 root root 64 Jun 14 12:23 4 -> 'socket:[24940]'          来自 macOS 的 telnet
lrwx------ 1 root root 64 Jun 14 12:23 5 -> 'anon_inode:[eventpoll]'
lr-x------ 1 root root 64 Jun 14 12:23 6 -> 'pipe:[24934]'
l-wx------ 1 root root 64 Jun 14 12:23 7 -> 'pipe:[24934]'
lrwx------ 1 root root 64 Jun 14 12:23 8 -> 'socket:[25162]'          来自容器内的 telnet
```

可以看到/proc/20007/fd/3是一个链接文件，指向socket:[470314]，这个便是server端的socket。socket-server启动经历了socket() --> bind() --> listen()3个过程，创建了这个LISTEN socket用来监听对1208端口的连接请求。

我们知道socket通信需要一对socket：server端和client端。现在我们再开一个窗口，在socket-server的同一台机器上用telnet启动一个client ，来看看client端的socket：

```bash
$ telnet localhost 8008
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
```

继续查看server端口打开的文件描述符；

```bash
$ lsof -i :8008
COMMAND   PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
socket-de   1 root    3u  IPv6  24931      0t0  TCP *:8008 (LISTEN)
socket-de   1 root    4u  IPv6  24940      0t0  TCP 01e0261108e5:8008->172.17.0.1:44216 (ESTABLISHED)  【1】
socket-de   1 root    8u  IPv6  25162      0t0  TCP localhost:8008->localhost:36340 (ESTABLISHED)      【2】
telnet    293 root    3u  IPv4  27835      0t0  TCP localhost:36340->localhost:8008 (ESTABLISHED)
```

1. 来自 macOS 的 telnet 的连接
2. 来自 容器内 telnet 的连接

```bash
root@01e0261108e5:/home/app# ls -l /proc/293/fd
total 0
lrwx------ 1 root root 64 Jun 14 12:28 0 -> /dev/pts/1
lrwx------ 1 root root 64 Jun 14 12:28 1 -> /dev/pts/1
lrwx------ 1 root root 64 Jun 14 12:28 2 -> /dev/pts/1
lrwx------ 1 root root 64 Jun 14 12:28 3 -> 'socket:[27835]'
```

#### UNIX domain socket 实践

https://betterprogramming.pub/about-var-run-docker-sock-3bfd276e12fd

Docker 使用 client-server 架构，用户通过 docker client 输入命令，client 将命令转达给 docker daemon 去执行。docker daemon 会监听一个 UNIX domain socket 来与其他进程通信。

```bash
$ ls -l /var/run/docker.sock
srw-rw---- 1 root docker 0 Aug 31 01:19 /var/run/docker.sock
```

可以看到它的 Linux 文件类型是 “s”，即 socket。通过这个 socket，我们可以直接调用 docker daemon 的 API 进行操作。

```bash
# 以下两者等效: CLI vs 直接调API
$ docker container start <container_id>
$ curl --unix-socket /var/run/docker.sock http://localhost/containers/<container_id>/start
```

另一个 Consul 的例子

```bash
# 正常 Consul agent 会监听 2280 端口
$ curl 'http://127.0.0.1:2280/v1/lookup/name=xxx'

# 如果没有监听 2280 端口，可以直接向 socket 文件发请求（也是 `sd lookup xxx` 用的方式）
$ curl --unix-socket /opt/tmp/sock/consul.sock 'http://127.0.0.1:2280/v1/lookup/name=xxx'
```
