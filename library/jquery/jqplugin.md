# jQuery 插件

### 7.6 编写 jQuery 插件

#### 7.6.2 插件的基本要点

* jQuery 插件的文件名推荐使用 jquery.[plugin].js 的形式，以免和其他库插件混淆。
* 所有的对象方法都应当附加到 jQuery.fn 对象上，而所有的工具方法都应当附加到 jQuery 对象本身上。
* jQuery 对象方法内的 this 指向当前 jQuery 对象，而方法的回调函数内的 this 则指向 DOM 元素。
在插件内部，this 指向的是当前通过选择器获取的 jQuery 对象，而不像一般的方法那样，如 click() 方法，内部的 this 指向的是 DOM 元素。
* 可以通过 this.each() 来遍历所有元素
* 所有的插件都应当以分号结尾，否则压缩的时候可能出现问题，为了更稳妥些，甚至可以在插件头部加上一个分号，以免其他不规范代码给插件带来影响。
* 插件应该返回一个 jQuery 对象，以保证插件的可链式操作。除非插件需要返回的是一些需要获取的量，如字符串或数组等。
* 避免在插件内部使用 `$` 别名，而应使用完整的 jQuery 表示，这样可以避免冲突，当然也可以采用闭包来回避这个问题。

```js
// 通过直接添加属性的方式扩展
$.fn.myMethod = function() {  };
$.sum = function() {  };

// 通过 extend 方法扩展
;(function($){
  $.fn.extend({           // 对象方法
    color: function(value) { return this.css('color', value); },
    swapClass: function(class1, class2) {
      return this.each(function(){     // 这里的 this 指向当前 jQuery 对象
        var $element = $(this);        // 这里的 this 指向 DOM 元素
        // ...
      });
    }
  });

  $.extend({               // 实用工具方法
    fun1: function() {  },
    fun2: function() {  }
  });
})(jQuery);
```

选择命名空间：对于仅限于个人使用的函数，一般来说还是把它保存在项目的命名空间中最方便。
jQuery 中大多数内置的功能都是通过其对象实例的方法提供的，而且这些方法也是插件之所以诱人的关键。
一个合理的实例方法应该包含对它的上下文的操作(不然就应该是添加实用方法)。

**隐式迭代**  
jQuery 选择符表达式得到的是一个元素集合，可以通过 this.each() 来遍历所有元素。

**链式调用**  
jQuery 用户应该能够正常使用链式调用，因此，所有插件方法中须返回一个 jQuery 对象，除非相应的方法明显用于取得不同的信息。

**参数对象**  
作为一种向插件用户公开选项的方式，对象要比刚刚使用的参数列表更加友好。对象会为每个参数提供一个有意义的标签，同时也会让参数次序变得无关紧要。而且，只要有可能通过插件来模仿 jQuery API，就应该使用对象来提高一致性和易用性。

**默认参数值**  
一组合理的默认值可以增强插件接口的易用性。实用函数 $.extend() 可以用接受的 opts 对象参数覆盖 defaults 中的选项，并保持选项对象中未指定的默认项不变。

**回调函数**  
回调函数可以极大地增加插件的灵活性。要在方法中使用回调函数，需要接受一个函数对象作为参数，然后在方法中适当的位置上调用该函数。

**可定制的默认值**  
提供 $.fn.[plugin].defaults 接口供设定插件的默认值会带来极大的使用便利。使用 defaults 对象时，要保证 $.extend() 不会修改它，因此应将一个空对象作为第一个参数 `$.extend({}, defaults, opts)`

#### 8.6 插件设计建议

* 为避免 $ 别名与其他库发生冲突，可以使用 jQuery ，或者在立即调用的函数表达式（IIFE）中传入 $ ，使其成为一个局部变量。
* 无论是以 $.myPlugin 的方式扩展jQuery，还是以 $.fn.myPlugin 的方式扩展jQuery的原型，给 $ 命名空间添加的属性都不要超过一个。更多的公有方法和属性应该添加到插件的命名空间中（例如， $.myPlugin.publicMethod 或 $.fn.myPlugin.plugin Property ）。
* 别忘了为插件提供一个默认选项的对象： $.fn.myPlugin.defaults = {size: 'large'} 。
* 要允许插件用户有选择地覆盖任何默认选项，包括影响后续方法的调用 ($.fn.myPlugin.defaults.size = 'medium'; ）和单独调用（ $('div').myPlugin ({size: 'small'}); ）。
* 多数情况下，扩展jQuery原型时（ $.fn.myPlugin ）要返回 this ，以便插件用户通过连缀语法调用其他jQuery方法（如 $('div').myPlugin().find('p').addClass('foo') ）。
* 在扩展jQuery原型时（ $.fn.myPlugin ），通过调用 this.each() 强制执行隐式迭代。
* 合适的时候，利用回调函数支持灵活地修改插件行为，从而不必修改插件代码。
* 如果插件是为了实现用户界面元素，或者需要跟踪元素的状态，使用jQuery UI部件工厂来创建。
* 利用QUnit等测试框架为自己的插件维护一组自动的单元测试，以确保插件能够按预期工作。有关QUnit的更多信息，请参考附录B。
* 使用Git或其他版本控制系统跟踪代码的版本。可以考虑把插件公开托管到 Github 上，以便其他人帮你改进。
* 在把自己的插件提供给别人使用时，务必明确许可条款。建议考虑使用 MIT 许可，这也是 jQuery 使用的许可。
