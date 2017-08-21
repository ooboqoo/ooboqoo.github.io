# SBT

### sbt 常用命令

```bash
$ sbt console  # 调出 Scala REPL
$ sbt update   # 更新项目依赖
```

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
# 阿里源
aliyun-maven: http://maven.aliyun.com/nexus/content/groups/public/
# 兼容 Ivy 路径布局，用于下载 sbt 本身，以及 sbt 插件
aliyun-ivy: http://maven.aliyun.com/nexus/content/groups/public/, [organization]/[module]/(scala_[scalaVersion]/)(sbt_[sbtVersion]/)[revision]/[type]s/[artifact](-[classifier]).[ext]
# 国外备用源
typesafe: http://repo.typesafe.com/typesafe/ivy-releases/, [organization]/[module]/(scala_[scalaVersion]/)(sbt_[sbtVersion]/)[revision]/[type]s/[artifact](-[classifier]).[ext], bootOnly
sonatype-oss-releases
maven-central
sonatype-oss-snapshots
```

#### 配置 IDEA

IDEA 可以使用内置 SBT，但这样调整配置不方便，所以配置用刚才装好的
Settings > Build, Execution, Deployment > Build Tools > SBT > Launcher > Custom

### Hello World 项目

```bash
$ sbt new sbt/scala-seed.g8  # 根据模板新建项目，中间提示让输入项目名，这里用 hello
$ cd hello
$ sbt      # 启动 sbt shell
> run      # 运行项目
> exit     # 退出
```

#### 目录结构介绍

```text
| src/
|   main/
|     resources/
|        <files to include in main jar here>
|     scala/
|        <main Scala sources>
|     java/
|        <main Java sources>
|   test/
|     resources
|        <files to include in test jar here>
|     scala/
|        <test Scala sources>
|     java/
|        <test Java sources>
| 
| build.sbt
| project/
    Dependencies.scala
target/

.gitignore

```

.gitignore 文件添加一行 `target/`，尾部带 `/` 意为只排除目录，开头没带 `/` 以便适配 project/target/ 目录

### sbt shell

To leave sbt shell, type exit or use Ctrl+D (Unix) or Ctrl+Z (Windows).

批量模式

```bash
$ sbt clean compile "testOnly TestA TestB"
```

* clean compile testOnly 会依次执行
* testOnly 任务带来两个参数，所以需要用 `""` 将它们括起来，以示区别

持续构建和测试

在命令前加前缀 `~`，可使任务处于监视运行状态，按 `Enter` 可跳出。

```bash
> ~testOnly
```

常用命令

|||
|-------|---|
| clean | Deletes all generated files (in the target directory).
| compile | Compiles the main sources (in src/main/scala and src/main/java directories).
| test | Compiles and runs all tests.
| console | Starts the Scala interpreter with a classpath including the compiled sources and all dependencies. To return to sbt, type :quit, Ctrl+D (Unix), or Ctrl+Z (Windows).
| run argument* | Runs the main class for the project in the same virtual machine as sbt.
| package | Creates a jar file containing the files in src/main/resources and the classes compiled from src/main/scala and src/main/java.
| help command | Displays detailed help for the specified command. If no command is provided, displays brief descriptions of all commands.
| reload  | Reloads the build definition (build.sbt, project/*.scala, project/*.sbt files). Needed if you change the build definition.


### 定义 build.sbt

明确限定 sbt 版本，可确保构建输出的一致性。

project/build.properties

```text
sbt.version=0.13.16
```

build.sbt

```scala
lazy val root = (project in file("."))
  .settings(
    name         := "hello",                // 每一项 setting 都定义为一个 Scala 表达式
    organization := "com.example",
    scalaVersion := "2.12.2",
    version      := "0.1.0-SNAPSHOT"
  )
```








