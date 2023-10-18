# Docker

视频教程 https://www.youtube.com/watch?v=fqMOX6JJhGo  
官方教程 https://docs.docker.com/get-started/


## 安装

### OrbStack

https://orbstack.dev/

比 Docker Desktop 快非常多，更省资源，但目前还在 Beta 阶段，然后未来会收费。

注：安装 OrbStack 后 docker 命令会被替换。


### macOS

下载 [Docker Desktop for Mac](https://hub.docker.com/editions/community/docker-ce-desktop-mac) 并安装。

```bash
# 也可以使用 brew cask 安装
$ brew cask install docker
```

### 配置阿里云 Registry

登录阿里云容器镜像服务 https://cr.console.aliyun.com/ 获取加速器地址 https://00f97hsa.mirror.aliyuncs.com

_~/.docker/daemon.json_

```json
{"registry-mirrors": ["https://00f97hsa.mirror.aliyuncs.com"]}
```


## Docker vs VM

<img src="./images/docker-vs-vm.png" width=642>

Docker 是一种隔离系统（命名空间技术），而不是虚拟系统（需要转换 CPU 指令），所以性能很好。

虚拟机的 Hypervisor(虚拟化软件) 通过硬件虚拟化功能，模拟出了运行一个操作系统需要的各种硬件，如 CPU、内存、I/O设备 等。虚拟机必须安装一个完整的操作系统才能执行用户的应用进程。

类别     | Docker | VM
--------|-----------------|----------------
部署难度 | 非常简单          | 组件多，部署复杂
启动速度 | 秒级             | 分钟级
执行性能 | 和物理系统几乎一致 | VM 会占用一些资源
镜像体积 | MB级别           | GB 级别
管理效率 | 管理简单          | 组件互相依赖，管理复杂
隔离性   | 隔离性高          | 彻底隔离
可管理性 | 单进程            | 完整的系统管理
网络连接 | 比较弱            | 完善
|||
隔离级别 | 进程级            | 操作系统级
隔离策略 | Cgroups          | Hypervisor
系统资源 | 0~5%             | 5~15%
集群规模 | 上万             | 上百
高可用策略 | 弹性、负载、动态 | 备份、容灾、迁移

### Docker 原理

Docker 等 Linux 容器技术，采用 Cgroup 对进程制造约束，采用 Namespace 对进程进行视图修改。

容器的本质：一个正在运行的 Docker 容器其实就是一个启用了多个 Linux Namespace 的应用进程。这个进程能够使用的资源量受 Cgroup 配置的限制。一个容器的本质就是一个进程，用户的应用进程则是容器里 PID=1 的进程，即容器进程的子进程。

#### Cgroups

https://man7.org/linux/man-pages/man7/cgroups.7.html


Control groups, usually referred to as cgroups, are a Linux kernel feature which allow processes to be organized into hierarchical groups whose usage of various types of resources can then be limited and monitored.  The kernel's cgroup interface is provided through a pseudo-filesystem called cgroupfs.  Grouping is implemented in the core cgroup kernel code, while resource tracking and limits are implemented in a set of per-resource-type subsystems (memory, CPU, and so on).

Cgroups 的全称是 Linux control groups，它最主要的作用就是限制一个进程组能够使用的资源上限，包括 CPU、内存、硬盘、带宽等，`/sys/fs/cgroup` 下面又很多诸如 cpuset、cpu、memory 这样的子目录，也叫子系统。

Cgroups 是 Linux 内核的一个功能，用来限制、控制与分离一个进程组的资源。

Cgroups 对资源的限制能力有很多不完善的地方，被提及最多的自然是 `/proc` 文件系统的问题。`/proc` 下存储的是记录当前内核运行状态的一系列特殊文件，用户可以通过访问这些文件查看系统以及当前正在运行的进程的信息，如 CPU 使用情况、内存占用率 等。当你在容器内执行 `top` 指令时，看到的是宿主机的 CPU 和内存数据，而不是当前容器的数据。





## 概述

docker 本质就是宿主机的一个进程，通过 namespace 实现资源隔离，通过 cgroup 实现资源限制。




我们为什么需要 docker
* 开多个容器约等于开了多个进程，资源占用非常少
* 对本地环境无污染
* 想尝鲜新项目，拉个镜像直接开干，避免本地繁琐配置
* docker 的优势还是在于环境移植到多个服务器上

特点
* 灵活：应用集装箱化
* 轻量：容器共享主机内核
* 可互换：
* 便携式：本地构建，在任何地方运行
* 可扩展：可增加并分发容器副本
* 可堆叠：可垂直和即时堆叠服务

四大功能：

* 资源限制：可以对任务使用的资源总额进行限制
* 优先级分配：通过分配的cpu时间片数量以及磁盘IO带宽大小，实际上相当于控制了任务运行优先级
* 资源统计：可以统计系统的资源使用量，如cpu时长，内存用量等
* 任务控制：cgroup可以对任务执行挂起、恢复等操作

docker改变了什么

* 面向产品：产品交付
* 面向开发：简化环境配置
* 面向测试：多版本测试
* 面向运维：环境一致性
* 面向架构：自动化扩容（微服务）

Docker architecture

Docker uses a client-server architecture. The Docker client and daemon communicate using a REST API, over UNIX sockets or a network interface. Another Docker client is Docker Compose.

host 宿主机    registry 仓库  daemon 守护程序  client 客户端

### Dokcer objects

* image 镜像
* container 容器
* network 网络
* volume 卷
* plugin 插件




## 数据持久化





## 教学


Docker 不隔离计算（Docker 容器中的进程是真实的进程，这和虚拟机不同），只隔离环境（文件系统、网络等）

Docker 将自己直接嫁接在操作系统上，Docker 中的进程是真实的进程，使用的文件系统也是真实的文件系统（只不过做了隔离，用的是真实的磁盘而不是虚拟的磁盘）。

```bash
docker run -d -p 80:80 docker/getting-started
  # -d  detach 后台运行
  # -p  port   指定端口映射
  # -d -p 这些缩写的参数可以进一步合并为 -dp
```

**容器 container**

Simply put, a container is simply another process on your machine that has been isolated from all other processes on the host machine. That isolation leverages kernel namespaces and cgroups, features that have been in Linux for a long time.

**镜像 image**

When running a container, it uses an isolated filesystem. This custom filesystem is provided by a container image. Since the image contains the container's filesystem, it must contain everything needed to run an application - all dependencies, configuration, scripts, binaries, etc. The image also contains other configuration for the container, such as environment variables, a default command to run, and other metadata.

We'll dive deeper into images later on, covering topics such as layering, best practices, and more.




## 多容器编排 Docker Compose

https://github.com/docker/compose

https://github.com/nodejs/docker-node/blob/main/README.md#how-to-use-this-image




## Docker Swarm

Kubernetes is the successor of Docker Swarm.



