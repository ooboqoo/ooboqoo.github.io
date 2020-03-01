# 设计模式学习导读


## 开篇词

“数据结构与算法” 是教你写出 *高效的代码*，而设计模式则是教你写出 *高质量的代码*。

写出 “能用” 代码的人比比皆是，但是，并不是每个人都能写出 “好用” 的代码。只会写能用的代码永远无法成长为大牛。

### 程序员的看家本领你得练好

后来我熟练掌握了各种编写高质量代码的技巧、方法和理论，我发现，实际上，写烂代码和好代码花费的时间是差不多的。加入其他公司之后，项目的代码质量因为各种原因有所妥协，但我知道什么样的代码是高质量代码。

一个人闷头看书效果并不好，一对一手把手指导才最有效。

### 我是如何设计这个专栏的？

整个专栏的文章总共有 100 多篇，每篇平均下来在 5000 字左右，所以你总共需要学习 50 万字。为什么篇幅会这么多？这是因为，我想一次性把跟编写高质量代码相关的所有知识，都系统、全面地讲清楚，一次性给你讲透彻。你看完我这一个专栏，就能搞清楚所有跟写高质量代码相关的知识点。


## 应尽早地学习并掌握设计模式

我觉得，设计模式和操作系统、组成原理、编译原理等这些基础学科是不一样的。它虽然也算是一门基础知识，但是它更类似于数据结构和算法，相比那些更加基础的学科，设计模式能更直接地提高你的开发能力。数据结构和算法教你写出高效代码，而设计模式讲的是如何写出可扩展、可读、可维护的高质量代码，所以，它们跟平时的编码会有直接的关系，也会直接影响到你的开发能力。

### 应对面试中的设计模式相关问题

在求职面试中，设计模式问题是被问得频率比较高的一类问题，特别是大厂，比较重视候选人的基本功，经常会问算法、设计模式。

我在求职面试的时候，都会提前准备。虽然底子比较好，但每次面试前还是需要花很短的时间重新温习一下。

### 告别写被人吐槽的烂代码

你写的代码实际上就是你的名片。

这些年的工作经历中，我见过太多的烂代码，比如命名不规范、类设计不合理、分层不清晰、没有模块化概念、代码结构混乱、高度耦合等等。这样的代码维护起来非常费劲，添加或修改一个功能，常常会牵一发而动全身，无从下手，恨不得将全部的代码删掉重写。

当然，我也看到过很多让我眼前一亮的代码。每当我看到这样的好代码，都会立刻对作者产生无比的好感和认可。代码写得好，能让你在团队中脱颖而出。

我的专栏，不仅仅只是讲解设计模式，更重要的是，我会通过实战例子，手把手教你如何避免刚刚提到的代码问题，告别被人诟病的烂代码，写出令人称道的好代码，成为团队中的代码标杆！

### 提高复杂代码的设计和开发能力

大部分工程师比较熟悉的都是编程语言、工具、框架这些东西，因为每天的工作就是在框架里根据业务需求填充代码。这样的工作并不需要你具备很强的代码设计能力，只要单纯的能理解业务，翻译成代码就可以了。

但有一天我的 leader 让我开发一个跟功能无关的、比较通用的功能模块。面对这样稍微复杂的代码设计和开发，我就发现有点力不从心，不知从何下手。因为我知道只是完成功能、代码能用，可能并不复杂，但是要想写出易扩展、易用、易维护的代码，并不容易。

如何分层、分模块？应该怎么划分类？每个类应该具有哪些属性、方法？怎么设计类之间的交互？该用继承还是组合？该用接口还是抽象类？怎样做到高内聚低耦合？该用单例模式还是静态方法？用工厂模式创建对象还是直接 new 出来？如何避免引入设计模式提高扩展性的同时带来的降低可读性问题？。。。各种问题，一下子挤到了我面前。

### 读源码、学框架事半功倍

对于一个有追求的程序员来说，对技术的积累，既要有广度，也要有深度。很多技术人早早就意识到了这一点，所以在学习框架、中间件的时候，都会抽空去研究研究原理，读一读源码，希望能在深度上有所积累，而不只是略知皮毛，会用而已。

从我的经验和同事的反馈来看，有些人看源码，经常会遇到看不懂、看不下去的的问题。实际上，这个问题的原因很简单，那就是你积累的基本功还不够，你的能力还不足以看懂这些代码。

优秀的开源项目、框架、中间件，代码量、类的个数都会比较多，类结构、类之间的关系极其复杂，常常调用来调用去。所以，为了保证代码的扩展性、灵活性、可维护性等，代码中会使用到很多设计模式、设计原则或者设计思想。如果你不懂这些，在看代码时可能就琢磨不透作者的设计思路。相反，如果你一眼就能参透作者的设计思路、设计初衷，就可以把脑容量释放出来，重点思考其他问题，代码读起来就会变得轻松了。

实际上，除了看不懂、看不下去的问题，还有一个隐藏的问题，你可能自己都发现不了，那就是你自己觉得看懂了，实际上，里面的精髓你并没有 get 到多少！如果你没有积累深厚的基本功，也就不能完全参透它的精髓，只是了解个皮毛，看个热闹而已。

因此，学好设计模式相关的知识，不仅能让你更轻松地读懂开源项目，还能更深入地参透里面的技术精髓，做到事半功倍。

### 为你的职场发展做铺垫



## 评判代码质量好坏的维度

```txt
灵活性（flexibility） 可扩展性（extensibility） 可维护性（maintainability） 可读性（readability） 可理解性（understandability） 易修改性（changeability） 可复用（reusability） 可测试性（testability）
模块化（modularity） 高内聚低耦合（high cohesion loose coupling） 高效（high effciency） 高性能（high performance） 安全性（security） 兼容性（compatibility） 易用性（usability）
整洁（clean） 清晰（clarity） 简单（simple） 直接（straightforward）
少即是多（less code is more） 文档详尽（well-documented） 分层清晰（well-layered）
正确性（correctness、bug free） 健壮性（robustness） 鲁棒性（robustness） 可用性（reliability） 可伸缩性（scalability） 稳定性（stability）
优雅（elegant） 好（good） 坏（bad）……
```

仔细看前面罗列的所有代码质量评价标准，你会发现，有些词语过于笼统、抽象，比较偏向对于整体的描述，比如优雅、好、坏、整洁、清晰等；有些过于细节、偏重方法论，比如模块化、高内聚低耦合、文档详尽、分层清晰等；有些可能并不仅仅局限于编码，跟架构设计等也有关系，比如可伸缩性、可用性、稳定性等。为了做到有的放矢、有重点地学习，我挑选了其中几个最常用的、最重要的评价标准，来详细讲解。

### 可维护性 maintainability


### 可读性 readability


### 可扩展性 extensibility


### 灵活性 flexibility


### 简洁性 simplicity


### 可复用性 reusability


### 可测试性 testability


### 如何写出高质量的代码

我们刚刚讲到了七个最常用、最重要的评价指标。所以，问如何写出高质量的代码，也就等同于在问，如何写出易维护、易读、易扩展、灵活、简洁、可复用、可测试的代码。要写出满足这些评价标准的高质量代码，我们需要掌握一些更加细化、更加能落地的编程方法论，包括面向对象设计思想、设计原则、设计模式、编码规范、重构技巧等。而所有这些编程方法论的最终目的都是为了编写出高质量的代码。比如，面向对象中的继承、多态能让我们写出可复用的代码；编码规范能让我们写出可读性好的代码；设计原则中的单一职责、DRY、基于接口而非实现、里氏替换原则等，可以让我们写出可复用、灵活、可读性好、易扩展、易维护的代码；设计模式可以让我们写出易扩展的代码；持续重构可以时刻保持代码的可维护性等等。



## 面向对象、设计原则、设计模式、编程规范、重构

我们整个专栏的内容也是围绕着这几块展开讲解的。所以，今天我就先来简单介绍一下这几个概念，并且说一说它们之间的联系。

### 面向对象

主流的编程范式或者编程风格有三种：面向过程、面向对象和函数式编程。面向对象是最主流的，其具有丰富的特性(封装、抽象、继承、多态)，可以实现很多复杂的设计思路，是很多设计原则、设计模式编码实现的基础。所以在专栏的最开始，我们会详细地讲解面向对象编程的相关知识，为后面的学习做铺垫。对于这部分内容，需要掌握下面 7 个大的知识点。

* 面向对象的四大特性：封装、抽象、继承、多态
* 面向对象编程与面向过程编程的区别和联系
* 面向对象分析、面向对象设计、面向对象编程
* 接口和抽象类的区别以及各自的应用场景
* 基于接口而非实现编程的设计思想
* 多用组合少用继承的设计思想
* 面向过程的贫血模型和面向对象的充血模型

### 设计原则

设计原则是指导我们代码设计的一些经验总结。设计原则这块的知识有一个非常大的特点，那就是这些原则听起来都比较抽象，定义描述都比较模糊，不同的人会有不同的解读。所以如果单纯地去记忆定义，对于编程、设计能力的提高，意义并不大。对于每一种设计原则，我们需要掌握它的 *设计初衷，能解决哪些编程问题，有哪些应用场景*。只有这样，我们才能在项目中灵活恰当地应用这些原则。

你需要透彻理解并掌握下面这几个常用的设计原则。

* SOLID 原则 —— SRP 单一职责原则
* SOLID 原则 —— OCP 开闭原则
* SOLID 原则 —— LSP 里式替换原则
* SOLID 原则 —— ISP 接口隔离原则
* SOLID 原则 —— DIP 依赖倒置原则
* DRY 原则、KISS 原则、YAGNI 原则、LOD 法则

### 设计模式

设计模式是针对软件开发中经常遇到的一些设计问题总结出来的一套解决方案或设计思路。大部分设计模式要解决的都是 *代码的可扩展性* 问题。设计模式相对于设计原则来说，没有那么抽象，而且大部分都不难理解，代码实现也并不复杂。这一块的学习难点是了解它们都能解决哪些问题，*掌握典型的应用场景，并且懂得不过度应用*。

经典的设计模式有 23 种。随着编程语言的演进，一些设计模式(如 Singleton)也随之过时，甚至成了反模式，一些则内置到了编程语言中(如 Iterator)，另外还有一些新的模式诞生(如 Monostate)。在专栏中，我们会重点讲解 23 种经典的设计模式。它们可分为三大类：创建型、结构型、行为型。在学习时我们应有所侧重，因为有些比较常用，而有些则很少被用到。

||||
-------|--------|--------------------------------------------------------
创建型  | 常用   | 单例模式、工厂模式(工厂方法和抽象工厂)、建造者模式
创建型  | 不常用 | 原型模式
结构型  | 常用   | 代理模式、桥接模式、装饰者模式、适配器模式
结构型  | 不常用 | 门面模式、组合模式、享元模式
行为型  | 常用   | 观察者模式、模版模式、策略模式、职责链模式、迭代器模式、状态模式
行为型  | 不常用 | 访问者模式、备忘录模式、命令模式、解析器模式、中介模式

### 编程规范

编程规范主要解决的是 *代码的可读性* 问题。编码规范相对于设计原则、设计模式，更加具体、更加偏重代码细节。

对于编码规范，很多书籍都已经讲得很好了(如 “重构” “代码大全” “代码整洁之道” 等)。而且，每条编码规范都非常简单、非常明确，比较偏向于记忆，只要照着做就可以了。我总结了我认为最能改善代码质量的 20 条规范，如果你暂时没时间去看那些经典的书籍，看我这些就够了。

除此之外，专栏并没有将编码规范单独作为一个模块来讲解，而是跟重构放到了一起。之所以这样做，那是因为我把重构分为大重构和小重构两种类型，而小重构利用的知识基本上就是编码规范。

除了编码规范，我们还会介绍一些代码的坏味道，让你知道什么样的代码是不符合规范的，应该如何优化。参照编码规范，你可以写出可读性好的代码；参照代码的坏味道，你可以找出代码存在的可读性问题。

### 重构

在软件开发中，只要软件在不停地迭代，就没有一劳永逸的设计。随着需求的变化，代码的不停堆砌，原有的设计必定会存在这样那样的问题。针对这些问题，我们就需要进行代码重构。重构是软件开发中非常重要的一个环节。持续重构是保持代码质量不下降的有效手段，能有效避免代码腐化到无可救药的地步。

而重构的工具就是我们前面罗列的那些面向对象设计思想、设计原则、设计模式、编码规范。实际上，设计思想、设计原则、设计模式一个最重要的应用场景就是在重构的时候。我们前面讲过，虽然使用设计模式可以提高代码的可扩展性，但过度不恰当地使用，也会增加代码的复杂度，影响代码的可读性。在开发初期，除非特别必须，我们一定 *不要过度设计*，应用复杂的设计模式。而是当代码出现问题的时候，我们再针对问题，应用原则和模式进行重构。这样就能有效避免前期的过度设计。

对于重构这部分内容，你需要掌握以下几个知识点：
* 重构的目的（why）、对象（what）、时机（when）、方法（how）；
* 保证重构不出错的技术手段：单元测试和代码的可测试性；
* 两种不同规模的重构：大重构（大规模高层次）和小重构（小规模低层次）。

### 五者之间的联系

* 面向对象编程因为其具有丰富的特性(封装、抽象、继承、多态)，可以实现很多复杂的设计思路，是很多设计原则、设计模式等编码实现的基础。
* 设计原则是指导我们代码设计的一些经验总结。对于某些场景下，是否应该应用某种设计模式，具有指导意义。比如，“开闭原则”是很多设计模式(策略、模版等)的指导原则。
* 设计模式是针对软件开发中经常遇到的一些设计问题，总结出来的一套解决方案或者设计思路。从抽象程度上来讲，设计原则更抽象，设计模式则更加具体、可执行。
* 编码规范相对于设计原则、设计模式，更加具体、更加偏重代码细节、更加能落地。持续的小重构依赖的理论基础主要就是编程规范。
* 重构作为保持代码质量不下降的有效手段，利用的就是面向对象、设计原则、设计模式、编码规范这些理论。

![](images/design-pattern/overview.png)
