# Promise

承诺 就是……好吧，它就是一个承诺——在有了结果时，它承诺会回调我们。我们请求一个异步服务去做点什么，然后给它一个回调函数。它会去做 (无论用哪种方式)，一旦完成，它就会调用我们的回调函数，并通过参数把工作成果或者错误信息传给我们。

### 错误处理

```js
// func1 中虽然未对 Promise 进行错误处，但最终在 func2 中进行了处理，整个流程不会报错。
func1() {
    return getJSON('http://path/to/api').then(res => res.json());
}

func2() {
    this.func1().catch(error => this.handleError(error));
}
```


