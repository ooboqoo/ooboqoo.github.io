# 多线程

因为进程的启动所消耗的时间是非常长的，所以在进程上的进一步的划分就变得非常重要，而且性能也会有所提高。

所有的线程一定要依附于进程才能够存在，那么进程一旦消失了，线程也一定会消失。

> 每一个 JVM 运行就是进程
> 
> 当用户使用 java 命令执行一个类时就表示启动了一个 JVM 的进程，而主方法只是这个进程上的一个线程而已。
> 每个 JVM 进程都至少启动以下两个线程：
>   * main 线程：程序的主要执行，以及启动子线程
>   * gc 线程：负责垃圾收集


## 多线程实现

JDK 从最早开始定义多线程支持时，只有两种实现：要么继承 Thread 类，要么实现 Runnable 接口，JDK1.5 开始又提供了一个新的线程接口：Callable。

从实际的开发角度而言，很明显，使用接口定义的线程类会更加合理，也不会有单继承限制。

> 面试题：请解释多线程的两种实现方式及区别：
>   * 多线程的两种实现方式都需要一个线程的主类，而这个类可以实现 Runnable 接口或继承 Thread 类，不管使用何种方式都必须在子类中覆写 run 方法，此方法为线程的主方法
>   * Thread 类是 Runnable 接口的子类，而且使用 Runnable 接口可以避免单继承局限，并且可以更加方便地实现数据共享。

### 继承 Thread 类

```java
class 类名称 extends Thread {  // 继承 Thread 类
  属性...;
  方法...;
  public void run() {   // 覆写 run 方法，此方法是线程的主体
    线程主体方法;
  }
}
```

所有的线程与进程是一样的，都必须轮流去抢占资源，所以多线程的执行应该是多个线程彼此交替执行。也就是说，如果直接调用 run 方法，并不能启动多线程，多线程启动的唯一方法就是 Thread 类中的 start 方法。

> 为什么不直接调用 run 而是调用 start 方法？  
> 观察 java.lang.Thread 类的 start 源码可以发现，start 方法不仅要启动多线程的执行代码，还要根据不同的操作系统进行资源的分配。同时还可发现，如果某一个线程对象重复进行了启动，会抛出 IllegalThreadStateException 异常。

```java
class MyThread extends Thread {
    private String name;
    public MyThread(String name) { this.name = name; }
    @Override
    public void run() {
        for (int x = 0; x < 500; x++) {
            System.out.println(this.name + " --> " + x);
        }
    }
}

public class Test {
    public static void main(String[] args) {
        MyThread t1 = new MyThread("Thread1");
        MyThread t2 = new MyThread("Thread2");
        MyThread t3 = new MyThread("Thread3");
        t1.start();
        t2.start();
        t3.start();
    }
}
```

### 实现 Runnable 接口

```java
@FunctionalInterface
public interface Runnable {
    public abstract void run();
}
```

```java
public class Thread implements Runnable { }  // Thread 类也是实现了 Runnable 接口的
```

要启动多线程，一定要通过 Thread 类中的 start 方法才可以完成，而 Runnable 接口并没有提供可以被继承的 start 方法，此时可通过 Thread 的一个有参构造方法来实现 `public Thread(Runnable target)`，本方法可以接收一个 Runnable 接口对象。

```java
class MyThread implements Runnable {
    private String name;
    public MyThread(String name) { this.name = name; }
    @Override
    public void run() {
        for (int x = 0; x < 500; x++) {
            System.out.println(this.name + " --> " + x);
        }
    }
}

public class Test {
    public static void main(String[] args) {
        MyThread t1 = new MyThread("Thread1");
        MyThread t2 = new MyThread("Thread2");
        MyThread t3 = new MyThread("Thread3");
        new Thread(t1).start();
        new Thread(t2).start();
        new Thread(t3).start();
    }
}
```

#### 使用 Lambda 表达式操作

```java
public class Test {
    public static void main(String[] args) {
        String name = "线程对象";
        new Thread(() -> {
            for (int x = 0; x < 500; x++) System.out.println(name + " --> " + x);
        }).start();
    }
}
```

### 利用 Callable 接口实现多线程

使用 Runnable 接口实现的多线程会存在一个问题：定义的 run 方法不能返回操作结果。为解决这个问题，JDK1.5 提供了一个新的接口：

```java
@FunctionalInterface
public interface Callable<V> {
  public V call() throws Exception;
}
```

```java
import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;
import java.util.concurrent.ExecutionException;

class MyThread implements Callable<String> {
    private int ticket = 10;
    public String call() throws Exception {
      for (int x = 0; x < 100; x++) {
          if (this.ticket > 0) {
              System.out.print("卖票号" + this.ticket--);
          }
      }
      return "票卖完了，女票要不";
    }
}

public class Test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        MyThread t1 = new MyThread();
        FutureTask<String> task1 = new FutureTask<>(t1);
        FutureTask<String> task2 = new FutureTask<>(t1);
        new Thread(task1).start();
        new Thread(task2).start();
        System.out.println("\n" + task1.get());  // 要放在 start 之后
    }
}

// 输出：卖票号10; 卖票号8; 卖票号7 ... 卖票号9 \n票卖完了，女票要不
```

因为 Thread 类中没有任何构造方法可以接收 Callable 接口对象实例，并且由于需要接收 call 方法的返回值，JDK1.5 提供了 FutureTask 类：

```java
public class FutureTask<V> implements RunnableFuture<V> {
  public FutureTask(Callable<V> callable) { /* 接收 Callable 实例 */ }
  public FutureTask(Runnable runnable, V result) { /* 接收 Runnable 实例 */ }
  public V get() throws InterruptedException, ExecutionException { /* 取得线程操作结果 */ }
}

public interface RunnableFuture<V> extends Runnable, Future<V> { void run(); }
```

### 线程的操作状态

线程一般都具有5种状态，即创建、就绪、运行、堵塞和终止。

1. 新建(new)：新创建了一个线程对象。
2. 就绪(runnable)：调用 start 方法就可以启动线程并进入就绪状态。此时线程进入线程队列排队，等待获取 cpu 使用权。
3. 运行(running)：可运行状态的线程获得了 cpu 时间片(timeslice)，执行程序代码。
4. 阻塞(block)：阻塞状态是指线程因为某种原因放弃了 cpu 使用权，暂时停止运行。阻塞的情况分三种：
  * 等待阻塞：运行的线程执行 wait方法，JVM 会把该线程放入等待队列(waitting queue)中。
  * 同步阻塞：运行的线程在获取对象的同步锁时，若该同步锁被别的线程占用，则 JVM 会把该线程放入锁池(lock pool)中。
  * 其他阻塞：运行的线程执行 sleep 或 join 方法，或者发出了I/O请求时，JVM 会把该线程置为阻塞状态。
5. 终止(dead)：线程 run、main 方法执行结束，或者因异常退出了 run 方法，则该线程结束生命周期。死亡的线程不可复生。


## 多线程常用操作方法

### 线程的命名与取得

由于多线程的状态不确定，所以线程的名字就成为了唯一的分辨标记。定义线程名称时一定要在线程启动前设置，尽量不要重名，且不要去修改已启动线程的名字。

```java
public class Test {
    public static void main(String[] args) {
        new Thread(() -> {
            Thread current = Thread.currentThread();  // public static Thread currentThread()
            System.out.println(current.getName());
            current.setName("线程A");
            System.out.println(current.getName());
        }).start();
    }
}
```

### 线程的休眠

```java
try {
    Thread.sleep(1000);  // 单位 ms
} catch (InterruptedException e) {
    e.printStackTrace();
}
```

### 线程优先级

```java
public static final int MAX_PRIORITY   // 最高优先级，10
public static final int NORM_PRIORITY  // 中等优先级，5
public static final int MIN_PRIORITY   // 最低优先级，1
public final void setPriority(int newPriority)  // 设置线程优先级
public final int getPriority()                  // 取得线程优先级
```

```java
Thread t1 = new MyThread();
t1.setPriority(Thread.MAX_PRIORITY);
t1.start();
```


## 线程的同步与死锁

虽然使用多线程同时处理资源效率要比单线程高许多，但是多个线程如果操作同一个资源一定会存在一些问题，如资源操作的完整性。

### 线程同步、锁

至于怎么用或者原理就不做太多讲述了，只总结了下要注意的点：

1. Java中每个对象都有一个内置锁；当提到同步时，应该清楚在什么上同步？也就是说，在哪个对象上同步？
2. 非静态的synchronized同步方法上时，获得方法所在类的当前实例（this实例）的锁
3. 静态方法同步，需要一个用于整个类对象的锁，这个对象是就是这个类（XXX.class)
4. 如果实例拥有同步和非同步方法，则非同步方法可以被多个线程自由访问而不受锁的限制
5. 线程Sleep时，它所持的任何锁都不会释放
6. 同步损害并发性，应该尽可能缩小同步范围

```java
// 以下两种用法效果一样，只是后一种用法多个压栈的操作
public synchronized int getX() { return x; }
public int getX() { synchronized(this) { return x; } }
```

### 死锁

其实死锁理解起来还是比较容易的，就是：当两个线程或者多个线程在互相等待对方已经锁定的资源时就产生了
通过下面这段代码就比较容易理解了：

```java
public int read() {   
        synchronized (resourceA) {
            // ...
            synchronized (resourceB) {
                // ...
            }
        }
    }
    public void write(int a, int b) {
        synchronized (resourceB) {
            // ...
            synchronized (resourceA) {
                // ...
            }
        }
    }
```

当一个线程执行到read()方法中的第一个“...”，另外一个线程恰好执行到write()方法的第一个“...”时就发生死锁了。


## 经典案例——生产者与消费者

```java
// Object 类对多线程的支持
public final void wait() throws InterruptedException  // 设置线程为等待状态
public final void notify()     // 唤醒第一个等待线程
public final void notifyAll()  // 唤醒全部等待线程，哪个线程的优先级高，哪个线程就有可能先执行
```

```java
class Message {
    private String title;
    private String content;
    private boolean flag = true;  // true 可写不可读；false 可读不可写
    public synchronized void set(String title, String content) {
        if (!flag) try { super.wait(); } catch (InterruptedException e) { e.printStackTrace(); }
        this.title = title;
        try { Thread.sleep(200); } catch (InterruptedException e) { e.printStackTrace(); }
        this.content = content;
        this.flag = false;
        super.notify();
    }
    public synchronized void get() throws InterruptedException {
        if (flag) super.wait();
        Thread.sleep(100);
        System.out.println(title + " --> " + content);
        flag = true;
        super.notify();
    }

}

class Producer implements Runnable {
    private Message msg = null;
    public Producer(Message msg) {this.msg = msg; }
    public void run() {
        for (int x = 0; x < 50; x++) this.msg.set("t" + x, "c" + x);
    }
}

class Consumer implements Runnable {
    private Message msg = null;
    public Consumer(Message msg) {this.msg = msg; } public void run() {
        for (int x = 0; x < 50; x++) {
            try { this.msg.get(); } catch (InterruptedException e) { }
        }
    }
}

public class TestDemo {
    public static void main(String[] args) {
        Message msg = new Message();
        new Thread(new Producer(msg)).start();
        new Thread(new Consumer(msg)).start();
    }
}
```


## 线程的生命周期

大部分线程生命周期的方法基本上都已经学过了，除了 `suspend()` `resume()` `stop()` 这3个方法，这3个方法因为容易产生死锁问题，已经进入弃用阶段。那么我们应如何停止一个线程的执行呢？在多线程的开发中可以通过设置标志位的方式停止一个线程的运行。
