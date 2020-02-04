# Gradle Build Tool

https://dongchuan.gitbooks.io/gradle-user-guide-/introduction.html  
https://docs.gradle.org/current/userguide/userguide.html

## 概述

### Gradle 安装

https://gradle.org/install#manually

* 下载安装包并解压到 `C:\Gradle`
* 环境变量中添加 `;C:\Gradle\gradle-4.0\bin;`
* 检查配置是否正确 `gradle -v`

## 构建脚本基础

### Projects 和 tasks

每一个构建都是由一个或多个 projects 构成的。每一个 project 是由一个或多个 tasks 构成的。一个 task 代表一些更加细化的构建，可能是编译一些 classes，创建一个 JAR，生成 javadoc，或者生成某个目录的压缩文件。

### Hello World

新建 build.gradle

```text
task hello {
    doLast {
        println 'Hello world!'
    }
}
```

```bash
$ gradle -q hello   # -q 代表 quiet 模式，可屏蔽一些干扰信息
```

上面例子还有一种简写方式，它定义了一个叫做 hello 的任务, 这个任务是一个可以执行的闭包，以前大家都用这种形式，但现在已经不推荐使用了。

```text
task hello << {
    println 'Hello world!'
}
```

### 在 Gradle 任务里使用 Groovy

```text
task upper << {
    String someString = 'mY_nAmE'
    println "Original: " + someString
    println "Upper case: " + someString.toUpperCase()
}

task count << {
    4.times { print "$it " }
}
```

### 任务依赖

```text
task hello {
    doLast { println 'Hello world!'; }
}
task intro(dependsOn: hello) {
    doLast { println "I'm Gradle"; }
}
```

### 动态创建任务

```text
4.times { counter ->
    task "task$counter" {
        doLast { println "I'm task number $counter"; }
    }
}
```

### 使用已经存在的任务

当任务创建之后，它可以通过API来访问。你可以创建额外的依赖，或者你可以给一个已经存在的任务加入行为。

```text
4.times { counter ->
    task "task$counter" << {
        println "I'm task number $counter"
    }
}
task0.dependsOn task2, task3

task hello << {
    println 'Hello Earth'
}
hello.doFirst {  // doFirst 是倒序执行的，写在最后的最先执行
    println 'Hello Venus'
}
hello.doLast {   // doLast 是顺序执行，写在最前面的最先执行
    println 'Hello Mars'
}
hello << {       // << 操作符是 doLast 的简单别称
    println 'Hello Jupiter'
}
```

### 段标记 `$`

有一个短标记 $ 可以访问一个存在的任务. 也就是说每个任务都可以作为构建脚本的属性

```text
task hello {
    println 'Hello world!'
}
hello.doLast {
    println "Greetings from the $hello.name task."
}
```

### 自定义任务属性

你可以给任务加入自定义的属性。

```text
task myTask {
    ext.myProperty = "myValue"
    println(myProperty)
}

task printTaskProperties {
    println myTask.myProperty
}
```

### 调用 Ant 任务

Ant 任务是 Gradle 的一等公民。Gradle 通过 Groovy 出色地集成了 Ant 任务。Groovy 自带了一个 AntBuilder。相比于从一个 build.xml 文件中使用 Ant 任务，在 Gradle 里使用 Ant 任务更为方便和强大。

```text
task loadfile {
    def files = file('../antLoadfileResources').listFiles().sort()
    files.each { File file ->
      // ...
    }
}
```

### 使用方法

```text
task loadfile {
    fileList('../antLoadfileResources').each {File file ->
        ant.loadfile(srcFile: file, property: file.name)
        println "I'm fond of $file.name"
    }
}

File[] fileList(String dir) {
    file(dir).listFiles({file -> file.isFile() } as FileFilter).sort()
}
```

### 默认任务

```text
defaultTasks 'clean', 'run'
task clean { println 'Default Cleaning!' }
task run { println 'Default Running!' }
task other { println "I'm not a default task!" }
```

### 通过 DAG 配置

Gradle 有一个配置阶段和执行阶段。在配置阶段后，Gradle 将会知道应执行的所有任务。Gradle 为你提供一个"钩子"，以便利用这些信息。

```text
task distribution {
    println "We build the zip with version=$version"
}

task release(dependsOn: 'distribution') {
    println 'We release now'
}

gradle.taskGraph.whenReady {taskGraph ->
    if (taskGraph.hasTask(release)) { version = '1.0' }
    else { version = '1.0-SNAPSHOT' }
}
```


## Java 构建入门




## 依赖管理



