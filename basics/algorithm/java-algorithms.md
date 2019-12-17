# 数据结构与算法 (Java 实现)

> 学习底层算法时 C 有优势，纯粹的一步步内存操作，更直观、更接近硬件现场；  
> 但当需要封装一些数据结构时，不搞个类就感觉很难受，这时 Java 的面向对象就体现出优势了。


## 数组



## 链表



## 栈



## 队列

```java
// 用数组实现的队列
public class ArrayQueue {
  private String[] items;  // 数组
  private int n = 0;       // 数组大小
  private int head = 0;    // 队头下标
  private int tail = 0;    // 队尾下标

  public ArrayQueue(int capacity) {
    items = new String[capacity];
    n = capacity;
  }

  public boolean enqueue(String item) {
    if (tail == n) return false;  // 队列已经满
    items[tail++] = item;
    return true;
  }

  public String dequeue() {
    if (head == tail) return null;  // 队列为空
    return items[head++];
  }
}
```

```java
// 用数组实现循环队列
public class CircularQueue {
  private String[] items;  // 数组
  private int n = 0;       // 数组大小
  private int head = 0;    // 队头下标
  private int tail = 0;    // 队尾下标

  public CircularQueue(int capacity) {
    items = new String[capacity];
    n = capacity;
  }

  public boolean enqueue(String item) {
    if ((tail + 1) % n == head) return false;  // 队列满了(为了实现队满的判断，循环队列会浪费一个数组元素)
    items[tail] = item;
    tail = (tail + 1) % n;
    return true;
  }

  public String dequeue() {
    if (head == tail) return null;
    String ret = items[head];
    head = (head + 1) % n;
    return ret;
  }
}
```



