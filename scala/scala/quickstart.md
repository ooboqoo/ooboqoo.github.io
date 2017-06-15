# Scala 快速起步

#### 安装 sbt


sbt repository
搭建完repox以后，需要修改sbt的repository配置
sbt的帮助如下
http://www.scala-sbt.org/0.13/docs/Proxy-Repositories.html

实际可以写成这样

```text
[repositories]
local
my-maven-proxy-releases: http://rnd-mirrors.huawei.com/maven/
```

注:这个文件windows应该放在在类似c:\Users\<用户名>\.sbt\，在linux应该在~/.sbt/目录下，如果不存在这个目录，可以先在任意位置执行一下sbt产生这个目录


maven阿里云中央仓库
maven作为一个项目管理工具确实非常好用，但是在国内这个网络条件下实在是让人恼火。之前oschina的中央仓库可用，现在oschina的maven服务器关了，一直没找到国内镜像来替代。今天发现阿里云公开了一个中央仓库，大家可以试试。

配置
修改maven根目录下的conf文件夹中的setting.xml文件，内容如下：

```xml
  <mirrors>
    <mirror>
      <id>alimaven</id>
      <name>aliyun maven</name>
      <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
      <mirrorOf>central</mirrorOf>        
    </mirror>
  </mirrors>
```

之后就能享受如飞的maven下载速度。

配置国内代理库
感谢 OSChina 提供了 Maven Center 的镜像, 配置添加它有助于提升下载速度.

[repositories]
  local
  oschina:http://maven.oschina.net/content/groups/public/ 
若你知道其他更快的镜像库, 同上配置. 一般互联网企业部署了供内部使用的镜像库(如 nexus ), 也可以配置于此.