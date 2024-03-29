# 6 面向对象的程序设计


ECMA-262 把对象定义为“无序属性的集合，其属性可以包含基本值、对象或者函数”。对象的每个属性或方法都有一个名字，而每个名字都映射到一个值。

每个对象都是基于一个引用类型创建的，这个引用类型可以是原生类型，也可以是开发人员定义的类型。



<div>
<h2>6.1 理解对象</h2>
<h3>6.1.1 属性类型</h3>
<p>ES5在定义只有内部才用的特性（attribute）时，描述了属性（preperty）的各种特征。这些特征是为了实现JS引擎用的，因此在JS中不能直接访问它们。为了表示特性的内部值，该规范把它们放在了两对方括号中，例如[[Enumerable]]。</p>
<h4>1. 数据属性</h4>
<p>数据属性有4个描述其行为的特性</p>
<ul>
<li>[[Configurable]] 能否通过delete 删除属性，能够修改属性</li>
<li>[[Enumerable]] 能否通过for-in循环返回属性</li>
<li>[[Writable]] 都否修改属性的value</li>
<li>[[Value]] 属性的数据值</li>
</ul>
<p>要修改属性默认的特性，必须使用ES5的Object.defineProperty() 方法。这个方法接收三个参数：属性所在的对象、属性的名字和一个描述符对象。</p>
<pre>
var person = {};
Object.defineProperty(person, "name",{   //name的引号不能省
  writabel:false, value: "Nicholas",  // 设定person.name 的值为 Nicholas 且不可修改
  configurable:false  // 一旦把属性定义为不可配置，就不能再把它变回去了
});
</pre>
<p>在调用 Object.definePorperty() 方法时，如果不指定，configurable enumerable 和 writable 特性的默认值都是 false。多数情况下，可能都没有必要利用 Object.defineProperty() 方法提供的这些高级功能。</p>
<h4>2. 访问器属性</h4>
<p>访问器属性不包含数据值，它们包含一对 get 和 set 函数。在读取访问器属性时，会调用set函数，而写入访问器属性时会调用set函数。</p>
<ul>
<li>[[Configurable]] 能否通过delete 删除属性</li>
<li>[[Enumerable]] 能否通过for-in循环返回属性</li>
<li>[[Get]] 读取属性时调用的函数，默认值 undefined</li>
<li>[[Set]] 写入属性时调用的函数，默认值 undefined</li>
</ul>
<pre>
var book ={ _year:2004, edition:1 };
Object.defineProperty(book,"year",{
  get: function(){ return this._year;},
  set: function(newValue){ if (newValue &gt; 2004){
    this._year = newValue;
    this.edtion += NewValue -2004;
  }}
});
book.year = 2005;
alert(book.edition);  // 2
</pre>
<p>这是使用访问器属性的常见方法，即设置一个属性的值会导致其他属性发生变化。</p>
<p>不一定非要同时指定get 和 set。只指定 get 意味着属性不能写，只指定 set 意味着属性不能读。</p>

<h3>6.1.2 定义多个属性</h3>
<p>由于为对象定义多个属性的可能性很大，ES5定义了一个 Object.defineProperties()方法。这个方法接收两个对象参数：第一个对象是要添加和修改其属性的对象，第二个对象的属性与第一个对象中要添加或修改的属性一一对应。</p>

<h3>6.1.3 读取属性的特性</h3>
<p>ES5 的 Object.getOwnPropertyDescriptor()方法，可以取得给定属性的描述符。</p>
<pre>
var descriptor = Object.getOwnPropertyDescriptor(book,"_year");
alert(descriptor.configurable);  // false
</pre>
</div>

<h1>6.2 创建对象</h1>

<div>
<p>使用预定义对象只是面向对象语言的能力的一部分，它真正强大之处在于能够创建自己专用的类和对象。ECMAScript 拥有很多创建对象或类的方法。</p>
</div>

<div>
<h2>6.2.1 工厂方式</h2>
<h3>原始的方式</h3>
<p>因为对象的属性可以在对象创建后动态定义，所以许多开发者都在 JavaScript 最初引入时编写类似下面的代码：</p>
<pre>var oCar = new Object;
oCar.color = "blue";
oCar.doors = 4;
oCar.showColor = function() { alert(this.color); };
</pre>
<p>不过这里有一个问题，就是如果要创建多个 car 的实例的话，将需要写大量的重复代码。</p>

<h3>工厂模式</h3>
<p>工厂模式是软件工程领域一种广为人知的设计模式，这种模式抽象了创建具体对象的过程。</p>
<pre>function createCar(sColor,iDoors,iMpg) {
  var oTempCar = <code>new Object</code>;
  oTempCar.color = sColor;
  oTempCar.doors = iDoors;
  oTempCar.showColor = function() { alert(this.color); };
  <code>return</code> oTempCar;
}
var oCar1 = createCar("red",4,23);
var oCar2 = createCar("blue",3,25);
</pre>
<p>工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题。</p>
</div>

<div>
<h2>6.2.2 构造函数方式</h2>
<pre>function Car(sColor,iDoors,iMpg) {
  <code>this</code>.color = sColor;
  <code>this</code>.doors = iDoors;
  <code>this</code>.showColor = function() {
    alert(this.color);
  };
}
var oCar1 = <code>new</code> Car("red",4,23);
var oCar2 = <code>new</code> Car("blue",3,25);
</pre>
<p>构造函数不同于工厂模式的地方：</p>
<ul>
<li>没有显式地创建对象；</li>
<li>直接将属性和方法赋给了this对象；</li>
<li>没有return语句</li>
<li>按照惯例，函数名首字母大写</li>
</ul>
<p>要创建 Car 的新实例，必须使用 new 操作符。以这种方式调用构造函数实际上会经历以下4个步骤：</p>
<ol>
<li>创建一个新对象；</li>
<li>将构造函数的作用域赋给新对象（使this指向新对象）；</li>
<li>执行构造函数中的代码（为新对象添加属性）；</li>
<li>返回新对象</li>
</ol>
<p>创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型；而这正是构造函数模式胜过工厂模式的地方。</p>
<p>就像工厂函数，构造函数会重复生成函数，为每个对象都创建独立的函数版本，这是使用构造函数的主要问题。</p>
<p>另外要注意，如果不使用 new 操作符调用构造函数，属性和方法会被添加到 window 对象，造成全局污染。</p>
</div>

<div>
<h2>6.2.3 原型方式</h2>
<p>我们创建的每个函数都有一个 prototype 属性，这个属性是一个指针，指向一个被称为原型对象的对象。这个对象用来包含构造函数所对应类型的所有实例共享的属性和方法。</p>
<p>原型方式就是先用空构造函数来设置类名，然后所有的属性和方法都被直接赋予 prototype 属性。</p>
<pre>function Car() { }
Car.prototype.color = "blue";
Car.prototype.doors = 4;
Car.prototype.showColor = function() { alert(this.color); };
var oCar1 = new Car();
var oCar2 = new Car();
</pre>
<p>此外，使用这种方式，还能用 instanceof 运算符检查给定变量指向的对象的类型。</p>
<p>使用原型方式的最主要的问题是，属性都是被实例所共享的，不能定义每个实例自己的私有属性。</p>

</div>

<div>
<h2 style="color:red">6.2.4 组合使用构造函数和原型</h2>
<p>联合使用构造函数和原型方式，就可像用其他程序设计语言一样创建对象。这种概念非常简单，即用构造函数定义对象的所有非函数属性，用原型方式定义对象的函数属性（方法）。结果是，所有函数都只创建一次，而每个对象都具有自己的实例属性。</p>
<pre>function Car(sColor,iDoors,iMpg) {
  this.color = sColor;
  this.doors = iDoors;
}
Car.prototype.showColor = function() { alert(this.color); };
var oCar1 = new Car("red",4,23);
</pre>
<p>这种方式是 ECMAScript 采用的主要方式，它具有其他方式的特性，却没有他们的副作用。不过，有些开发者仍觉得这种方法不够完美。</p>
</div>

<div>
<h2>6.2.5 动态原型方法</h2>
<p>对于习惯使用其他语言的开发者来说，使用混合的构造函数/原型方式感觉不那么和谐。毕竟，定义类时，大多数面向对象语言都对属性和方法进行了视觉上的封装。因此，他们设计了动态原型方法，以提供更友好的编码风格。</p>
<pre>function Car(sColor,iDoors,iMpg) {
  this.color = sColor;
  this.doors = iDoors;
  this.mpg = iMpg;
  this.drivers = new Array("Mike","John");
  
  if (<code>typeof this.showColor != "function"</code>) {
    Car.prototype.showColor = function() { alert(this.color); };
    /* ... 这里还可以添加其他原型方法 */
  }  // if 语句检查的可以是初始化之后应该存在的任何属性或方法，只要检查其中一个即可
}
</pre>
</div>

<div>
<h2>6.2.6 混合工厂方式（寄生构造函数模式）</h2>
<p>这种方式通常是在不能应用前一种方式时的变通方法。它的目的是创建假构造函数，这个模式跟工厂模式其实是一模一样的。</p>
<pre>function Car() {
  <code>var oTempCar = new Object;</code>
  oTempCar.color = "blue";
  oTempCar.doors = 4;
  oTempCar.showColor = function() { alert(this.color); };
  <code>return oTempCar;</code>
}
</pre>
<p>与经典工厂方式不同，这种方式使用 new 运算符，使它看起来像真正的构造函数。</p>
<p>这个模式可以在特殊的情况下用来为对象创建构造函数。假设我们想创建一个具有额外方法的特殊数组，由于不能直接修改Array构造函数，因此可以使用这个模式。</p>
<pre>
function SpecialArray(){
  var values = new Array();
  values.push.apply(values, arguments); // 添加值
  values.toPipedString = function(){ return this.jion("|"); }; // 添加方法
  return values;  // 返回数组
}
var colors = new SpecialArray("red", "blue", "green");
alert(colors.toPipedString()); // 输出 red|blue|green
</pre>
<p>返回的对象与构造函数或者与构造函数的原型属性之间没有关系，因此，也不能依赖 instanceof 操作符来确定对象类型。由于存在前诉问题，建议在可以使用其他模式的情况下不要使用这种模式。</p>
</div>

<div>
<h2>6.2.7 稳妥构造函数模式（引入了闭包）</h2>
<p>所谓稳妥对象，指的是没有公共属性，而且其方法也不引用this的对象。</p>
<p>稳妥对象最适合在一些安全的环境中（这些环境中会禁止使用this和new），或者再防止数据被其他应用程序改动时使用</p>
<p>稳妥构造函数遵循与寄生构造函数类似的模式，但有两点不同：一是新创建对象的实例方法不引用this；二是不使用new操作符调用构造函数。</p>
<pre>
function Car(sColor,iDoors,iMpg) {
  var o = new Object();
  // 可以在这里定义私有变量和函数
  o.showColor = function() { alert(sColor); };
  return o;
}
</pre>
<p>在以这种模式创建的对象中，除了使用showColor() 外没有其他办法访问sColor的值。</p>
<p>稳妥构造函数模式提供的这种安全性，使得它非常适合在某些安全执行环境（如ADsafe）提供的环境下使用。</p>
</div>

<div>
<h2>采用哪种方式</h2>
<p>如前所述，目前使用最广泛的是混合的构造函数/原型方式。此外，动态原型方法也很流行，在功能上与构造函数/原型方式等价。可以采用这两种方式中的任何一种。</p>
</div>


<h1>6.3 继承</h1>

<div>
<h2>6.2.3 原型</h2>
<h3>1. 理解原型对象</h3>
<table>
<tr><th colspan=2>Constructor</th></tr>
<tr><td>prototype</td><td>&Prototype 指向构造函数自带的原型对象，例如 Person.prototype</td></tr>
<tr><td>[[Prototype]] / __proto__</td><td>指向构造函数作为实例所继承的原型对象，即 Function.prototype</td></tr>
</table>
<table>
<tr><th colspan=2>Instance</th></tr>
<tr><td>[[Prototype]] / __proto__</td><td>&Prototype</td></tr>
</table>
<table>
<tr><th colspan=2>Prototype</th></tr>
<tr><td>constructor</td><td>&Constructor</td></tr>
</table>
<p>无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个prototype属性，这个属性指向函数的原型对象。在默认情况下，所有原型对象都会自动获得一个constructor属性，指向其对应构造函数。创建了自定义的构造函数后，其原型对象默认只会取得constructor属性；至于其他方法，则都是从Object继承而来的。</p>
<p>当调用构造函数创建一个新实例后，该实例的内部将包含一个指针（内部属性），指向构造函数的原型对象。ES5中管这个指针叫[[Prototype]]，ES6提供了__proto__属性来访问原型对象，ES5也提供了一个方法 Object.getPrototypeOf() 来获取一个对象的原型。</p>
<p>可以通过 instanceof 操作符 或 isPrototypeOf()方法 来确定对象与特定原型的联系。</p>
<p>虽然可以通过对象实例访问保存在原型中的值，如果在实例中添加了一个与实例原型同名的属性，那么该属性将会屏蔽原型中的那个属性。使用delete操作符可以完全删除实例属性，删除实例属性后，再读取该属性时，将显示原型中的值。</p>
<p>使用 hasOwnProperty() 方法可以检测一个属性是存在实例中，还是存在于原型中。</p>

<h3>2. 原型与in操作符</h3>
<p>有两种方式使用 in 操作符：单独使用和 for-in 循环中使用。</p>
<p>单独使用时，in 操作符会在通过对象能够访问给定属性时返回true，无论该属性存在于实例中还是原型中。</p>
<p>同时使用 hasOwnProperty() 方法和 in 操作符，就可以确定该属性到底是存在于对象中还是原型中：</p>
<pre>
function hasPrototypeProperty(object, name){
  return !object.hasOwnProperty(name) && (name in object);
}
</pre>
<p>for-in循环返回的是所有能够通过对象访问的、可枚举的属性。Object.keys() 用于取得对象所有可枚举的实例属性 Object.getOwnPropertyNames() 则能返回所有可枚举和不可枚举的属性名 。</p>

<h3>3. 更简单的原型语法</h3>
<p>前面我们每添加一个属性和方法就要敲一遍 Person.prototype，为了减少不必要的输入，也为了从视觉上更好地封装原型的功能，更常见的做法是用一个包含所有属性和方法的对象字面量来重写整个原型对象。</p>
<p>重写原型后，用 instanceof 操作符还是能正常工作的，但原来原型中的constructor属性会丢失，需要手动补回，但补回的constructor属性将会变成可枚举属性，如有必要可以调用Object.defineProperty()方法解决。</p>
<pre>
function Person(){}
Person.prototype = {
  name: "Nicholas",
  age: 29,
  sayName: function(){alert(this.name);}
};
Object.defineProperty(Person.prototype,"constructor",{
  enumerable: false,
  value: Person
});
</pre>

<h3>4. 原型的动态性</h3>
<p>由于在原型中查找值的过程是一次搜索，因此我们对原型对象所做的任何修改都能够立即从实例上反映出来。</p>
<p>尽管可以随时为原型添加属性和方法，但如果是重写整个原型对象，那么情况就不一样了。我们知道，调用构造函数时会为实例添加一个指向最初原型的[[Prototype]]指针，重写原型对象会切断现有原型与<strong>任何之前已经存在的对象实例</strong>之间的联系，因为它们引用的仍然是最初的原型。</p>

<h3>5. 原生对象的原型</h3>
<p>原型模式的重要性不仅体现在创建自定义类型方面，就连所有原生的引用类型，都是采用这种模式创建的。通过原生对象的原型，不仅可以取得所有默认方法的引用，而且也可以定义新方法。</p>
<p>尽管可以这样做，但我们不推荐在产品化的程序中修改原生对象的原型。</p>
</div>

<div>
<h2>6.3.1 原型链（prototype chaining）</h2>
<p>ES中描述了原型链的概念，并将原型链作为实现继承的主要方法。实现的本质是重写原型对象，代之以一个新类型的实例。</p>
</div>

<div>
<h2>6.3.2 借用构造函数</h2>
</div>

<div>
<h2>6.3.3 组合继承</h2>
<p>组合继承（combination inheritance）有时候也叫作伪经典继承，指的是将原型链和借用构造函数的技术组合到一块，从而发挥二者之长的一种继承模式。其背后的思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。这样，既通过在原型上定义方法实现了函数复用，又能够保证每个实例都有它自己的属性。</p>
<pre>function SuperClass(sColor) {
    this.color = sColor;
}
SuperClass.prototype.sayColor = function () {
    alert(this.color);
};
function SubClass(sColor, sName) {
    <code>SuperClass.call(this, sColor);</code>
    this.name = sName;
}
<code>SubClass.prototype = new SuperClass();</code>
SubClass.prototype.sayName = function () {
    alert(this.name);
};
</pre>
<p>在此例子中，继承机制由两行突出显示的蓝色代码实现。在第一行突出显示的代码中，在 SubClass 构造函数中，用借用SuperClass构造函数继承 SuperClass 类的 sColor 属性。在第二行突出显示的代码中，用原型链继承 SuperClass 类的方法。由于这种混合方式使用了原型链，所以 instanceof 运算符仍能正确运行。</p>
<p>下面的例子测试了这段代码：</p>
<pre>var objSuper = new SuperClass("blue");
var objSub = new SubClass("red", "John");
objSuper.sayColor();	<span>//输出 "blue"</span>
objSub.sayColor();	<span>//输出 "red"</span>
objSub.sayName();	<span>//输出 "John"</span>
</pre>
<p>组合继承避免了原型链和借用构造函数的缺陷，融合了它们的优点，成为JS中最常用的继承模式。</p>
</div>

## 6.3.4 原型式继承

## 6.3.5 寄生式继承

## 6.3.6 寄生组合式继承



