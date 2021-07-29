# Docker

视频教程 https://www.youtube.com/watch?v=fqMOX6JJhGo  
官方教程 https://docs.docker.com/get-started/


## 速查手册

```bash
docker pull mysql                         # 拉镜像
docker run --name mysql2 -d mysql:latest  # 启容器
docker ps                                 # 查看容器列表
```


```bash
#
$ docker login
$ docker logout

# 镜像管理
$ docker pull <image_name>
$ docker commit  # 保存改动生成新镜像
$ docker push

$ docker build


$ docker images  # 查看镜像列表
$ docker ps      # 查看容器列表
$ docker top
$ docker stats


$ docker rmi  # 删除镜像


# 容器管理
$ docker start
$ docker stop
$ docker restart
$ docker rm   # 删除容器

$ docker create

$ docker attach  # Attach local standard input, output, and error streams to a running container

$ docker kill  # 杀死一个或多个容器
$ docker pause
$ docker logs  # 查看某个容器的日志

# 其他
$ docker cp  # 在容器和宿主机之间拷贝文件或目录

$ docker exec  # 在某个容器中运行命令
```


## 安装

### macOS

下载 [Docker Desktop for Mac](https://hub.docker.com/editions/community/docker-ce-desktop-mac) 并安装。或者：

```bash
$ brew cask install docker
```

### 配置阿里云 Registry

登录阿里云容器镜像服务 https://cr.console.aliyun.com/ 获取加速器地址 https://00f97hsa.mirror.aliyuncs.com

### Hello World

```bash
# 在 ubuntu 容器中运行 `echo hello docker` 命令
$ docker run ubuntu echo hello docker
```

### 搭建一个 Nginx 容器

```bash
# 
$ docker run -p 8080:80 -d my/nginx

# 修改容器内容
$ docker cp index.html <container_id>://usr/share/nginx/html  # 此时再访问能看到修改效果
$ docker stop <container_id>  # 停止容器运行
$ docker run -p 8080:80 -d my/nginx  # 此时再访问，发现刚才修改的内容丢失了
$ docker cp index.html <container_id>://usr/share/nginx/html  # 重复修改动作
$ docker ps  # 查看容器ID
$ docker commit -m <msg> <container_id> <image_name> # 提交修改，即保存新的容器镜像状态
$ docker rmi <image_id>  # 删除新创建的容器镜像
```




## Registry

host 宿主机  image 镜像  container 容器  registry 仓库  daemon 守护程序  client 客户端



## 数据持久化



## 多容器编排



## 教学


Docker 不隔离计算（Docker 容器中的进程是真实的进程，这和虚拟机不同），只隔离环境（文件系统、网络等）

Docker 将自己直接嫁接在操作系统上，Docker 中的进程是真实的进程，使用的文件系统也是真实的文件系统（只不过做了隔离，用的是真实的磁盘而不是虚拟的磁盘）。

Docker 是一种隔离系统（命名空间技术），而不是虚拟系统（需要转换 CPU 指令），所以性能很好。



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









