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

// 数组打印
System.out.println(Arrays.toString(array));  // 适用一维数组
Arrays.deepToString(arrayOfArray));  // 适用多维数组，逐层解析

// 常用数组操作
arr.length;
Arrays.sort(arr);
int[] arr2 = Arrays.copyOf(arr, arr.length);
```


