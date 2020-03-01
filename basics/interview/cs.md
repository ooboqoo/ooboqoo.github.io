# 计算机基础

### 进程间通信的方式

Linux 六大进程间通信方式：管道、消息队列、共享内存、信号量、socket、信号、文件数锁

管道

匿名管道(Pipe)：在内核中申请一块固定大小的缓冲区，程序拥有写入和读取的权利，一般使用 fork 函数实现父子进程的通信。  
命名管道(Named Pipe)：在内核中申请一块固定大小的缓冲区，程序拥有写入和读取的权利，没有血缘关系的进程之间也可以通信。  
管道的特点：1 面向字节流；2 生命周期随内核；3 自带同步互斥机制；4 半双工，单向通信

信号(Signal)：信号时比较复杂的通信方式，用于通知接受进程又某种事件发生，除了用于进程间通信外，进程还可以发送信号给进程本身。

消息(Message)队列：消息队列是消息的链接表。有足够权限的进程可以向队列中添加消息，被赋予读取权限的进程则可以读走队列中的消息。消息队列克服了信号承载信息量少，管道只能承载无格式字节流以及缓冲区大小受限等缺点。

共享内存：使得多个进程可以访问同一块内存空间，是最快的 IPC 形式。往往与其他通信机制，如信号量结合使用，来达到进程间的同步互斥。

信号量(Semaphore)：主要作为进程间以及同一个进程不同线程之间的同步手段。

套接字(Socket)：更为一般的进程间通信机制，可用于不同机器之间的进程通信。




