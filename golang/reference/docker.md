# Docker


## 应用示例

```bash
docker pull node:18                       # 拉镜像
docker run -d --name mysql mysql:latest   # 启容器
docker exec -it <container_name> bash     # 登录容器内部进行操作

docker run --name mongodb -d -p 27017:27017 -v my-mongo-data:/data/db mongo:6
```

### Hello World

```bash
# 在 ubuntu 容器中运行 `echo hello docker` 命令
$ docker run ubuntu echo hello docker
```

### 搭建一个 Nginx 容器

```bash
$ docker run -p 8080:80 -d my/nginx

# 修改容器内容
$ docker cp index.html <container_id>:/usr/share/nginx/html  # 此时再访问能看到修改效果
$ docker stop <container_id>  # 停止容器运行
$ docker run -p 8080:80 -d my/nginx  # 此时再访问，发现刚才修改的内容丢失了
$ docker cp index.html <container_id>:/usr/share/nginx/html  # 重复修改动作
$ docker ps  # 查看容器ID
$ docker commit -m <msg> <container_id> <image_name> # 提交修改，即保存新的容器镜像状态
$ docker rmi <image_id>  # 删除新创建的容器镜像
```


## 常用命令

```bash
search      Search Docker Hub for images
version     Show the Docker version information
inspect     Return low-level information on Docker objects

volume      Manage volumes
    inspect     Display detailed information on one or more volumes
    ls          List volumes
    prune       Remove all unused local volumes
network     Manage networks
    ls          List networks
```

`docker system xxx`

```bash
events      `system events` Get real time events from the server 实时打印系统事件，如 容器启动 等
info        `system info` Display system-wide information

system Manage Docker
    df          Show docker disk usage
    prune       Remove unused data
    info        Display system-wide information
    events      Get real time events from the server
```

`docker image xxx`

```bash
images     `image list`
rmi        `image remove`
pull       `image pull`
push       `image push`

build      `image build`
commit     `container commit`
save       `image save`
tag        `image tag`

image       Manage images
    build       Build an image from a Dockerfile
    history     Show the history of an image
    inspect     Display detailed information on one or more images
    ls,list     List images
    prune       Remove unused images
    pull        Pull an image or a repository from a registry
    push        Push an image or a repository to a registry
    rm,remove   Remove one or more images
```

`docker container xxx`

```bash
ps          `container ps,ls,list`
rm          `container rm,remove`
rename      `container rename`

run         `container run`
create      `container create`
restart     `container restart`
pause       `container pause`
unpause     `container unpause`
stop        `container stop`
wait        `container wait`

logs        `container logs`
top         `container top`

stats       `container stats`
diff        `container diff` 容器跑起来后更改了哪些文件
port        `container port`

cp          `container cp`
exec        `container exec`
attach      `container attach`

container   Manage containers
    ls,list,ps  List containers
    rm,remove   Remove one or more containers

    attach      Attach local standard input, output, and error streams to a running container
    commit      Create a new image from a container‘s changes
    cp          Copy files/folders between a container and the local filesystem
    create      Create a new container
    diff        Inspect changes to files or directories on a container‘s filesystem
    exec        Run a command in a running container
    export      Export a container‘s filesystem as a tar archive
    inspect     Display detailed information on one or more containers
    kill        Kill one or more running containers
    logs        Fetch the logs of a container
    pause       Pause all processes within one or more containers
    port        List port mappings or a specific mapping for the container
    prune       Remove all stopped containers
    rename      Rename a container
    restart     Restart one or more containers
    run         Run a command in a *new* container
    start       Start one or more stopped containers
    stats       Display a live stream of container(s) resource usage statistics
    stop        Stop one or more running containers
    top         Display the running processes of a container
    unpause     Unpause all processes within one or more containers
    update      Update configuration of one or more containers 改配置，一般用不到
    wait        Block until one or more containers stop, then print their exit codes
```

容器内常用操作

```bash
# Debian
$ apt update && apt install -y vim

# CentOS
$ yum install -y vim
```


## Dockerfile

https://www.runoob.com/docker/docker-dockerfile.html  
https://docs.docker.com/engine/reference/builder/  

||||
|---------------|------------------------------|-----------------------------------------
| `FROM`        | 指定基础镜像，用于后续的指令构建   | `FROM <image>[:<tag>] [AS <name>]`
| `LABEL`       | 添加镜像的元数据，使用键值对的形式 | `LABEL <key>=<value> <key>=<value> ...`
| `EXPOSE`      | 声明容器运行时监听的特定网络端口   | `EXPOSE <port> [<port>/<protocol>...]`
| `ENV`         | 在容器内部设置环境变量           | `ENV <key>=<value> ...`
| `VOLUME`      | 为容器创建挂载点或声明卷          | `VOLUME ["/abc", "/def", ...]`
||||
| `ARG`         | 定义在构建过程中传递给构建器的变量  | `ARG <name>[=<default value>]`
| `SHELL`       | 指定 shell，影响 RUN, ENTRYPOINT, CMD | `SHELL ["executable", "parameters"]`
| `WORKDIR`     | 设置后续指令的工作目录            | `WORKDIR /path/to/workdir`
| `USER`        | 指定后续指令的用户上下文          | `USER <user>[:<group>]`
||||
| `COPY`        | 将文件或目录复制到镜像中
| `ADD`         | 将文件、目录或远程 URL 复制到镜像中
| `RUN`         | 构建时在镜像中执行命令并提交
||||
| `ENTRYPOINT`  | 设置容器创建时的主要命令（不可被覆盖）
| `CMD`         | 指定容器创建时的默认命令（可以被覆盖）
||||
| `ONBUILD`     | 当该镜像被用作另一个构建过程的基础时，添加触发器
| `STOPSIGNAL`  | 设置发送给容器以退出的系统调用信号
| `HEALTHCHECK` | 定义周期性检查容器健康状态的命令

```sh
# Comment
INSTRUCTION arguments
```

Minimize the number of layers

* Only the instructions `RUN`, `COPY`, and `ADD` create layers. Other instructions create temporary intermediate images, and don't increase the size of the build.
* Where possible, use [multi-stage builds](https://docs.docker.com/build/building/multi-stage/), and only copy the artifacts you need into the final image. This allows you to include tools and debug information in your intermediate build stages without increasing the size of the final image.

### LABEL

Strings with spaces must be quoted or the spaces must be escaped. Inner quote characters ("), must also be escaped.

An image can have more than one label. Prior to Docker 1.10, it was recommended to combine all labels into a single `LABEL` instruction, to prevent extra layers from being created. This is no longer necessary, but combining labels is still supported.

### ENV

To make new software easier to run, you can use `ENV` to update the PATH environment variable for the software your container installs. For example, `ENV PATH=/usr/local/nginx/bin:$PATH` ensures that `CMD ["nginx"]` just works.

```sh
# use a RUN command with shell commands, to set, use, and unset the variable all in a single layer
RUN export ADMIN_USER="mark" \
    && echo $ADMIN_USER > ./mark \
    && unset ADMIN_USER
```

### VOLUME

`docker run` 中的 `-v` 参数用于将宿主机目录绑定到容器中的目录，以便将容器中的数据直接保存在宿主机上。另外，还可以利用这一特性实现多容器共享同一份文件。

Dockfile 中的 `VOLUME` 指令则用于声明容器中的目录作为匿名卷。我们在 `docker run -v` 时可以将 `VOLUME` 中声明的匿名卷绑定到宿主机的具体目录，如果没指定，则系统会自动分配目录名。

Dockerfile 中使用 `VOLUME` 声明的主要目的，就是为了避免用户 `docker run` 时忘记指定 `-v`，导致删除容器时将数据也删除了。主要用于数据库这种需要持久化数据到磁盘的应用。

```sh
docker image inspect mongo:6  # "Volumes": { "/data/configdb": {}, "/data/db": {} }
docker run --name mongodb -d -p 27017:27017 -v my-mongo-data:/data/db mongo:6
```

### ADD and COPY

Although `ADD` and `COPY` are functionally similar, generally speaking, `COPY` is preferred. That’s because it’s more transparent than `ADD`. `COPY` only supports the basic copying of local files into the container, while `ADD` has some features (like local-only tar extraction and remote URL support) that are not immediately obvious. Consequently, the best use for `ADD` is local tar file auto-extraction into the image, as in `ADD rootfs.tar.xz /`.

上下文路径: `COPY` 中使用相对路径时，是基于 context folder 的。一般 Dockerfile 也位于 context folder 内，否则需要使用 `-f <path/to/Dockerfile>` 指定。

```bash
# docker build [OPTIONS] PATH | URL | -
docker build -f path/to/Dockerfile -t my-image path/to/build-context
```

### RUN

```sh
RUN <command>                           # shell form, the command is run in a shell
RUN ["executable", "param1", "param2"]  # exec form
```

Split long or complex `RUN` statements on multiple lines separated with backslashes to make your Dockerfile more readable, understandable, and maintainable.

Dockfile 的指令，每执行一次都会在 image 上新建一层，过多无意义的层会造成镜像膨胀过大。`RUN` 指令可通过 `&&` 合并多条命令以压缩层数量。

```sh
# Always combine `apt update` with `apt install` in the same RUN statement.
# Using `apt update` alone in a RUN statement causes caching issues and subsequent `apt install` to fail.
RUN apt-get update && apt-get install -y \
    package-bar \
    package-baz \
    package-foo=1.3.*
```

### CMD

```sh
CMD ["executable","param1","param2"]  # exec form, this is the preferred form
CMD ["param1","param2"]               # as default parameters to ENTRYPOINT
CMD command param1 param2             # shell form
```

The main purpose of a `CMD` is to provide defaults for an executing container. These defaults can include an executable, or they can omit the executable, in which case you must specify an `ENTRYPOINT` instruction as well.

