# Java 集合类型

在实际项目中一定会出现保存多个对象的操作，此时一定会想到对象数组的概念，但是传统的对象数组的长度是固定的，为了可以动态地实现多个对象的保存，此时就需要用到集合类型。(注：数组可以存储原始类型，但集合只能保存对象。)

类集在整个 Java 中最为核心的用处就在于其实现了动态对象数组的操作，并且定义了大量的操作标准。在整个类集框架中，其核心接口为：Collection List Set Map Iterator Enumeration。

![](/resource/images/java/collection.png)
![](/resource/images/java/collection.jpg)

## java.util.Collection

Collection 是进行单对象保存的最大父接口。

```java
public interface Collection<E> extends Iterable<E> { }
boolean add(E e);  // 追加一个元素
boolean addAll(Collection<? extends E> c);  // 追加一个集合
void clear();
boolean contains(Object o);
boolean isEmpty();
int size();
boolean remove(Object o);  // 删除第一个匹配项
Object[] toArray();
Iterator<E> iterator();
```

* add() 和 iterator() 两个方法是最常用的
* 使用 contains() 和 remove() 两个方法必须保证类中已经成功覆写了 Object 中的 equals() 方法，否则无法正常完成操作。
* Collection 接口无法区分保存的数据是否重复，实际开发中往往会使用其下两个子接口：List、Set。

### java.util.List

```java
public interface List<E> extends Collection<E> { }
E set(int index, E element);
E get(int index);
ListIterator<E> listIterator();
```

#### java.util.ArrayList

```java
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable { }
```

Array 与 ArrayList 有什么区别，什么时候应该用 Array 而不用 ArrayList：长度固定时，使用 Array 可直接使用索引操作，比较方便；但长度不固定时，就需要用到 ArrayList，在数据保存和取得时需要进行一些列的判断。

#### java.util.Vector

```java
public class Vector<E> extends AbstractList<E>
    implements List<E>, RandomAccess, Cloneable, java.io.Serializable { }
```

Arraylist 和 Vector 的区别：
  * ArrayList 1.2推出，采用异步处理，非线程安全，实际开发90%情况下会用 ArrayList
  * Vector 1.0推出，采用同步处理，线程安全

### Set

Set 子接口只是简单地继承了 Collection 接口，不像 List 子接口进行了大量扩充。

在 Set 子接口下有两个常用的子类：HashSet 和 TreeSet。HashSet 是散列存放数据，而 TreeSet 是有序存放的子类。实际开发中，如果要使用 TreeSet 子类则必须同时使用比较器的概念，而 HashSet 相对更简单些，如果没有排序要求应优先考虑 HashSet 子类。

Hash 算法就是利用二进制的计算结果来设置保存的空间，根据数值的不同，最终保存空间的位置也不同，所以利用 Hash 算法保存的集合都是无序的，但是其查找速度较快。

TreeSet 子类属于排序的类集结构，所保存的数据将会变为有序数据，默认情况下按照字母的升序排列。

TreeSet 利用 Comparable 接口实现重复元素的判断，但是这样的操作只适合支持排序类集操作环境下；而其他子类，如 HashSet 如果要消除重复元素，这必须依靠 Object 类中提供的两个方法：hashCode() 和 equals()。

```java
public interface Set<E> extends Collection<E> { }
public class HashSet<E> extends AbstractSet<E> implements Set<E>, Cloneable, java.io.Serializable { }
public class TreeSet<E> extends AbstractSet<E> implements NavigableSet<E>, Cloneable, java.io.Serializable { }
```

### 集合输出

由于集合中往往会保存多个对象数据，所以一般进行集合输出时都会采用循环的方式完成。而在 Java 中，集合的输出操作有4种形式：Iterator 输出、ListIterator 输出、foreach 输出、Enumeration 输出。

#### Iterator 迭代输出

```java
public interface Iterator<E> {
    boolean hasNext();
    E next();
    default void() remove();  // 说明见 P543
}
```

```java
List<String> all = new ArrayList<String>();
all.add("Hello"); all.add("World");
Iterator<String> it = all.iterator();
while (it.hasNext()) { String str = it.next(); System.out.println(str); }
```

#### ListIterator 双向迭代

Iterator 只能进行由前向后的输出，为了让输出变得更加灵活，在类集框架中就提供了一个 ListIterator 接口以实现双向迭代。

ListIterator 接口除了支持输出外，还可以进行集合更新(增加、修改、删除)，但是这些操作在实际开发中应用非常有限。

```java
public interface ListIterator<E> extends Iterator<E> { }
boolean hasPrevious();
boolean hasNext();
E previous();
E next();
void add(E e);
void set(E e);
```

#### foreach 输出

JDK1.5 之后为了简化数组以及集合的输出操作，专门提供了 foreach 输出。

```java
for (String str: all) { System.out.println(str); }
```

#### Enumeration 输出

Enumeration 是与 Vector 类一起在 JDK1.0 中推出的输出接口，因为很少直接操作 Vector 子类，所以很少使用。

## Map

Collection 每次只能保存一个对象，属于单值保存父接口。类集中还提供了保存偶对象(一对关联数据)的 Map 集合。

Map 接口中存在两个常用的子类：HashMap 和 Hashtable。

```java
public interface Map<K,V> {
    V put(K key, V value);
    V get(Object key);
    Set<K> keySet();
    Set<Map.Entry<K, V>> entrySet();
}
public class HashMap<K,V> extends AbstractMap<K,V>
        implements Map<K,V>, Cloneable, Serializable { }
public class Hashtable<K,V> extends Dictionary<K,V>
        implements Map<K,V>, Cloneable, java.io.Serializable { }
```

HashMap 与 Hashtable 的区别：
  * HashMap 在JDK1.2推出，采用异步处理，非线程安全，允许 key 或 value 内容为 null
  * Hashtable 在JDK1.0中推出，采用同步处理，线程安全，不允许设置 null
  * 实际开发中，由于 HashMap 保存数据不受 null 限制，所以建议优先考虑使用

### Map.Entry

用 Map 集合保存数据时，说保存的 key 与 value 会自动包装为 Map.Entry 接口对象。

对 Map 集合的便利，可先通过 entrySet() 转成 Set 再进行遍历。

```java
interface Entry<K,V> {
    K getKey();
    V getValue();
    V setValue(V value);
}
```

### 自定义 Map 集合的 key 类型

使用 Map 接口时可以发现，几乎可以使用任意的类型来作为 key 或 value 的存在，也就表示可以使用自定义的类型作为 key。


## Stack

栈也是一种动态对象数组，采用的是一种先进后出的数据结构形式。

Stack 类属于 Vector 子类，但进行 Stack 类操作时不会使用 Vector 类定义的方法，主要使用 Stack 自己定义的方法。

```java
public class Stack<E> extends Vector<E> { }
public E push(E item) { addElement(item); return item; }  // 入栈
public synchronized E pop() { }   // 出栈
public synchronized E peek() { }  // 查看最上面一项，旦不出栈
```

## Properties

Properties 类本身属于 Hashtable 的子类，但是由于 Properties 类都使用 String 数据类型进行操作，所以在使用中主要使用本类所定义的方法。

```java
public class Properties extends Hashtable<Object,Object> { }
public synchronized Object setProperty(String key, String value) { }
public String getProperty(String key) { }
public String getProperty(String key, String defaultValue) { }  // 如果key不存在返回默认值(第二参)
public void store(OutputStream out, String comments) throws IOException { }
public synchronized void load(InputStream inStream) throws IOException { }
```

```java
Properties pro = new Properties();
pro.setProperty("BJ", "北京");
pro.setProperty("TJ", "天津");
pro.store(new FileOutputStream("d:\\demo\\test.properties"), "Area Info");  // 注释会保存到外部文件中
pro.load(new FileInputStream("d:\\demo\\test2.properties"));  // 读取外部文件示例，条目会添加到当前 pro
```

Properties 类与 ResourceBundle 类使用哪个？

ResourceBundle 类在进行资源文件读取时只能读取后缀为 ".properties" 的文件，并且往往需要通过 Locale 类来设置当前国家及语言环境。但是 Properties 类却可以不区分文件后缀。理论上 Properties 在读取上更加灵活，但是 ResourceBundle 与 Locale 类结合读取不同语言资源文件的功能 Properties 类并没有。

所以最终的结论是：如果读取国际化资源文件使用 ResourceBundle 类，如果读取一些配置信息则 Properties 更方便。


## Collections 工具类

Java 提供类库是考虑到用户的使用方便性，专门提供了一个集合的工具类 —— Collections，这个工具类可以实现 List、Set、Map 集合的操作。

```java
public static <T> boolean addAll(Collection<? super T> c, T... elements) { }
public static <T> int binarySearch(List<? extends Comparable<? super T>> list, T key) { }
public static <T> void copy(List<? super T> dest, List<? extends T> src) { }
public static void reverse(List<?> list) { }
public static <T> void sort(List<T> list, Comparator<? super T> c) { }
```

Collection 与 Collections
  * Collection 是集合操作的接口，包含 List 和 Set 子接口
  * Collections 是集合操作的工具类，可以直接利用类中提供的方法，进行 List、Set、Map 等集合的数据操作。


## Stream

### java.util.stream.Stream

```java
public interface Stream<T> extends BaseStream<T, Stream<T>> {
    long count();          // 返回元素个数
    Stream<T> distinct();  // 清除重复元素
    <R, A> R collect(Collector<? super T, A, R> collector);
    Stream<T> filter(Predicate<? super T> predicate);
    <R> Stream<R> map(Function<? super T, ? extends R> mapper);
    Stream<T> skip(long n);
    Stream<T> limit(long maxSize);
    boolean allMatch(Predicate<? super T> predicate);
    boolean anyMatch(Predicate<? super T> predicate);
}
```
  
### MapReduce

MapReduce 是一种进行大数据操作的开发模型，在 Stream 数据流中也提供了类似的实现，其中有以下两个重要方法：
  * 数据处理方法：map
  * 数据分析方法：reduce

实际使用中，可以先使用 map() 方法针对数据进行处理，在利用 reduce() 对数据进行分析。

## 本章小结

1. 类集的目的是创建动态的对象数组操作。
2. Collection 接口是类集中最大单值操作的父接口，但是一般开发中不会直接使用此接口，而常使用 List 或 Set 接口。
3. List 接口扩展了 Collection 接口，里面的内容时允许重复的。
4. List 接口的常用子类是 ArrayList 和 Vector。ArrayList 属于异步操作，性能较高；而 Vector 属于同步操作，性能较低。
5. Set 接口与 Collection 接口的定义一致，里面的内容不允许重复，依靠 Object 类中的 equals() 和 hashCode() 方法来区分是否是同一个对象。
6. Set 接口的常用子类是 HashSet 和 TreeSet。HashSet 是散列存放，没有顺序；TreeSet 是顺序存放，使用 Comparable 进行排序操作。
7. 集合的输出要使用 Iterator 接口完成，Iterator 属于迭代输出接口。
8. Map 接口可以存放一对内容，所有的内容以 "key=value" 的形式保存，每对内容都是 Map.Entry 对象的实例。
9. Map 中常用的子类是 HashMap、Hashtable。HashMap 属异步处理，性能较高；Hashtable 属同步处理，性能较低。
10. 类集中提供了 Collection 工具类完成类集的相关操作。
11. Stack 类可以完成先进后出的操作。
12. Properties 类属于属性操作类，使用属性操作类可以直接操作属性文件。
