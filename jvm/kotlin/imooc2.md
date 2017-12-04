# Kotlin 入门与进阶

## 5.高阶函数


## 6.领域特定语言 DSL

DSL 的概念：只在特定领域使用的语言，如 HTML Gradle SQL 等

DSL 的特点
  * 计算机编程语言
  * 关注某个特定领域

### Gradle Kotlin 脚本



## 7.协程 Coroutines



## 8.Kotlin与Java混合开发

### 基本的互操作行为

属性读写
  * Kotlin自动识别Java Getter/Setter
  * Java操作Kotlin属性通过 Getter/Setter

空安全类型
  * Kotlin空安全类型的原理
  * 平台类型 Platform Type
  * `@Nullable` 和 `@NotNull`

几类函数的调用
  * 包级函数：静态方法
  * 扩展方法：带 Receiver 的静态方法
  * 运算符重载：带 Receiver 的对应名称的静态方法

几个常用注解的使用
  * `@JvmField` 将属性编译为Java变量
  * `@JvmStatic` 将对象的方法编译成Java静态方法
  * `@JvmOverloads` 默认参数生成重载方法
  * `@file:JvmName` 指定Kotlin文件编译后的类名

Noarg 与 AllOpen
  * NoArg 为被标注的类生成无参构造，支持 Jpa 注解，如 `@Entity`
  * AllOpen 为被标注的类去掉 final，允许被继承，支持 Spring 注解，如 `@Component`
  * 支持自定义注解类型

泛型
  * 统配符，Kotlin的 `*` 对应Java的 `?`
  * 协变和逆变 out/in
  * 没有 Raw 类型，Java 的 `List` -&gt; Kotlin 的 `List<*>`

## 9.案例展示



<script>ooboqoo.contentsRegExp = /H[123]/;</script>
