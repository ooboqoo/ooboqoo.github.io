# 设计原则和思想：面向对象


## 面向对象的相关概念

**面向对象编程** OOP (Object Oriented Programming) 是一种编程范式或编程风格，以 *类*(class) 或 *对象*(object) 作为 *组织代码的基本单元* ，并将 *封装、抽象、继承、多态* 这四个特性作为代码设计和实现的基石。

### 面向对象编程语言

**面向对象编程语言** OOPL (Object Oriented Programming Language) 是指支持类或对象语法，并有现成的语法机制能方便地实现面向对象编程四大特性的编程语言。

如何判定一个编程语言是否是面向对象编程语言？我个人觉得，只要某种编程语言支持类或对象的语法概念，并且 *以此作为组织代码的基本单元*，那就可以被粗略地认为它就是面向对象编程语言了。至于是否有现成的语法机制完全地支持面向对象编程的四大特性、是否对四大特性有所取舍和优化，可以不作为判定的标准。

面向对象编程和面向对象编程语言之间有何关系？面向对象编程一般使用面向对象编程语言来进行，但是，不用面向对象编程语言，我们照样可以进行面向对象编程。反过来讲，即使我们使用面向对象编程语言，写出来的代码也不一定是面向对象风格的，也有可能是面向过程风格的。

### 面向对象分析和面向对象设计

**面向对象分析**(OOA, Object Oriented Analysis)、**面向对象设计**(OOD, Object Oriented Design)、**面向对象编程**(实现) 是面向对象软件开发要经历的三个阶段。面向对象分析就是要 *搞清楚做什么* ，面向对象设计就是要 *搞清楚怎么做* ，面向对象编程就是 *将类的设计翻译成代码*。

面向对象分析与设计中的“分析”和“设计”这两个词，简单类比软件开发中的需求分析、系统设计，从字面上去理解即可。在前面加“面向对象”这几个字是因为我们是 *围绕着对象或类来做需求分析和设计的*。

分析和设计两个阶段 *最终的产出是类的设计*，包括程序被拆解为哪些类，每个类有哪些属性、方法，类与类之间如何交互等等。它们比其他的分析和设计更加具体、更能够顺利地过渡到面向对象编程环节。这也是面向对象分析和设计与其他分析和设计最大的不同点。

### UML

讲到面向对象分析、设计、编程，我们就不得不提 **UML** (Unified Model Language, 统一建模语言)。UML 作为 *一种沟通工具*，很多讲解面向对象或设计模式的书籍，常用它来画图表达面向对象或设计模式的设计思路。

UML 是一种非常复杂的东西，学习成本非常高。即使你严格按照 UML 规范来画图，别人也未必看得懂。因此 UML 在互联网公司的项目开发中用处可能并不大。

为了兼顾图的表达能力和你的学习成本，我对 UML 类图规范做了简化，并配上了详细的文字解释，力图让你一眼就能看懂，而不是让图加重你的学习成本。毕竟，我们的专栏并不是一个讲方法论的教程，专栏中的所有类图，本质是让你更清晰地理解设计。大家在实际工作中，为了文档化软件设计或者方便讨论软件设计，随手画个不那么规范的草图，能够达意，方便沟通就够了。完全按照 UML 规范来将草图标准化，所付出的代价是不值得的。

#### 类图

UML 不仅仅包含我们常提到的类图，还有用例图、顺序图、活动图、状态图、组件图等。

类之间的关系，UML 就定义了很多种，比如泛化、实现、关联、聚合、组合、依赖等。

> 评论区精选

关于 UML 在评论区有比较大的争议。另外一些同学则提供了 UML 的一些学习资源
* https://raw.githubusercontent.com/gdhucoder/Algorithms4/master/designpattern/pic/umlcheatsheet.jpg
* https://app.zenuml.com/



## 面向对象的四大特性

理解面向对象编程及面向对象编程语言的关键就是理解其四大特性：封装、抽象、继承、多态。不过，对于这四大特性，光知道它们的定义是不够的，我们还要知道每个特性存在的意义和目的，以及它们能解决哪些编程问题。

学习每一种特性，我们都可以从 What How Why 三个角度去分析。  
学习每一种特性的意义时，我们都可以从维护者和使用者这两个角度去分析其作用。

### 封装 Encapsulation

*封装也叫信息隐藏或数据访问保护*。类 *通过暴露有限的访问接口*，授权外部仅能通过类提供的方法来访问内部信息或者数据。

*封装需要编程语言提供权限访问控制语法来支持* ，例如 Java 中的 `private` `protected` `public` 关键字。

封装特性，一方面 *保护数据不被随意修改，提高代码的可维护性*；另一方面 *仅暴露有限的必要接口，提高类的易用性*。

如果我们对类中属性的访问不做限制，那任何代码都可以访问、修改类中的属性，虽然这样看起来更加灵活，但从另一方面来说，过度灵活也意味着不可控，属性可以随意被以各种奇葩的方式修改，而且修改逻辑可能散落在代码中的各个角落，势必影响代码的可读性、可维护性。比如某个同事在不了解业务逻辑的情况下，在某段代码中“偷偷地”重设了 wallet 中的 balanceLastModifiedTime 属性，这就会导致 balance 和 balanceLastModifiedTime 两个数据不一致。

除此之外，类仅仅通过有限的方法暴露必要的操作，也能提高类的易用性。如果我们把类属性都暴露给类的调用者，调用者想要正确地操作这些属性，就势必要对业务细节有足够的了解。而这对于调用者来说也是一种负担。相反，如果我们将属性封装起来，暴露少许的几个必要的方法给调用者使用，调用者就不需要了解太多背后的业务细节，用错的概率就减少很多。

```java
public class Wallet {
  private String id;
  private long createTime;
  private BigDecimal balance;
  private long balanceLastModifiedTime;

  public Wallet() {
     this.id = IdGenerator.getInstance().generate();
     this.createTime = System.currentTimeMillis();
     this.balance = BigDecimal.ZERO;
     this.balanceLastModifiedTime = System.currentTimeMillis();
  }

  public String getId() { return this.id; }
  public long getCreateTime() { return this.createTime; }
  public BigDecimal getBalance() { return this.balance; }
  public long getBalanceLastModifiedTime() { return this.balanceLastModifiedTime; }

  public void increaseBalance(BigDecimal increasedAmount) {
    if (increasedAmount.compareTo(BigDecimal.ZERO) < 0) {
      throw new InvalidAmountException("...");
    }
    this.balance.add(increasedAmount);
    this.balanceLastModifiedTime = System.currentTimeMillis();
  }

  public void decreaseBalance(BigDecimal decreasedAmount) {
    if (decreasedAmount.compareTo(BigDecimal.ZERO) < 0) {
      throw new InvalidAmountException("...");
    }
    if (decreasedAmount.compareTo(this.balance) > 0) {
      throw new InsufficientAmountException("...");
    }
    this.balance.subtract(decreasedAmount);
    this.balanceLastModifiedTime = System.currentTimeMillis();
  }
}
```

上例中，从业务的角度来说，id、createTime 在创建钱包的时候就确定好了，之后不应该再被改动，所以，我们并没有在 Wallet 类中，暴露 id、createTime 这两个属性的任何修改方法。而且，这两个属性的初始化设置，对于 Wallet 类的调用者来说，也应该是透明的，所以，我们在 Wallet 类的构造函数内部将其初始化设置好，而不是通过构造函数的参数来外部赋值。

对于钱包余额 balance 这个属性，从业务的角度来说，只能增或者减，不会被重新设置。所以，我们在 Wallet 类中，只暴露了 increaseBalance() 和 decreaseBalance() 方法，并没有暴露 set 方法。对于 balanceLastModifiedTime 这个属性，它完全是跟 balance 这个属性的修改操作绑定在一起的。只有在 balance 修改的时候，这个属性才会被修改。所以，我们把 balanceLastModifiedTime 这个属性的修改操作完全封装在了 increaseBalance() 和 decreaseBalance() 两个方法中，不对外暴露任何修改这个属性的方法和业务细节。这样也可以保证 balance 和 balanceLastModifiedTime 两个数据的一致性。

### 抽象 Abstraction

封装主要讲如何隐藏信息、保护数据，那 *抽象就是讲如何隐藏方法的具体实现*，让使用者只需要关心方法提供了哪些功能，不需要知道这些功能是如何实现的。

*抽象可以通过接口类或抽象类来实现*。实际上，抽象并不需要非得依靠接口类或者抽象类这些特殊语法机制来支持。类的方法是通过编程语言中的“函数”这一语法机制来实现的。通过函数包裹具体的实现逻辑，这本身就是一种抽象。

抽象有时候会被排除在面向对象的四大特性之外。因为抽象这个概念是一个非常通用的设计思想，并不单单用在面向对象编程中，也可以用来指导架构设计等。而且抽象特性也并不需要编程语言提供特殊的语法机制来支持，只需要提供“函数”这一非常基础的语法机制就可以实现。所以，它没有很强的“特异性”，有时候并不被看作面向对象编程的特性之一。

抽象存在的意义，一方面是提高代码的可扩展性、可维护性，*修改实现不需要改变定义*，减少代码的改动范围；另一方面，它也是处理复杂系统的有效手段，*能有效地过滤掉不必要关注的信息*。

如果上升一个思考层面的话，抽象及其前面讲到的封装都是人类处理复杂性的有效手段。在面对复杂系统的时候，人脑能承受的信息复杂程度是有限的，所以我们必须忽略掉一些非关键性的实现细节。而抽象作为一种只关注功能点不关注实现的设计思路，正好帮我们的大脑过滤掉许多非必要的信息。

除此之外，抽象作为一个非常宽泛的设计思想，在代码设计中，起到非常重要的指导作用。很多设计原则都体现了抽象这种设计思想，比如基于接口而非实现编程、开闭原则、代码解耦等。

换一个角度来考虑，我们在定义(或者叫命名)类的方法时，也要有抽象思维，不要在方法定义中暴露太多的实现细节，以保证在修改方法的实现逻辑时不用去修改其定义。比如 `getAliyunPictureUrl()` 就不是一个具有抽象思维的命名，因为某一天如果我们不再把图片存储在阿里云上，而是存储在私有云上，那这个命名也要随之修改。相反，如果我们定义一个比较抽象的函数，如 `getPictureUrl()`，即便内部存储方式修改了也不需要修改命名。

```java
public interface IPictureStorage {
  void savePicture(Picture picture);
  Image getPicture(String pictureId);
  void deletePicture(String pictureId);
  void modifyMetaInfo(String pictureId, PictureMetaInfo metaInfo);
}

public class PictureStorage implements IPictureStorage {
  // 省略其他属性...
  @Override
  public void savePicture(Picture picture) { /* ... */ }
  @Override
  public Image getPicture(String pictureId) { /* ... */ }
  @Override
  public void deletePicture(String pictureId) { /* ... */ }
  @Override
  public void modifyMetaInfo(String pictureId, PictureMetaInfo metaInfo) { /* ... */ }
}
```

在上面的这段代码中，我们利用 Java 中的 interface 接口语法来实现抽象特性。调用者在使用图片存储功能的时候，只需要了解 IPictureStorage 这个接口类暴露了哪些方法就可以了，不需要去查看 PictureStorage 类里的具体实现逻辑。

### 继承 Inheritance

继承用来表示类之间的 `is-a` 关系，分为两种模式：单继承和多继承。单继承表示一个子类只继承一个父类，多继承表示一个子类可以继承多个父类。继承需要编程语言提供特殊的语法机制来支持。*继承主要解决代码复用的问题*。

### 多态 Polymorphism

多态是指子类可以替换父类，在运行时调用子类的方法实现。

多态也需要编程语言提供相应的语法机制，如 *继承、接口类、duck-typing*。像 Java 这样的静态语言，通过继承实现多态特性，必须要求两个类之间有继承关系；通过接口实现多态特性，类必须实现对应的接口。对于一些动态语言，只要两个类具有相同的方法，就可以实现多态，并不要求两个类之间有任何关系，这就是所谓的 duck-typing。

“继承加方法重写”这种实现方式具体需要用到三个语法机制：1) 父类对象可以引用子类对象 2) 继承 3) 子类可以重写父类中的方法。

*多态可以提高代码的可扩展性和复用性，是很多设计模式、设计原则、编程技巧的代码实现基础*。比如策略模式、基于接口而非实现编程、依赖倒置原则、里式替换原则、利用多态去掉冗长的 if-else 语句等等。

```java
public interface Iterator {
  String hasNext();
  String next();
  String remove();
}

public class Array implements Iterator {
  private String[] data;
  
  public String hasNext() { ... }
  public String next() { ... }
  public String remove() { ... }
  //...省略其他方法...
}

public class Demo {
  private static void print(Iterator iterator) {
    while (iterator.hasNext()) {
      System.out.println(iterator.next());
    }
  }

  public static void main(String[] args) {
    Iterator arrayIterator = new Array();
    print(arrayIterator);

    Iterator linkedListIterator = new LinkedList();
    print(linkedListIterator);
  }
}
```

如果不使用多态特性就无法将不同的集合类型 (如 Array、LinkedList 等) 传递给相同的函数 `print(Iterator iterator)`。我们需要针对每种要遍历打印的集合，分别实现不同的 print() 函数，比如针对 Array，我们要实现 `print(Array array)` 函数，针对 LinkedList，我们要实现 `print(LinkedList linkedList)` 函数。而利用多态特性，我们只需要实现一个 print 函数，就能应对各种集合数据的打印操作，这显然提高了代码的复用性。



## 面向对象 vs 面向过程




## 接口类 vs 抽象类

抽象类更多的是为了代码复用，而接口类就更侧重于解耦。



### 基于接口而非实现编程

我们在做软件开发的时候，一定要有抽象意识、封装意识、接口意识。在定义接口的时候，不要暴露任何实现细节。接口的定义只表明做什么，而不是怎么做。在设计接口的时候，我们要多思考一下，这样的接口设计是否足够通用，是否能够在替换具体的接口实现时不修改接口定义。

*基于接口而非实现编程* 的另一种表述是 *基于抽象而非实现编程*，其实后者更能体现这条原则的设计初衷。软件开发时，一定要有抽象意识、封装意识、接口意识。越抽象、越顶层、越脱离具体实现的设计，越能提高代码的灵活性、扩展性和可维护性。

我们在定义接口的时候，一方面，命名要足够通用，不能包含跟具体实现相关的字眼；另一方面，与特定实现有关的方法不要定义在接口中。

“基于接口而非实现编程” 这条原则，不仅仅可以指导非常细节的编程开发，还能指导更上层的架构设计、系统设计等，比如服务端与客户端之间的接口设计、类库的接口设计。










## 组合 vs 继承

*通过 组合、接口、委托 三个技术手段替换复杂的继承关系*

继承最大的问题就在于：继承层次过深、继承关系过于复杂 会影响到代码的可读性和可维护性。

我们可以综合利用 组合(compositon)、接口、委托(delegation) 这三个技术手段来解决刚刚继承存在的问题。我们知道继承主要有三个作用：表示 is-a 关系，支持多态特性，代码复用。而这三个作用都可以通过其他技术手段来达成。*比如 is-a 关系，我们可以通过组合和接口的 has-a 关系来替代；多态特性我们可以利用接口来实现；代码复用我们可以通过组合和委托来实现*。所以，从理论上讲，通过组合、接口、委托三个技术手段，我们完全可以替换掉继承，在项目中不用或者少用继承，特别是一些复杂的继承关系。

```java
public interface Flyable {
  void fly()；
}
public class FlyAbility implements Flyable {
  @Override
  public void fly() { /* ... */ }
}

// 省略 Tweetable/TweetAbility/EggLayable/EggLayAbility ...

/** 鸵鸟 */
public class Ostrich implements Tweetable, EggLayable {
  private TweetAbility tweetAbility = new TweetAbility();    // 组合
  private EggLayAbility eggLayAbility = new EggLayAbility(); // 组合
  // 省略其他属性和方法 ...
  @Override
  public void tweet() {
    tweetAbility.tweet();   // 委托
  }
  @Override
  public void layEgg() {
    eggLayAbility.layEgg(); // 委托
  }
}
```

尽管我们鼓励多用组合少用继承，但组合也并不是完美的，继承也并非一无是处。从上面的例子来看，继承改写成组合意味着要做更细粒度的类的拆分。我们要定义更多的类和接口。类和接口的增多也就或多或少的增加代码的复杂程度和维护成本。所以，在实际的项目开发中，我们还是要根据具体的情况来进行选择。

如果类之间的继承结构稳定(不会轻易改变)，继承层次比较浅，继承关系不复杂，我们就可以大胆地使用继承。反之，系统越不稳定，继承层次很深，继承关系复杂，我们就尽量使用组合来替代继承。

除此之外，还有一些设计模式会固定使用继承或者组合。如，装饰者模式（decorator pattern）、策略模式（strategy pattern）、组合模式（composite pattern）等都使用了组合关系，而模板模式（template pattern）使用了继承关系。

利用继承特性，我们把相同的属性和方法，抽取出来，定义到父类中。子类复用父类中的属性和方法，达到代码复用的目的。但是，有的时候，从业务含义上，A 类和 B 类并不一定具有继承关系。比如 Crawler 类和 PageAnalyzer 类 都用到了 URL 拼接和分割的功能，但并不具有继承关系。仅仅为了代码复用，生硬地抽象出一个父类，会影响到代码的可读性，此时使用组合更为合理。

### 为什么不推荐继承

继承是面向对象的四大特性之一，可以解决代码复用的问题。虽然继承有诸多作用，但继承层次过深、过复杂，也会影响到代码的可维护性。在这种情况下，我们应该尽量少用甚至不用继承。

### 组合相比继承有哪些优势

继承主要有三个作用：表示 is-a 关系，支持多态特性，代码复用。而这三个作用都可以通过组合、接口、委托三个技术手段来达成。利用组合能解决层次过深、过复杂的继承关系影响代码可维护性的问题。

### 如何判断该用组合还是继承

尽管我们鼓励多用组合少用继承，但组合也并不完美，继承也并非一无是处。在实际的项目开发中，我们还是要根据具体的情况，来选择该用继承还是组合。如果类之间的继承结构稳定，层次比较浅，关系不复杂，我们就可以大胆地使用继承。反之，我们就尽量使用组合来替代继承。除此之外，还有一些设计模式、特殊的应用场景，会固定使用继承或者组合。



## 贫血模型 vs 充血模型

总结一下的话就是，基于贫血模型的传统的开发模式，重 Service 轻 BO；基于充血模型的 DDD 开发模式，轻 Service 重 Domain。


## 实战案例：分析 设计 实现





