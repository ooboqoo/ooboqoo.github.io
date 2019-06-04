# Docker


## 速查手册

```bash
#
$ docker login
$ docker logout

# 镜像管理
$ docker pull
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








