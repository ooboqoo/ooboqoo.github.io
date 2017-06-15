# Java 开发环境搭建

## 安装 JDK

### 下载并安装

### 配置环境变量

新建 `JAVA_HOME` 值 `D:\Program Files\Java\jdk1.8.0_131`

`Path` 变量添加条目 `%JAVA_HOME%\bin`

新建 `CLASSPATH` 值 `.;%JAVA_HOME%\lib`

### HelloWorld

```bash
$ vim HellWorld.java    # 文件名与类名必须相同
$ javac HellWorld.java
$ java HelloWorld       # 不能带后缀
```

```java
public class HelloWorld {
        public static void main(String[] args) {
                System.out.println("welcom to imooc!");
        }
}
```

### 使用 Eclipse 开发

- 创建项目
- 创建程序包
- 编写源程序
- 运行程序




