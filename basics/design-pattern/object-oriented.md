# 面向对象

<style>.comment { width: fit-content; border-bottom: 1px solid #ccc; font-size: 1.5rem; color: #999; }</style>

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

![](https://raw.githubusercontent.com/gdhucoder/Algorithms4/master/designpattern/pic/umlcheatsheet.jpg)

#### 类图

UML 不仅仅包含我们常提到的类图，还有用例图、顺序图、活动图、状态图、组件图等。

类之间的关系，UML 就定义了很多种，比如泛化、实现、关联、聚合、组合、依赖等。

<div class="comment">评论区精选</div>

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

常见的编程范式或者说编程风格有三种，**面向过程编程**、**面向对象编程**、**函数式编程**。面向对象编程是目前最主流的编程范式，面向过程编程已经慢慢退出了舞台，而函数式编程还没有被广泛接受。

在过往的工作中，我发现很多人搞不清楚面向对象和面向过程的区别，总以为使用面向对象编程语言来做开发，就是在进行面向对象编程。而实际上，他们只是在用面向对象编程语言，编写面向过程风格的代码而已，并没有发挥面向对象编程的优势。

### 面向过程编程 与 面向过程编程语言

**面向对象编程** 以类或对象作为组织代码的基本单元，并将封装、抽象、继承、多态四个特性，作为代码设计和实现的基石。

**面向过程编程** *以过程作为组织代码的基本单元，以数据与方法相分离为最主要的特点* 。面向过程风格是一种流程化的编程风格，通过 *拼接一组顺序执行的方法来操作数据以完成一项功能* 。  
**面向过程编程语言** 最大的特点是不支持类和对象，不支持丰富的面向对象编程特性(如继承、多态、封装)，仅支持面向过程编程。

面向过程和面向对象最基本的区别就是，*代码的组织方式不同* 。面向过程风格的代码被组织成了 *一组方法和数据结构* ，方法和数据结构的定义是分开的。面向对象风格的代码被组织成 *一组类* ，方法和数据结构被绑在一起，定义在类中。

### 面向对象编程相比面向过程编程有哪些优势？

#### OOP 更加能够应对大规模复杂程序的开发

对于简单程序的开发来说，用面向过程编程 和 用面向对象编程 之间的差别不会很大，甚至有的时候，面向过程的编程风格更有优势。因为需求足够简单，整个程序的处理流程只有一条主线，很容易被划分成顺序执行的几个步骤，然后逐句翻译成代码，这就非常适合采用面向过程这种面条式的编程风格来实现。

但对于大规模复杂程序的开发来说，整个程序的处理流程错综复杂，并非只有一条主线。如果把整个程序的处理流程画出来的话，会 *是一个网状结构*。如果我们再用面向过程编程这种流程化、线性的思维方式，去翻译这个网状结构，去思考如何把程序拆解为一组顺序执行的方法，就会比较吃力。这个时候，面向对象的编程风格的优势就比较明显了。

面向对象编程是以类为思考对象。在进行面向对象编程的时候，我们并不是一上来就去思考，如何将复杂的流程拆解为一个一个方法，而是采用曲线救国的策略，先去 *思考如何给业务建模，如何将需求翻译为类，如何给类之间建立交互关系，而完全不需要考虑错综复杂的处理流程*。当我们有了类的设计之后，再像搭积木一样，按照处理流程，将类组装起来形成整个程序。这种开发模式、思考问题的方式，能让我们在应对复杂程序开发的时候，思路更加清晰。

除此之外，面向对象编程还提供了一种更加清晰的、*更加模块化的代码组织方式*。比如，我们开发一个电商交易系统，业务逻辑复杂，代码量很大，可能要定义数百个函数、数百个数据结构，那如何分门别类地组织这些函数和数据结构，才能不至于看起来比较凌乱呢？类就是一种非常好的组织这些函数和数据结构的方式，是一种将代码模块化的有效手段。

#### OOP 风格的代码更易复用、易扩展、易维护

面向过程编程是一种非常简单的编程风格，并没有像面向对象编程那样提供丰富的特性。而 *面向对象编程提供的封装、抽象、继承、多态这些特性，能极大地满足复杂的编程需求*，能方便我们写出更易复用、易扩展、易维护的代码。

首先是封装特性。面向过程编程，数据可以被任意方法随意修改。面向对象编程提供的封装特性更有利于提高代码的易维护性。

其次，我们再来看下抽象特性。函数本身就是一种抽象，所以不管面向过程编程还是是面向对象编程，都支持抽象特性。不过，面向对象编程还提供了其他面向过程编程所不具备的抽象特性的实现方式，如基于接口实现的抽象。

尽管面向过程编程语言可能没有现成的语法来支持面向对象的四大特性，但可以通过其他方式来模拟，如 C 语言中我们可以利用函数指针来模拟多态。

利用面向对象编程的四大特性，我们可以更轻松地写出易复用、易扩展、易维护的代码。当然，我们不能说，利用面向过程风格就不可以写出易复用、易扩展、易维护的代码，但没有四大特性的帮助，付出的代价可能就要高一些。

#### OOP 语言更加人性化、更加高级、更加智能

跟机器交互的方式，从二进制指令、汇编语言 到 面向过程编程语言，是一个非常自然的过渡，都是一种流程化的、面条式的编程风格，用一组指令顺序操作数据，来完成一项任务。

跟二进制指令、汇编语言、面向过程编程语言相比，面向对象编程语言的编程套路、思考问题的方式，是完全不一样的。*前三者是一种计算机思维方式，而面向对象是一种人类的思维方式* 。我们在用前面三种语言编程的时候，我们是在思考，如何设计一组指令，告诉机器去执行这组指令，操作某些数据，帮我们完成某个任务。而在进行面向对象编程时候，我们是在思考，*如何给业务建模，如何将真实的世界映射为类或者对象* ，这让我们更加能聚焦到业务本身，而不是思考如何跟机器打交道。可以这么说，越高级的编程语言离机器越“远”，离我们人类越“近”，越“智能”。

### 有哪些看似是面向对象实际是面向过程风格的代码？

在用面向对象编程语言进行开发时，我们有时候会写出面向过程风格的代码。有些是有意为之，并无不妥；而有些则是无意为之，会影响到代码的质量。

#### 滥用 getter、setter 方法

之前参与的项目中，经常看到有同事定义完类的属性之后，就顺手把这些属性的 getter、setter 方法都定义上。当我问为什么要给每个属性都定义 getter、setter 方法的时候，他们的理由一般是，以后可能会用到，而且即便用不到，定义它们也无伤大雅。实际上，这样的做法我是非常不推荐的。*它违反了面向对象编程的封装特性，相当于将面向对象编程风格退化成了面向过程编程风格。*

#### 滥用全局变量和全局方法

如果你是用类似 C 语言这样的面向过程的编程语言来做开发，那对全局变量、全局方法肯定不陌生，甚至可以说，在代码中到处可见。但如果你是用类似 Java 这样的面向对象的编程语言来做开发，全局变量和全局方法就不是很多见了。

在面向对象编程中，常见的全局变量有单例类对象、静态成员变量、常量等，常见的全局方法有静态方法。**单例类对象** 在全局代码中只有一份，所以，它相当于一个全局变量。**静态成员变量** 归属于类上的数据，被所有的实例化对象所共享，也相当于一定程度上的全局变量。而 **常量** 是一种非常常见的全局变量，比如一些代码中的配置参数，一般都设置为常量，放到一个 `Constants` 类中。**静态方法** 一般用来操作静态变量或者外部数据。你可以联想一下我们常用的各种 `Utils` 类，里面的方法一般都会定义成静态方法，可以在不用创建对象的情况下，直接拿来使用。静态方法将方法与数据分离，破坏了封装特性，是典型的面向过程风格。

在刚刚介绍的这些全局变量和全局方法中，Constants 类和 Utils 类最常用到。现在，我们就结合这两个几乎在每个软件开发中都会用到的类，来深入探讨一下全局变量和全局方法的利与弊。

我们先来看一下，在我过去参与的项目中，一种常见的 Constants 类的定义方法。

```java

public class Constants {
  public static final String MYSQL_ADDR_KEY = "mysql_addr";
  public static final String MYSQL_DB_NAME_KEY = "db_name";
  public static final String MYSQL_USERNAME_KEY = "mysql_username";
  public static final String MYSQL_PASSWORD_KEY = "mysql_password";

  public static final String REDIS_DEFAULT_ADDR = "192.168.7.2:7234";
  public static final int REDIS_DEFAULT_MAX_TOTAL = 50;
  public static final int REDIS_DEFAULT_MAX_IDLE = 50;
  public static final int REDIS_DEFAULT_MIN_IDLE = 20;
  public static final String REDIS_DEFAULT_KEY_PREFIX = "rt:";

  // ...省略更多的常量定义...
}
```

在这段代码中，我们把程序中所有用到的常量，都集中地放到这个 Constants 类中。不过，定义一个如此大而全的 Constants 类，并不是一种很好的设计思路。原因主要有以下几点。
* 会影响代码的可维护性。这个类会变得非常大，不好维护，且多人同时修改容易出现冲突。
* 会增加代码的编译时间。每次修改 Constants 类，都会导致依赖它的类文件重新编译。
* 会影响代码的复用性。如果另一个项目想复用一个依赖 Constants 类的类就必须将 Constants 一并引入。

那如何改进 Constants 类的设计呢？我这里有两种思路可以借鉴。
* 将 Constants 类拆解为功能更加单一的多个类，如 MysqlConstants 类、RedisConstants 类等。
* 另一种我个人觉得更好的设计思路，是将类相关的常量直接定义到这个类中。这样提高了类设计的内聚性和代码的复用性。

讲完了 Constants 类，我们再来讨论一下 Utils 类。

```java
public class Utils {
  public static String format(String url) { /* ... */ }
  // ...
}
```

只包含静态方法不包含任何属性的 Utils 类，是彻彻底底的面向过程的编程风格。但这并不是说，我们就要杜绝使用 Utils 类。实际上，它在软件开发中还是挺有用的，能解决代码复用问题。所以，这里并不是说完全不能用 Utils 类，而是说，要尽量避免滥用。在定义 Utils 类之前，你要问一下自己，你真的需要单独定义这样一个 Utils 类吗？是否可以把 Utils 类中的某些方法定义到其他类中呢？如果在回答完这些问题之后，你还是觉得确实有必要去定义这样一个 Utils 类，那就大胆地去定义它吧。

除此之外，我们设计 Utils 类的时候，最好也能细化一下，针对不同的功能，设计不同的 Utils 类，比如 FileUtils、IOUtils、StringUtils、UrlUtils 等，不要设计一个过于大而全的 Utils 类。

#### 定义数据和方法分离的类

你可能会觉得，这么明显的面向过程风格的代码，谁会这么写呢？实际上，如果你是基于 MVC 三层结构做 Web 方面的后端开发，这样的代码你可能天天都在写。具体的分析留到后面的 “贫血模型 vs 充血模型” 中讲解。

### 为什么容易写出面向过程风格的代码？

在生活中，你去完成一个任务，一般都会思考应该先做什么、后做什么，如何一步一步地顺序执行一系列操作，最后完成整个任务。面向过程编程风格恰恰符合人的这种流程化思维方式。而面向对象编程风格正好相反。*它是一种自底向上的思考方式*。它不是先去按照执行流程来分解任务，而是将任务翻译成一个个小的模块(即类)，设计类之间的交互，最后按照流程将类组装起来，完成整个任务。*这样的思考路径比较适合复杂程序的开发，但并不是特别符合人类的思考习惯*。

除此之外，面向对象编程要比面向过程编程难一些。在面向对象编程中，*类的设计还是挺需要技巧*，挺需要一定设计经验的。你要去思考如何封装合适的数据和方法到一个类里，如何设计类之间的关系，如何设计类之间的交互等等诸多设计问题。

基于这两点原因，很多工程师更倾向于用不太需要动脑子的方式去实现需求，也就不由自主地就将代码写成了面向过程风格了。

### 面向过程编程和面向过程编程语言就真的无用武之地了吗？

如果我们开发的是小型程序，或者是一个数据处理相关的代码，以算法为主，数据为辅，那脚本式的面向过程的编程风格就更适合。

面向过程编程是面向对象编程的基础，面向对象编程离不开面向过程编程。实际上，类中方法的实现逻辑就是面向过程风格的代码。

不管使用面向过程还是面向对象，我们最终的目的还是写出易维护、易读、易复用、易扩展的高质量代码。只要我们能避免面向过程编程风格的一些弊端，控制好它的副作用，我们就大可不用避讳在面向对象编程中写面向过程风格的代码。

<div class="comment">留言区精选</div>

课堂讨论：面向对象编程比面向过程编程更加容易应对大规模复杂程序的开发。但像 Unix、Linux 这些复杂的系统，都是基于 C 语言这种面向过程的编程语言开发的，你怎么看待这个现象？

优秀回答：

使用任何一个编程语言编写的程序，最终执行上都要落实到一条一条 CPU 指令，CPU 看不到是使用何种语言编写的程序。*所有编程语言的最终目的只有两种：提高硬件的运行效率和提高程序员的开发效率*，然而两者很难兼得。

C语言在效率方面几乎做到了极致，它更适合挖掘硬件的价值。从执行效率这个角度看，开发操作系统和贴近硬件的底层程序，C语言是极好的选择。C语言带来的问题是内存越界、野指针、内存泄露等。它只关心程序飞地高不高，不关心程序猿飞地累不累。

为了提高开发效率，设计了 OOP 等更“智能”的编程语言，但这种便利性是建立在对底层的一层一层包装上的。完成一个特定操作需要更多的中间环节，占用 更大的内存空间 和 更多的 CPU 运算。从这个角度看，OOP 这种高级语言的流行是因为硬件越来越便宜了。



## 接口类 vs 抽象类

在面向对象编程中，抽象类和接口是两个经常被用到的语法概念，是面向对象四大特性，以及很多设计模式、设计思想、设计原则编程实现的基础。比如，我们可以使用接口来实现面向对象的抽象特性、多态特性和基于接口而非实现的设计原则，使用抽象类来实现面向对象的继承特性和模板设计模式等等。

Java 既支持抽象类，也支持接口，所以我们使用 Java 来讲解这两个概念。

### 抽象类、接口介绍

#### 抽象类

抽象类具有以下特性

* 抽象类不允许被实例化，只能被继承。
* 抽象类可以包含属性和方法。方法可以是抽象方法(不包含代码实现的方法)。
* 子类继承抽象类，必须实现抽象类中的所有抽象方法。

```java
public abstract class Logger {
  private String name;
  private boolean enabled;
  public Logger(String name, boolean enabled) {
    this.name = name;
    this.enabled = enabled;
  }
  public void log(String message) {
    if (enabled) doLog(level, message);
  }

  protected abstract void doLog(Level level, String message);
}

// 抽象类的子类：输出日志到文件
public class FileLogger extends Logger {
  @Override
  public void doLog(Level level, String mesage) {
    // ...
  }
}
// 抽象类的子类: 输出日志到消息中间件(比如kafka)
public class MessageQueueLogger extends Logger {
  @Override
  public void doLog(Level level, String mesage) {
    // ...
  }
}
```

抽象类解决什么问题？

抽象类不能实例化，只能被继承。而继承能解决代码复用的问题。所以，抽象类也是为代码复用而生的。至于抽象类区别于普通类有哪些优势(或者说，有什么特定的应用场景)，我们通过修改上面的 Logger 类为普通类来说明。

```java
// 这了我们将抽象类修改为普通类，看看会出现哪些问题
public class Logger {
  // ...省略部分代码...
  public void log(Level level, String mesage) {
    // do nothing...
  }
}
public class FileLogger extends Logger {
  // ...省略部分代码...
  @Override
  public void log(Level level, String mesage) {
    if (!isLoggable()) return;
    // 格式化level和message,输出到日志文件
    fileWriter.write(...);
  }
}

Logger logger = new FileLogger("access-log", true, Level.WARN, "/users/wangzheng/access.log");
logger.log(Level.ERROR, "This is a test log message.");  // 如果 Logger 没有定义 log，编译报错
```

在 Java 中，如果上面的 Logger 没有定义 log 方法，编译时会报错，而如果像上面这样定义一个空的 log 方法，则存在以下问题：
* 在 Logger 中定义一个空的方法，会影响代码的可读性。
* 当创建 Logger 子类时，有可能会忘记重新实现 log 方法。而使用抽象类的抽象方法，编译器会强制要求子类重写 log 方法。
* Logger 可以被实例化，这增加了类被误用的风险。虽然可以通过设置私有构造函数来解决，不过显然没有抽象类来的优雅。

#### 接口

接口具有以下特性

* 接口不能包含属性（也就是成员变量）。
* 接口只能声明方法，方法不能包含代码实现。
* 类实现接口的时候，必须实现接口中声明的所有方法。

接口解决什么编程问题？

*抽象类更多的是为了代码复用，而接口类就更侧重于解耦*。如果要表示一种 is-a 的关系，并且是为了解决代码复用问题，我们就用抽象类；如果要表示一种 has-a 关系，并且是为了解决抽象而非代码复用问题，那我们就用接口。

```java
// 接口
public interface Filter {
  void doFilter(RpcRequest req) throws RpcException;
}
// 接口实现类：鉴权过滤器
public class AuthencationFilter implements Filter {
  @Override
  public void doFilter(RpcRequest req) throws RpcException {
    // 鉴权逻辑..
  }
}
// 接口实现类：限流过滤器
public class RateLimitFilter implements Filter {
  @Override
  public void doFilter(RpcRequest req) throws RpcException {
    // 限流逻辑...
  }
}
```

#### 区别

首先，两者在语法特性上有比较大的区别，比如抽象类中可以定义属性、方法的实现，而接口中不能定义属性，方法也不能包含代码实现等。

另外，从设计的角度看，两者也有比较大的区别。抽象类是一种特殊的类，跟普通类一样表示一种 is-a 的关系。而接口表示一种 has-a 关系，表示具有某些功能。对于接口，有一个更加形象的叫法，那就是协议(contract)。

从类的继承层次上来看，抽象类是一种自下而上的设计思路，先有子类的代码重复，然后再抽象成上层的父类(也就是抽象类)。而接口正好相反，它是一种自上而下的设计思路。我们在编程的时候，一般都是先设计接口，再去考虑具体的实现。

接口是对行为的一种抽象，相当于一组协议或者契约，你可以联想类比一下 API 接口。调用者只需要关注抽象的接口，不需要了解具体的实现，具体的实现代码对调用者透明。接口实现了约定和实现相分离，可以降低代码间的耦合性，提高代码的可扩展性。接口是一个比抽象类应用更加广泛、更加重要的知识点。

#### 模拟抽象类和接口

并不是所有的面向对象编程语言都支持抽象类和接口这两个语法概念，如 C++ 只支持抽象类不支持接口；而像 Python 这样的动态编程语言既不支持抽象类也不支持接口。当然，我们仍然可以通过一些手段来模拟实现这两个语法概念。

在不支持接口的语言中我们可以使用抽象类来模拟接口。如果连抽象类都不支持，我们还可以用普通类来模拟接口。

```js
class Filter {
  constructor () {
    if (new.target === Filter) {
      throw new Error('Interface cannot be instantiated');
    }
  }
  doFilter () {
    throw new Error('MethodUnSupportedException');
  }
}
```

### 基于接口而非实现编程

我们经常提到的“基于接口而非实现编程”，就是一条几乎天天会用到，并且能极大地提高代码的灵活性、扩展性的设计思想。

我们在做软件开发的时候，一定要有抽象意识、封装意识、接口意识。越抽象、越顶层、越脱离具体实现的设计，越能提高代码的灵活性、扩展性和可维护性。

在定义接口的时候，不要暴露任何实现细节。接口的定义只表明做什么，而不是怎么做。在设计接口的时候，我们要多思考一下，这样的接口设计是否足够通用，是否能够在替换具体的接口实现时不修改接口定义。

“基于接口而非实现编程” 这条原则，不仅仅可以指导非常细节的编程开发，还能指导更上层的架构设计、系统设计等，比如服务端与客户端之间的接口设计、类库的接口设计。

#### 理解 "接口"

理解这条原则的关键，就是理解 “接口” 这两个字。从本质上来看，“接口”就是一组“协议”或者“约定”，是功能提供者提供给使用者的一个“功能列表”。“接口”在不同的应用场景下会有不同的解读，比如服务端与客户端之间的“接口”，类库提供的“接口”，甚至是一组通信的协议都可以叫作“接口”。刚刚对“接口”的理解，都比较偏上层、偏抽象，与实际的写代码离得有点远。如果落实到具体的编码，“基于接口而非实现编程”这条原则中的“接口”，可以理解为编程语言中的接口或者抽象类。

#### 如何应用这条原则

这条原则能非常有效地提高代码质量，应用这条原则，可以将接口和实现相分离，封装不稳定的实现，暴露稳定的接口。上游系统面向接口而非实现编程，不依赖不稳定的实现细节，这样当实现发生变化的时候，上游系统的代码基本上不需要做改动，以此来降低耦合性，提高扩展性。

“基于接口而非实现编程” 的另一种表述是 “基于抽象而非实现编程”。其实后者更能体现这条原则的设计初衷。*软件开发中最大的挑战之一就是需求的不断变化* ，这也是考验代码设计好坏的一个标准。越抽象、越顶层、越脱离具体实现的设计，越能提高代码的灵活性，越能应对未来的需求变化。好的代码设计，不仅能应对当下的需求，而且在将来需求发生变化的时候，仍然能够在不破坏原有代码设计的情况下灵活应对。而抽象就是提高代码扩展性、灵活性、可维护性最有效的手段之一。

具体来讲，在编码时，我们需要做到下面这 3 点。

* 函数的命名不能暴露任何实现细节。比如 uploadToAliyun() 就不符合要求，应该改为更加抽象的命名方式，如 upload()。
* 封装具体的实现细节。如，跟阿里云相关的特殊上传或下载流程不应该暴露给调用者。
* 为实现类定义抽象的接口。具体的实现类都依赖统一的接口定义，遵从一致的上传功能协议。使用者依赖接口，而不是具体的实现类来编程。

```java
public interface ImageStore {
  String upload(Image image, String bucketName);
  Image download(String url);
}

public class AliyunImageStore implements ImageStore {
  // ...
}

public class PrivateImageStore implements ImageStore  {
  // ...
}

// 使用 ImageStore
public class ImageProcessingJob {
  private static final String BUCKET_NAME = "ai_images_bucket";
  public void process() {
    Image image = ...;
    ImageStore imageStore = new PrivateImageStore(...);
    imagestore.upload(image, BUCKET_NAME);
  }
}
```

#### 是否需要为每个类定义接口

这条原则的设计初衷是，*将接口和实现相分离，封装不稳定的实现，暴露稳定的接口*。上游系统面向接口而非实现编程，不依赖不稳定的实现细节，这样当实现发生变化的时候，上游系统的代码基本上不需要做改动，以此来降低代码间的耦合性，提高代码的扩展性。

从这个设计初衷上来看，如果在我们的业务场景中，某个功能只有一种实现方式，未来也不可能被其他实现方式替换，那就没有必要为其设计接口，也没有必要基于接口编程，直接使用实现类就可以了。

越是不稳定的系统，我们越是要在代码的扩展性、维护性上下功夫。相反，如果某个系统特别稳定，在开发完之后，基本上不需要做维护，那我们就没有必要为其扩展性，投入不必要的开发时间。

<div class="comment">评论区精选</div>

* 我反对接口是 has-a 的说法，坚持接口的语义是 *behaves like* 。咱们看下哪个更通顺达意 "A AliyunImageStorage has a DataStorage" or "A AliyunImageStorage behaves like a DataStorage"? (Gavin 观点，*拥有某种能力* 怎么翻比较好？)
* 讲接口的时候应该提到 *接口的多重继承特性* 。吸血鬼继承了蝙蝠和人，是蝙蝠？是人？是，也不是。这时将多重继承理解为 *拥有多种特性* 比较合理。一个类可以具有多重行为，但不能是多种东西。
* Java 接口中可以定义静态方法、default 方法，枚举类型，接口中还可以定义接口(嵌套)。
* 在 Java8 之前，定义的接口不能有具体实现，后续维护时如果想要在接口中新增方法，必须在所有实现类中都实现一遍。其实可能只有几个新的实现类要去具体实现，其他实现类用默认实现就好。Java8 中的接口支持使用 default 关键字来实现一个默认方法，解决了前述麻烦。



## 组合 vs 继承

> *通过 组合、接口、委托 三个技术手段替换 <span style="border: 1px solid;">复杂</span> 的继承关系。*

在面向对象编程中，有一条非常经典的设计原则，那就是：组合优于继承，多用组合少用继承。为什么不推荐使用继承？组合相比继承有哪些优势？如何判断该用组合还是继承？今天，我们就围绕着这三个问题，来详细讲解一下这条设计原则。

继承最大的问题就在于：*继承层次过深、继承关系过于复杂 会影响到代码的可读性和可维护性*。

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

*尽管我们鼓励多用组合少用继承，但组合也并不是完美的，继承也并非一无是处*。从上面的例子来看，继承改写成组合意味着要做更细粒度的类的拆分。我们要定义更多的类和接口。类和接口的增多也就或多或少的增加代码的复杂程度和维护成本。所以，在实际的项目开发中，我们还是要根据具体的情况来进行选择。

如果类之间的继承结构稳定(不会轻易改变)，继承层次比较浅，继承关系不复杂，我们就可以大胆地使用继承。反之，系统越不稳定，继承层次很深，继承关系复杂，我们就尽量使用组合来替代继承。

除此之外，还有一些设计模式会固定使用继承或者组合。如，装饰者模式（decorator pattern）、策略模式（strategy pattern）、组合模式（composite pattern）等都使用了组合关系，而模板模式（template pattern）使用了继承关系。

利用继承特性，我们把相同的属性和方法，抽取出来，定义到父类中。子类复用父类中的属性和方法，达到代码复用的目的。但是，有的时候，从业务含义上，A 类和 B 类并不一定具有继承关系。比如 Crawler 类和 PageAnalyzer 类 都用到了 URL 拼接和分割的功能，但并不具有继承关系。仅仅为了代码复用，生硬地抽象出一个父类，会影响到代码的可读性，此时使用组合更为合理。



## 贫血模型 vs 充血模型

总结一下的话就是，基于贫血模型的传统的开发模式，重 Service 轻 BO；基于充血模型的 DDD 开发模式，轻 Service 重 Domain。

```
Controller.getBook(id) {
  BookService.get(id) {
    BookRepository.findOne(id)
  }
}
```



## 实战案例：分析 设计 实现





