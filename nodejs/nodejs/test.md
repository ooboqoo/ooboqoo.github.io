# 单元测试

参考文章：http://book.apebook.org/minghe/koa-action/test/index.html

## 为什么需要单元测试

每一本 node 书籍都会强调单元测试的重要性，但都把单元测试的章节放在靠后的位置，不利于引起读者的重视。单元测试的重要就像城市离不开下水道，虽然一般用户感知不到，但一旦没有或不健全，就是灾难，参见天朝的城市...

浏览器端 js 的单元测试，因为前端业务的多变性和对dom的依赖，业务代码的单测一直很难展开，而 node 应用不存在这个问题，node 中没有dom，而且变化会比前端少，稳定性诉求更高。node 中单元测试容易展开，且成效好。


## node 中的单元测试

mocha 是最好的 node 单元测试框架，使用简单且灵活，是进行 node 单测的首选。

安装 mocha：

```bash
$ npm install -g mocha
```

在 test 目录我们新建一个 demo-spec.js（约定-spec为用例文件） 文件，测试数组的 indexOf() 方法：

```js
var assert = require("assert");
describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        });
    });
});
```

assert 模块是 node 内置的断言库。

describe() 用于定义测试用例组，是可以嵌套的。

it() 是定义具体的测试用例。

assert.equal() 用于判断值是否符合预期。

命令行运行用例 ：

```bash
$ mocha
```

默认会运行 test 目录下的所有用例文件，输出的信息：

```txt
Array
#indexOf()
  ✓ should return -1 when the value is not present
```

## should 断言库

node 内置的断言库 assert，功能比较弱，不太好用，推荐使用 [should](https://www.npmjs.com/package/should) ，详细api可以看 [should.js](http://shouldjs.github.io/)。

should 的断言方法注入到 Object.prototype 中，所以断言的风格更符合用户思维习惯，也支持链式调用，跟 jQuery 有点像：

```js
var should = require("should");
describe('Should test', function() {
    it('number', function() {
        (123).should.be.a.Number;
    });
    it('object property', function() {
        var obj = {name:'minghe',email:"minghe36@gmail.com"};
        obj.should.have.property('name','minghe');
        obj.should.have.property('email');
    });
});
```

(123).should.be.a.Number 判断 123 是否是一个数字，适用于其他类型的判断。

obj.should.have.property('name','minghe') obj 对象是否包含属性 name ，且 name = 'minghe' 。
