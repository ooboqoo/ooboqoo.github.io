# 算法


可视化展示 https://www.cs.usfca.edu/~galles/visualization/Algorithms.html  
可视化展示 https://visualgo.net/en  



https://medium.com/@_marcos_otero/the-real-10-algorithms-that-dominate-our-world-e95fa9f16c04

> Informally, an algorithm is any well-defined computational procedure that takes
some value, or set of values, as input and produces some value, or set of values, as
output. An algorithm is thus a sequence of computational steps that transform the
input into the output.
>
> 坦白地讲，算法是指一切经过明确定义的计算过程，其将某个或某组值作为输入内容，并产生某个或某组值作为输出结果。因此，算法代表的是一系列计算步骤，用于将输入转换为输出。
>
> Source: Thomas H. Cormen, Chales E. Leiserson (2009), Introduction to Algorithms 3rd edition.

1. Merge Sort, Quick Sort and Heap Sort 合并排序，快速排序与堆排序
2. Fourier Transform and Fast Fourier Transform 傅利叶变换与快速傅利叶变换
3. Dijkstra’s algorithm 迪杰斯特拉算法
4. RSA algorithm RSA 算法
5. Secure Hash Algorithm 安全哈希算法
6. Integer factorization 整数分解
7. Link Analysis 链接分析
8. Proportional Integral Derivative Algorithm 比例微积分算法
9. Data compression algorithms 数据压缩算法
10. Random Number Generation 随机数生成算法

## 为什么要学数据结构和算法

### 论基础知识的重要性

他(原腾讯 T4 大牛)用了不到半年时间，就把区块链的整个技术脉络摸清楚了。他曾经跟我说，像区块链、人工智能这些看似很新的技术，其实一点儿都不新。当面临行业变动、新技术更迭的时候，那些所谓的新技术，核心和本质的东西其实还是当初学的那些知识。所以说，基础知识就像是一座大楼的地基，它决定了我们的技术高度。

> 评论区精选

* *程序员两条腿，一条是算法，一条是英文*。
* *数据结构和算法是区分一个普通程序员和一个优质高潜程序员永远的金线*。

### 为什么要学习数据结构和算法

为什么大厂都喜欢考算法？越是厉害的公司，越是注重考察数据结构与算法这类基础知识。*相比短期能力，他们更看中你的长期潜力*。

大部分业务开发都是基于现有框架，很少需要自己实现数据结构和算法。但不需要自己实现，并不代表什么都不需要了解。如果不知道这些类库背后的原理，不懂得时间、空间复杂度分析，你如何能用好、用对它们？存储某个业务数据的时候，你如何知道该用 ArrayList 还是 LinkedList？调用某个函数后，又该如何评估代码的性能和资源消耗？掌握数据结构和算法，不管对于阅读框架源码，还是理解其背后的设计思想，都是非常有用的。

基础架构研发工程师，写出达到开源水平的框架才是你的目标！不同的人做出的框架，架构设计思路都差不多，实现的功能也都差不多。但有的人做出来的框架，Bug 多、性能一般、扩展性也不好，只能在自己公司的几个项目里用用。而有的人做的框架可以开源给很多人用，甚至被 Apache 收录。为什么会有这么大的差距呢？我觉得，高手之间的竞争其实就在细节。这些细节包括：你用的算法够不够优化，数据存取的效率够不够高，内存够不够省等等。这些累积起来，决定了一个框架是否优秀。

对编程还有追求？不想被行业淘汰？那就不要只会写凑合能用的代码！我曾经面试过很多大龄候选人，简历能写十几页，经历的项目有几十个，但细看下来，每个项目都只是在重复地堆砌业务逻辑，完全没有难度递进，看不到能力提升。十年的积累可能跟一年的积累没有多大区别。这样的人，怎么不会被行业淘汰呢？

其实，我觉得，数据结构和算法这个东西，如果你不去学，可能真的这辈子都用不到，也感受不到它的好。但是一旦掌握，你就会常常被它的强大威力所折服。之前你可能需要费很大劲儿来优化的代码，需要花很多心思来设计的架构，用了数据结构和算法之后，很容易就可以解决了。

我们学习数据结构和算法，并不是为了死记硬背几个知识点。我们的*目的是建立时间复杂度、空间复杂度意识*，写出高质量的代码，能够设计基础架构，提升编程技能，训练逻辑思维，积攒人生经验，以此获得工作回报，实现你的价值，完善你的人生。

> 评论区精选

* 入职不久，就遇到一个需求，需要建立一个包含3G(30亿)条键值对映射的...
* 作者：十年磨一剑说的太好了，我也是这么认为的。做技术就是不能浮躁，要耐得住寂寞，沉得下心。
* 我是一名iOS开发，怎么觉得算法也没那么重要。作者：如果希望在本地存储一个多级地址列表，怎么存，怎么做增量更新...
* 那些说过了35就不行的码农大部分都是不求上进的人

### 学习方法

很多人在第一次接触这门课时，会觉得数据结构和算法很抽象，晦涩难懂，对这门课望而却步。实际上，数据结构和算法的东西并不多，常用的、基础的知识点更是屈指可数。只要掌握了正确的学习方法，学起来并没有看上去那么难，更不需要什么高智商。

从广义上讲，数据结构就是指一组数据的存储结构，算法就是操作数据的一组方法。现实示例：图书馆如何存放图书，图书管理员如何查找书籍。数据结构和算法是相辅相成的，数据结构是为算法服务的，而算法要作用在特定的数据结构之上。

从狭义上讲，数据结构和算法特指经典数据结构和算法，它们都是前人从很多实际操作场景中抽象出来的，经过了非常多的求证和检验，可以高效地帮助我们解决很多实际的开发问题。

想要学习数据结构与算法，首先要掌握一个数据结构与算法中最重要的概念——**复杂度分析**。这个概念几乎占了这门课的半壁江山，是数据结构和算法学习的精髓。*数据结构和算法解决的是如何更省、更快地存储和处理数据的问题*，因此，我们就需要一个 *考量效率和资源消耗的方法，这就是复杂度分析方法*。所以，如果你只掌握了数据结构和算法的特点、用法，但是没有学会复杂度分析，那就相当于只知道操作口诀，而没掌握 *心法*。

不管是应付面试还是工作需要，只要攻克这 20 个最常用的、最基础的数据结构与算法就足够了。这里面有 10 个数据结构：*数组、链表、栈、队列、散列表、二叉树、堆、跳表、图、Trie 树*；10 个算法：*递归、排序、二分查找、搜索、哈希算法、贪心算法、分治算法、回溯算法、动态规划、字符串匹配算法*。掌握了这些基础的数据结构和算法，再学更加复杂的数据结构和算法，就会非常容易。

在学习数据结构和算法的过程中，要学习它的 *来历*、*自身的特点*、*适合解决的问题* 以及 *实际的应用场景*。

学习数据结构和算法的过程，*是非常好的思维训练的过程*，所以，千万不要被动地记忆，要多辩证地思考，多问为什么。如果你一直这么坚持做，你会发现，等你学完之后，写代码的时候就会不由自主地考虑到很多性能方面的事情，时间复杂度、空间复杂度非常高的垃圾代码出现的次数就会越来越少。你的编程内功就真正得到了修炼。

学习技巧：*边学边练，适度刷题*；多问，多思考，多互动。


> 评论区精选

* 新知识和基础之间该如何取舍？作者：先夯实基础。新的框架、技术太多，学了项目中用不上很快就忘，就权当是开拓眼界了。



## 复杂度分析

复杂度分析是整个算法学习的精髓，只要掌握了它，数据结构和算法的内容基本上就掌握了一半。

采用 **事后统计法** 评估算法的执行效率是可行的，但这种统计方法也存在非常大的局限性：测试结果非常依赖测试环境，且受数据规模的影响很大。所以我们需要一个不用具体的测试数据来测试，就可以*粗略地估计算法的执行效率*的方法。这就是我们今天要讲的时间、空间复杂度分析方法。

**复杂度** 也叫 **渐进复杂度**，包括 **时间复杂度** 和 **空间复杂度**，*用来分析算法执行效率与数据规模之间的增长关系*。复杂度分析并不难，关键在于多练。

```c
int cal(int n) {
  int sum = 0;       // 1 unit_time
  int i = 1;         // 1 unit_time
  for (; i <= n;) {  // n unit_time
    sum = sum + i;   // n unit_time
    ++i;             // n unit_time
  }
  return sum;
}
// 代码总的执行时间是 3n + 2 unit_time (假设每行代码执行占用的时间相同)
```

```c
int cal(int n) {
  int sum = 0;
  for (int i = 1; i <= n; ++i) {
    for (int j = 1; j <= n; ++j) {
      sum = sum + i * j;
    }
  }
}
// 代码总的执行时间是 3n^2 + 3n + 2 unit_time (假设每行代码执行占用的时间相同)
```

通过上两段代码执行时间的推导过程，我们可以得到一个非常重要的规律，那就是，所有代码的执行时间 `T(n)` 与每行代码的执行次数 `n` 成正比。我们可以把这个规律总结成一个公式: `T(n) = O(f(n))`。`T(n)` 表示代码执行的时间，`n` 表示数据规模的大小，`f(n)` 表示每行代码执行的次数总和，因为这是一个公式，所以用 `f(n)` 来表示。公式中的 `O` 表示代码的执行时间 `T(n)` 与 `f(n)` 表达式成正比。这就是 **大 O 时间复杂度表示法**。

大 O 时间复杂度实际上并不具体表示代码真正的执行时间，而是表示 *代码执行时间随数据规模增长的变化趋势*，所以，也叫作 **渐进时间复杂度**（asymptotic time complexity），简称 **时间复杂度**。

当 n 很大(如 1k 100K)时，公式中的 *低阶、常量、系数三部分并不左右增长趋势，都可以忽略*。我们只需要记录一个最大量级就可以了，如果用大 $O$ 表示法表示刚才那两段代码的时间复杂度，可以记为：$T(n) = O(n)$ 和 $T(n) = O(n^2)$。

### 时间复杂度分析

我们在分析一个算法、一段代码的时间复杂度的时候，*只须关注循环执行次数最多的那一段代码就可以了*。

*加法法则*：我们可以分别分析每一部分的时间复杂度，然后把它们放到一块儿，再取一个量级最大的作为整段代码的复杂度。

*乘法法则*：嵌套代码的复杂度等于嵌套内外代码复杂度的乘积。

### 常见的时间复杂度

![](images/o-notation.png)

https://en.wikipedia.org/wiki/Big_O_notation

虽然代码千差万别，但是常见的复杂度量级并不多，可以粗略地分为两类
* 多项式量级：常量阶 <i>$O(1)$</i>，对数阶 <i>$O(logn)$</i>，线性阶 <i>$O(n)$</i>，线性对数阶 <i>$O(nlogn)$</i>，平方阶 <i>$O(n^2)$</i>, ... k次方阶 <i>$O(n^k)$</i>
* 非多项式量级：指数阶 <i>$O(2^n)$</i>， 阶乘阶 <i>$O(n!)$</i>

常量阶 constant  
对数阶 logarithmic  _/ˌlɒɡəˈrɪðmɪk/_  adj. 对数的  
线性阶 linear  _/ˈlɪniəʳ/_  adj. 线性的  
线性对数阶 linearithmic  
平方阶 quadratic  _/kwɒˈdrætɪk/_  adj. 二次的  quadratic equation 二次方程  
k次方阶 polynomial  _/ˌpɑːlɪˈnoʊmiəl/_  n. 多项式  
指数阶 exponential  _/ˌekspəˈnenʃəl◂/_  adj. 成指数倍增的  
阶乘阶 factorial  _/fækˈtɔːriəl/_  n. 阶乘  

---

我们把时间复杂度为非多项式量级的算法问题叫作 NP（Non-Deterministic Polynomial，非确定多项式）问题。当数据规模 n 越来越大时，非多项式量级算法的执行时间会急剧增加，无实际应用价值。所以我们这里只关注几种常见的多项式时间复杂度。

##### $O(1)$

首先你必须明确一个概念，$O(1)$ 只是常量级时间复杂度的一种表示方法，并不是指只执行了一行代码。或者说，一般情况下，只要算法中不存在循环语句、递归语句，即使有成千上万行的代码，其时间复杂度还是 $Ο(1)$。

##### $O(logn)$、$O(nlogn)$

```c
while (i < n) i = i * 2;  // i = 1, 2, 4 ... 2^k ... 2^x (值 >= n)，是个等比数列
// 2^x = n  => x = log2(n) 所以这段代码的时间复杂度为 O(logn)

while (i < n) i *= 3;  // log3(n) 时间复杂度仍记为 O(logn)
```

我们知道，对数之间是可以互相转换的，$log_3n$ 就等于 $log_32 * log_2n$，所以 $O(log_3n) = O(C *  log_2n)$，其中 $C=log_32$ 是一个常量。基于我们前面的一个理论：在采用大 $O$ 标记复杂度的时候，可以忽略系数，即 $O(Cf(n)) = O(f(n))$。所以，$O(log_2n)$ 就等于 $O(log_3n)$。因此，在对数阶时间复杂度的表示方法里，我们忽略对数的底，统一表示为 $O(logn)$。

##### $O(m+n)$ $O(m*n)$

(略)


### 空间复杂度分析


**时间复杂度** 的全称是 **渐进时间复杂度**，*表示算法的执行时间与数据规模之间的增长关系*。类似地，**空间复杂度** 全称就是 **渐进空间复杂度**（asymptotic space complexity），*表示算法的存储空间与数据规模之间的增长关系*。

空间复杂度分析比时间复杂度分析要简单地多。常见的空间复杂度有 <i>$O(1)$、$O(n)$、$O(n^2)$</i>。

```cpp
void print(int n) {
  int i = 0;            // O(1)
  int *p = new int(n);  // O(n)
  // ...
}
```

### 最好、最坏情况时间复杂度

```c
// 在数组 array 中查找元素 x 的位置，n 表示数组 array 的长度
int find(int array[], int n, int x) {
  for (int i = 0; i < n; ++i) {
    if (array[i] == x)
      return i;
  }
  return -1;
}
// 最好情况时间复杂度 O(1)  最坏情况时间复杂度 O(n)
```

为了表示代码在不同情况下的不同时间复杂度，我们需要引入三个概念：**最好情况时间复杂度** (best case time complexity)、**最坏情况时间复杂度** (worst case time complexity) 和 **平均情况时间复杂度** (average case time complexity)。

### 平均情况时间复杂度

再分析上面的例子。我们知道，要查找的变量 x，要么在数组里，要么就不在数组里。这两种情况对应的概率统计起来很麻烦，为了方便理解，我们假设两种情况的概率都为 $\frac 1 2$。另外，要查找的数据出现在 0 ～ n-1 这 n 个位置中的概率也是一样的，为 $\frac 1 n$。所以，根据概率乘法法则，要查找的数据出现在 0 ～ n-1 中任意位置的概率就是 $\frac 1 {2n}$。那平均时间复杂度的计算过程就是：

$$ (1 + 2 + 3 + \cdots + n) \times \frac 1 {2n} + n \times \frac 1 2 = \frac {3n + 1} 4 $$

这个值就是概率论中的加权平均值，也叫作期望值，所以平均时间复杂度的全称应该叫 **加权平均时间复杂度** 或 **期望时间复杂度**。

在大多数情况下，我们并不需要区分最好、最坏、平均情况时间复杂度这三种情况。只有在不同的情况下时间复杂度有量级的差距时，我们才会使用这三种复杂度表示法来区分。

### 均摊时间复杂度

**均摊时间复杂度** (amortized time complexity) 和 **摊还分析**(或叫 **平摊分析**) 应用场景比较特殊，并不会经常用到。我这里简单总结一下它们的应用场景，如果你遇到了，知道是怎么回事就行了。对一个数据结构进行一组连续操作时，大部分情况下时间复杂度都很低，只有个别情况下时间复杂度比较高，而且这些操作之间存在前后连贯的时序关系，这个时候，我们就可以将这一组操作放在一块儿分析，看是否能将较高时间复杂度那次操作的耗时，平摊到其他那些时间复杂度比较低的操作上。而且，*在能够应用均摊时间复杂度分析的场合，一般均摊时间复杂度就等于最好情况时间复杂度*。

尽管很多数据结构和算法书籍都花了很大力气来区分平均时间复杂度和均摊时间复杂度，但其实我个人认为，均摊时间复杂度就是一种特殊的平均时间复杂度，没必要花太多精力去区分它们。你最应该掌握的是它的分析方法，摊还分析。至于分析出来的结果是叫平均还是叫均摊，只是个说法而已，并不重要。


<script async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
<script>
  window.MathJax = {
    tex: {
      inlineMath: [ ['$','$'], ['\\(','\\)'] ],
    },
  }
</script>
