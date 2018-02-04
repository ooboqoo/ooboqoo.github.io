# Hadoop


## CentOS7-Hadoop 测试环境搭建

http://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-common/SingleCluster.html

### Local (Standalone) Mode

https://www.vultr.com/docs/how-to-install-hadoop-in-stand-alone-mode-on-centos-7

```bash
# 改个喜欢的 hostname，重启生效
$ hostnamectl set-hostname hadoop

# 将系统升级到最新 stable 状态
$ yum install epel-release -y
$ yum update -y
$ shutdown -r now

# 安装 Java
$ yum search java | grep 'java-'    # 查看可用包
$ yum install java-1.8.0-openjdk    # 安装 JDK1.8 运行环境
$ yum install java-devel            # 安装开发工具，可选
$ java -version

# 安装 Hadoop
$ wget http://mirrors.tuna.tsinghua.edu.cn/apache/hadoop/common/hadoop-2.7.5/hadoop-2.7.5.tar.gz
$ tar -zxf hadoop-2.7.5.tar.gz -C /usr/local
$ echo "export PATH=/usr/local/hadoop-2.7.5/bin:$PATH" | tee -a /etc/profile
$ source /etc/profile

# 配置 Hadoop
$ cd /usr/local/hadoop-2.7.5/
$ vim etc/hadoop/hadoop-env.sh
    # 找到 export JAVA_HOME=$ 这行并改成
      export JAVA_HOME=$(readlink -f /usr/bin/java | sed "s:bin/java::")
```

通过以上步骤，最简单的 Stand-Alone Mode 测试环境就搭建完成了，来测试下：

The following example copies the unpacked conf directory to use as input and then finds and displays every match of the given regular expression. Output is written to the given output directory.

```bash
$ mkdir ~/source
$ cp /usr/local/hadoop-2.7.5/etc/hadoop/*.xml ~/source
$ hadoop jar /usr/local/hadoop-2.7.5/share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.5.jar grep ~/source ~/output 'dfs[a-z.]+'
$ cat ~/output/*  查看结果
```

### Pseudo-Distributed Mode

etc/hadoop/core-site.xml

```xml
<configuration>
    <property>
        <name>fs.default.name</name>
        <value>hdfs://localhost:9000</value>
    </property>
</configuration>
```

etc/hadoop/hdfs-site.xml

```xml
<configuration>
    <property>
        <name>dfs.replication</name>
        <value>1</value>
    </property>
</configuration>
```

配置文件修改完毕，然后继续：

```bash
$ ssh localhost  # 能通就OK，否则进行一下操作
$ ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa
$ cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
$ chmod 0600 ~/.ssh/authorized_keys
```

下面启动一个本地 MapReduce 作业：

```bash
$ hdfs namenode -format  # 初始格式化
$ sbin/start-dfs.sh      # Start NameNode daemon and DataNode daemon
                         # NameNode - http://localhost:50070/
$ sbin/stop-dfs.sh       # 完成后续实验后可用此脚本停止服务
```

```bash
$ hdfs dfs -mkdir /user
$ hdfs dfs -mkdir /user/<username>    # 实验用 root 替换
$ bin/hdfs dfs -put etc/hadoop input  # 这里的 input 实际为 hdfs://localhost:9000/user/root/input
$ hadoop jar share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.5.jar grep input output 'dfs[a-z.]+'
$ hdfs dfs -get output output; cat output/*  # 先拷到本地再看结果
$ hdfs dfs -cat output/*                     # View the output files on the distributed filesystem
```

### YARN on a Single Node

You can run a MapReduce job on YARN in a pseudo-distributed mode by setting a few parameters and running ResourceManager daemon and NodeManager daemon in addition.

在以上设置的基础上，我们继续往下走：

etc/hadoop/mapred-site.xml

```bash
$ cp etc/hadoop/mapred-site.xml.template etc/hadoop/mapred-site.xml
```

```xml
<configuration>
    <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
</configuration>
```

etc/hadoop/yarn-site.xml

```xml
<configuration>
    <property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
    </property>
</configuration>
```

配置完毕，让 YARN 跑起来 Start ResourceManager daemon and NodeManager daemon:

```bash
$ sbin/start-yarn.sh  # ResourceManager - http://localhost:8088/
$ ... # Run a MapReduce job
$ sbin/stop-yarn.sh
```


## 大数据的相关概念及行业生态

什么是大数据

大数据是一个概念也是一门技术，是在 **以 Hadoop 为代表** 的大数据平台框架上进行各种 **数据分析的技术**。

大数据包括了 **以 Hadoop 和 Spark 为代表** 的基础大数据框架，还包括实时数据处理、离线数据处理；数据分析、数据挖掘和用机器算法进行预测分析等技术。

大数据方向好不好

PC时代 -> 移动互联网 -> 物联网  
PC时代 -> 云计算 -> 大数据

Hadoop 是什么

* 是一个开源的大数据框架
* 是一个分布式计算的解决方案
* Hadoop = HDFS(分布式文件系统) + MapReduce(分布式计算)

Hadoop 核心

* HDFS 分布式文件系统：**存储是大数据技术的基础**
* MapReduce 编程模型：**分布式计算式大数据应用的解决方案**

HDFS

* 普通的成百上千的机器
* 按TB甚至PB为单位的大量的数据
* 简单便捷的文件获取


## Hadoop 的基础原理及其架构

### HDFS 概念

#### 数据块是抽象块

数据块是抽象块而非整个文件作为存储单元

默认大小为 64MB，一般设置为128M，备份x3

#### NameNode

管理文件系统的命名空间，存放文件元数据

维护着文件系统的所有文件和目录，文件与数据块的映射

记录每个文件中各个块所在数据节点的信息

#### DataNode

存储并检索数据块

想 NameNode 更新所存储块的列表

### HDFS 优缺点

#### 优点

适合大文件存储，支持TB、PB级的数据存储，并有副本策略

可以构建在廉价的机器上，并有一定的容错和恢复机制

支持流式数据访问，一次写入，多次读取最高效

#### 缺点

不适合大量小文件存储

不适合并发写入，不支持文件随机修改

不支持随机读等低延时的访问方式

### HDFS 读写流程

#### 写流程

客户端向 NameNode 发起写数据请求

分块写入 DataNode 节点，DataNode 自动完成副本备份

DataNode 向 NameNode 汇报存储完成，NameNode 通知客户端

#### 读流程

客户端向 NameNode 发起读数据请求

NameNode 找出距离最近的 DataNode 节点信息

客户端从 DataNode 分块下载文件


## HDFS 实际操作

常用 HDFS Shell 命令
  * 类 Linux 系统：`ls` `cat` `mkdir` `rm` `chmod` `chown` 等
  * HDFS 文件交互：`copyFromLocal` `copyToLocal` `get` `put`

```bash
$ hdfs dfs --help


```


## MapReduce 程序开发实例


