# Python 教程 - Web 开发

### web 开发历史

1. 静态 HTML 页面。
2. C语言的 CGI 通用网络接口。CGI 处理用户发送的动态数据以实现用户交互。
3. 脚本语言 ASP/JSP/PHP。C/C++ 这样的低级语言非常不适合Web开发，而脚本语言由于开发效率高，与 HTML 结合紧密，因此，迅速取代了 CGI 模式。ASP 是微软推出的用 VBScript 脚本编程的Web开发技术，而 JSP 用 Java 来编写脚本，PHP 本身则是开源的脚本语言。
4. 以脚本语言为基础的各种 MVC web 框架。为了解决直接用脚本语言嵌入 HTML 导致的可维护性差的问题，Web 应用也引入了 Model-View-Controller 的模式，来简化Web开发。ASP发展为ASP.Net，JSP 和 PHP 也有一大堆 MVC 框架。
5. Web开发技术仍在快速发展中，异步开发、新的 MVVM 前端技术层出不穷。

Python 是一种解释型的脚本语言，开发效率高，所以非常适合用来做 Web 开发。

### HTTP 协议


### WSGI 接口

无论多么复杂的Web应用程序，入口都是一个WSGI处理函数。HTTP请求的所有输入信息都可以通过 `environ` 获得，HTTP响应的输出都可以通过 `start_response()` 加上函数返回值作为Body。

复杂的Web应用程序，光靠一个WSGI函数来处理还是太底层了，我们需要在WSGI之上再抽象出Web框架，进一步简化Web开发。

*hello.py*

```py
def application(environ, start_response):
    start_response('200 OK', [('Content-Type', 'text/html')])
    body = '<h1>Hello, %s!</h1>' % (environ['PATH_INFO'][1:] or 'web')
    return [body.encode('utf-8')]
```

*server.py*

```py
from wsgiref.simple_server import make_server
from hello import application

# 创建一个服务器，IP地址为空，端口是8000，处理函数是application:
httpd = make_server('', 8000, application)
print('Serving HTTP on port 8000...')
# 开始监听HTTP请求:
httpd.serve_forever()
```

上面的 application() 函数就是符合WSGI标准的一个HTTP处理函数，它接收两个参数：
  * environ：一个包含所有HTTP请求信息的dict对象；
  * start_response：一个发送HTTP响应头的函数。注意Header只能发送一次，也就是只能调用一次 start_response() 函数。接收两个参数，一个是HTTP响应码，一个是一组list表示的HTTP Header，每个Header用一个包含两个str的tuple表示。

### Web 框架

WSGI 提供的接口虽然比 HTTP 接口高级了不少，但和 Web App 的处理逻辑比，还是比较低级，我们需要在 WSGI 接口之上能进一步抽象，让我们专注于用一个函数处理一个 URL，至于 URL 到函数的映射，就交给 Web 框架来做。有了 Web 框架，我们在编写 Web 应用时，注意力就从 WSGI 处理函数转移到 URL+ 对应的处理函数，这样，编写 Web App 就更加简单了。

```py
from flask import Flask
from flask import request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    return '<h1>Home</h1>'

@app.route('/signin', methods=['GET'])
def signin_form():
    return '''<form action="/signin" method="post">
              <p><input name="username"></p>
              <p><input name="password" type="password"></p>
              <p><button type="submit">Sign In</button></p>
              </form>'''

@app.route('/signin', methods=['POST'])
def signin():
    # 需要从request对象读取表单内容：
    if request.form['username']=='admin' and request.form['password']=='password':
        return '<h3>Hello, admin!</h3>'
    return '<h3>Bad username or password.</h3>'

if __name__ == '__main__':
    app.run()
```

### 使用模板

Flask 通过 `render_template()` 函数来实现模板的渲染。Flask 默认支持的模板引擎是 [jinja2](//jinja.pocoo.org/)

```py
from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('home.html')

@app.route('/signin', methods=['GET'])
def signin_form():
    return render_template('form.html')

@app.route('/signin', methods=['POST'])
def signin():
    username = request.form['username']
    password = request.form['password']
    if username=='admin' and password=='password':
        return render_template('signin-ok.html', username=username)
    return render_template('form.html', message='Bad username or password', username=username)

if __name__ == '__main__':
    app.run()
```

在 Jinja2 模板中，我们用 `{{ name }}` 表示一个需要替换的变量；用 `{% ... %}` 表示指令。

*templates/form.html*

```html
<html>
<head>
  <title>Please Sign In</title>
</head>
<body>
  {% if message %}
  <p style="color:red">{{ message }}</p>
  {% endif %}
  <form action="/signin" method="post">
    <legend>Please sign in:</legend>
    <p><input name="username" placeholder="Username" value="{{ username }}"></p>
    <p><input name="password" placeholder="Password" type="password"></p>
    <p><button type="submit">Sign In</button></p>
  </form>
</body>
</html>
```
