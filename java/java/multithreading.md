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
        MyThread t1 = new MyThread();                     // 一个票池
        FutureTask<String> task1 = new FutureTask<>(t1);
        FutureTask<String> task2 = new FutureTask<>(t1);
        new Thread(task1).start();                        // 两个窗口同时售票
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

> `sleep()` 与 `wait()` 方法的区别：
> 
  * `sleep()` 使当前线程进入 BLOCKED 状态，将执行机会给其他线程，睡眠时保持对象锁，时间到后自动恢复。阻塞是相对**CPU时间片**的概念。
  * `wait()` 应用于线程同步场景，必须放在 synchronized block 中，通过 `super.wait()` 调用，让出对象锁，等待其他线程用完对象锁后通过 `super.notify()` 或 `super.notifyAll` 来唤醒。等待是相对**资源锁**的概念。

虽然使用多线程同时处理资源效率要比单线程高许多，但是多个线程如果操作同一个资源一定会存在一些问题，如资源操作的完整性。

1. Java 中每个对象都有一个内置锁；当提到同步时，应该清楚在哪个对象上同步。
2. 非静态同步方法，获得方法所在类当前实例(this)的锁。
3. 静态同步方法，需要一个用于整个类对象的锁，这个对象就是这个类(XXX.class)。
4. 如果实例拥有同步和非同步方法，则非同步方法可以被多个线程自由访问而不受锁的限制。
5. 线程 sleep 时，它所持的任何锁都不会释放。
6. 同步损害并发性，应该尽可能缩小同步范围。

### 理解"线程同步"与"锁"

Java 中每个对象都有一个内置锁，用于线程见的同步控制。

打个比方：一个对象就像一个大房子，大门永远打开。房子里有很多房间(也就是方法)。这些房间有上锁的(synchronized方法)，和不上锁之分(普通方法)。房门口放着一把钥匙(key)，这把钥匙可以打开所有上锁的房间。另外我把所有想调用该对象方法的线程比喻成想进入这房子某个房间的人。

一个人想进入某间上了锁的房间，他来到房子门口，看见钥匙在那儿(说明暂时还没有其他人要使用上锁的房间)。于是他走上去拿到了钥匙，并且按照自己的计划使用那些房间。注意一点，他每次使用完一次上锁的房间后会马上把钥匙还回去。即使他要连续使用两间上锁的房间，中间他也要把钥匙还回去，再取回来。因此，普通情况下钥匙的使用原则是：“随用随借，用完即还。”

这时其他人可以不受限制的使用那些不上锁的房间，没限制。但是如果当某个人想要进入上锁的房间，他就要跑到大门口去看看了。有钥匙当然拿了就走，没有的话，就只能等了。

要是很多人在等这把钥匙，等钥匙还回来以后，谁会优先得到钥匙？Not guaranteed。象前面例子里那个想连续使用两个上锁房间的家伙，他中间还钥匙的时候如果还有其他人在等钥匙，那么没有任何保证这家伙能再次拿到。

Java 规范在很多地方都明确说明不保证，像 Thread.sleep() 休息后多久会返回运行，相同优先权的线程哪个首先被执行，当要访问对象的锁被释放后处于等待池的多个线程哪个会优先得到，等等。我想最终的决定权是在JVM，之所以不保证，就是因为JVM在做出上述决定的时候，绝不是简简单单根据一个条件来做出判断。学过计算机的都知道，计算机里随机数的学名是伪随机数，是人运用一定的方法写出来的，看上去随机罢了。

### 同步代码块与同步方法

```java
public synchronized int getX() { return x; }            // 修饰方法时，被锁的是当前对象，无法更改
public int getX() { synchronized(this) { return x; } }  // 修饰代码块时，可自由设置被锁对象
```

从尺寸上讲，同步代码块比同步方法小。你可以把同步代码块看成是没上锁房间里的一块用带锁的屏风隔开的空间。

同步代码块还可以人为的指定获得某个其它对象的key。就像是指定用哪一把钥匙才能开这个屏风的锁，你可以用本房的钥匙；你也可以指定用另一个房子的钥匙才能开，这样的话，你要跑到另一栋房子那儿把那个钥匙拿来，并用那个房子的钥匙来打开这个房子的带锁的屏风。

为什么要使用同步代码块呢？我想应该是这样的：首先对程序来讲同步的部分很影响运行效率，而一个方法通常是先创建一些局部变量，再对这些变量做一些操作，如运算，显示等等；而同步所覆盖的代码越多，对效率的影响就越严重。因此我们通常尽量缩小其影响范围。

另外，同步代码块可以指定钥匙这一特点有个额外的好处，是可以在一定时期内霸占某个对象的key。还记得前面说过普通情况下钥匙的使用原则吗。现在不是普通情况了。你所取得的那把钥匙不是永远不还，而是在退出同步代码块时才还。

还用前面那个想连续用两个上锁房间的家伙打比方。怎样才能在用完一间以后，继续使用另一间呢。用同步代码块吧。先创建另外一个线程，做一个同步代码，把那个代码块的锁指向这个房子的钥匙。然后启动那个线程。只要你能在进入那个代码块时抓到这房子的钥匙，你就可以一直保留到退出那个代码块。也就是说你甚至可以对本房内所有上锁的房间遍历，甚至再 `sleep(10*60*1000)`，而房门口却还有 1000 个线程在等这把钥匙呢。很过瘾吧。

在此对 sleep() 方法和钥匙的关联性讲一下。一个线程在拿到 key 后，且没有完成同步的内容时，如果被强制 sleep() 了，那 key 还一直在它那儿。直到它再次运行，做完所有同步内容，才会归还 key。记住，那家伙只是干活干累了，去休息一下，他并没干完他要干的事。为了避免别人进入那个房间把里面搞的一团糟，即使在睡觉的时候他也要把那唯一的钥匙戴在身上。

最后，也许有人会问，为什么要一把钥匙通开，而不是一个钥匙一个门呢？我想这纯粹是因为复杂性问题。

### 性能影响

当 `synchronized` 锁住一个对象后，别的线程如果也想拿到这个对象的锁，就必须等待这个线程执行完成释放锁，才能再次给对象加锁，这样才达到线程同步的目的。即使两个不同的代码段，都要锁同一个对象，那么这两个代码段也不能在多线程环境下同时运行。
所以我们在用 `synchronized` 关键字的时候，能缩小代码段的范围就尽量缩小，能在代码段上加同步就不要再整个方法上加同步。这叫减小锁的粒度，使代码更大程度的并发。

### 全局锁

全局锁与实例锁不同的是，控制同步的锁位于类对象上，所以类生成的多个实例里的同步代码，任何时候都只能有一处代码执行。

```java
public static synchronized int getX() { return x; }
public int getX() { synchronized(XXX.class) { return x; } }
```

### 死锁

其实死锁理解起来还是比较容易的，就是：当两个线程或者多个线程在互相等待对方已经锁定的资源时就产生了:

```java
public int read() {
    synchronized (resourceA) {
        // ...
        synchronized (resourceB) { /* ... */ }
    }
}
public void write(int a, int b) {
    synchronized (resourceB) {
        // ...
        synchronized (resourceA) { /* ... */ }
    }
}
```


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
