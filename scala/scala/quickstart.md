# Scala 快速起步

### 安装 sbt

#### 下载并安装 sbt

http://www.scala-sbt.org/0.13/docs/Installing-sbt-on-Windows.html

下载安装并配置 PATH 变量。

```bash
$ sbt console  # 调出 Scala REPL
```

#### 修改 repository 配置

http://www.scala-sbt.org/0.13/docs/Proxy-Repositories.html

在用户目录下创建 `.sbt/repositories` 文件，内容如下：

```text
[repositories]
local
aliyun: http://maven.aliyun.com/nexus/content/groups/public/
aliyun-ivy: http://maven.aliyun.com/nexus/content/groups/public/, [organization]/[module]/(scala_[scalaVersion]/)(sbt_[sbtVersion]/)[revision]/[type]s/[artifact](-[classifier]).[ext]
```

#### 配置 IDEA

IDEA 可以使用内置 SBT，但这样调整配置不方便，所以配置用刚才装好的
Settings > Build, Execution, Deployment > Build Tools > SBT > Launcher > Custom


