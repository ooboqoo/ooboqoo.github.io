# Java 代码片段

### Java 数组操作

```java
// 仅声明数组变量
String[] arr;
int[] arr;

// 声明并初始化数组变量
String[] arr = {"曹操", "刘备", "孙权"};
int[] arr = new int[3];    // 只指定长度
int[] arr = {1, 5, 9, 8};  // 实际赋值

arr.length;
Arrays.sort(arr);
System.arraycopy(src, srcPos, dest, destPos, length);  // 最常用的数组复制方法
arr2 = (int[])arr.clone();  // 继承自 Object.clone
```

