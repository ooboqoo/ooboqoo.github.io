# 设计模式




### 单例设计模式

```java
class Singleton {
  private static Singleton instance = new Singleton();  // 静态属性，供静态方法 getInstance() 调用
  private Singleton() {}                                // 构造方法私有化，禁止外部直接实例化对象
  public void print() {
    System.out.println("Hello");
  }
  public static Singleton getInstance() {                // 通过静态方法获取本类单例对象
    return instance;
  }
}
```

#### 多例设计模式

单例设计模式只留下一个类的一个实例化对象，而多例设计模式会定义出多个对象。

```java
class Person {
  private String gender;
  private static final Person MALE = new Person("man");
  private static final Person FEMALE = new Person("woman");
  private Person(String gender) {
    this.gender = gender;
  }
  public String toString() {
    return this.gender;
  }
  public static Sex getInstance(String gender) {
    switch (gender) {
      case "man": return MALE;
      case "woman": return FEMALE;
      default: return null;
    }
  }
}
```



