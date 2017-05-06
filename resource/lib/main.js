/*!
 * 页面核心 js 代码，负责页面的加载和功能定义
 * last update：2017/4/9
 * 
 * 依赖两个全局变量:
 * marked - marked.js Markdown 语言解析库
 * hljs - highlight.pak.js 语法高亮库
 *
 * 自定义的一个全局变量 ooboqoo
 *   - contentsRegExp - 用于定义目录生成级别
 */

window.ooboqoo = {};

// 判断是否是移动端
function isMobile() {
  return !!navigator.userAgent.match(/Android|iPhone|Windows\ Phone|iPad|iPod/i);
}

// 开始页面初始化工作
(function () {
  "use strict";

  // 统一列出对 index.html DOM元素的依赖
  var elem_main       = document.getElementsByTagName("main")[0];  // #md 容器
  var elem_md         = document.getElementById("md");             // markdown 文档容器
  var elem_tools      = document.getElementById("tools");          // 右上角按钮区
  var elem_outline    = document.getElementById("outline");        // 右上角按钮 - 页内标题导航
  var elem_html       = document.getElementById("html");           // html 文档容器 iframe#html
  var elem_header     = document.getElementById("header");         // 顶部导航条 #header
  var elem_sidemenu   = document.getElementById("sidemenu");       // 左侧菜单
  var elem_togglemenu = document.getElementById("togglemenu");     // 显示/关闭左侧菜单的按钮

  /**
   * 通过 XMLHttp 下载资源
   * @param {string} src 资源地址
   * @param {boolean} [nocache] 是否下载最新资源，true 表示强制跳过本地缓存
   * @returns {string}
   */
  function ajax(src, cb, nocache) {
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", src);
    if (nocache) { xmlhttp.setRequestHeader("Cache-Control", "no-cache"); }
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
        cb(xmlhttp.responseText);
    };
  }

  /**
   * 根据 src 参数确认加载的是 html 还是 markdown 文件，并调整他们的容器的显示和隐藏
   * @param {string} src 加载文件的相对路径和文件名，即 location.hash 的值
   */
  function toggleDisplay(src) {
    if (src.indexOf(".htm") !== -1) {
      elem_main.style.display  = "none";
      elem_tools.style.display = "none";
      elem_html.style.display  = "block";
    } else {
      elem_main.style.display  = "block";
      elem_tools.style.display = "block";
      elem_html.style.display  = "none";
    }

    // 以下对可选功能标记功能进行配置，标记功能只支持 md 不支持 html
    var elem_markbutton = document.getElementById("mark");
    if (elem_markbutton) {
      elem_markbutton.style.visibility = (src.indexOf(".htm") !== -1) ? "hidden" : "";
    }
  }

  /**
   * 根据加载的 html 文档的高度动态调整其容器 iframe#html 的高度以免出现滚动条
   */
  function adjustIframeHeight() {
    elem_html.height = elem_html.contentWindow.document.documentElement.scrollHeight;
    setTimeout(function check() {
      var a = elem_html.height;
      var b = elem_html.contentWindow.document.documentElement.scrollHeight;
      if (a < b) {
        elem_html.height = elem_html.contentWindow.document.documentElement.scrollHeight + 24;
      }
    }, 60);
  }

  /**
   * 根据 markdown 文档标题自动生成目录导航
   */
  function setContents() {
    var contents = document.createElement("div");
    var nodes = elem_md.getElementsByTagName("*");
    var headings = [];
    var index = 0;
    var reg = /H[1234]/;

    if (ooboqoo.contentsRegExp) {
      reg = ooboqoo.contentsRegExp;
      delete ooboqoo.contentsRegExp;  // 清理以防影响其他页面
    }
    
    [].forEach.call(nodes, function (node) {
      if (reg.test(node.tagName)) { headings.push(node); }
    });
    headings.forEach(function (heading) {
      var id = "h-" + index;
      var a = document.createElement("a");
      heading.id = id;
      a.href = "#" + id;
      a.textContent = heading.textContent;
      a.className = heading.tagName.toLowerCase();
      contents.appendChild(a);
      index += 1;
    });
    elem_outline.innerHTML = "索引";
    contents.style["max-height"] = (window.innerHeight - 36) + "px";
    elem_outline.appendChild(contents);
  }

  /**
   * 根据 html 文档内现有目录设置目录导航
   */
  function setContentsHTML() {
    var contents = document.createElement("div");
    var innerContents = elem_html.contentWindow.document.getElementById("contents");
    var links;

    if (!innerContents) { return; }
    links = innerContents.getElementsByTagName("a");
    [].forEach.call(links, function (link) {
      link = link.cloneNode(true);
      link.className = "h2";
      contents.appendChild(link);
    });
    elem_outline.innerHTML = "索引";
    contents.style["max-height"] = (window.innerHeight - 36) + "px";
    elem_outline.appendChild(contents);
    elem_tools.style.display = "block";
  }

  /**
   * 负责下载 md 文件并更新文档
   * @param {string} src 加载文件的相对路径和文件名，即 location.hash 的值
   * @param {boolean} [nocache] 是否下载最新资源，true 表示强制跳过本地缓存
   */
  function loadMD(src, nocache) {
    toggleDisplay(src);
    ajax(src, process, nocache);
    
    function process(text) {
      // 首次加载时，如果 marked 和 hljs 没准备好就延时执行
      if (!window.marked || !window.hljs) {
        return window.addEventListener("DOMContentLoaded", function () { process(text); });
      }

      // 解析 md 并插入文档，并对 md 功能进行了扩展
      elem_md.innerHTML = marked(text).replace(/<tag>/g, "<").replace(/<\/tag>/g, ">");
        // 替换 <tag></tag>，用法示例 <tag>div class="dl"</tag> 会生成 <div class="dl">

      // 给文档代码设置高亮
      [].forEach.call(elem_md.querySelectorAll("pre > code"), hljs.highlightBlock);

      // 通过重新生成 script 标签来执行 script 标签内容
      [].forEach.call(elem_md.getElementsByTagName("script"), function (script) {
        var newScript = document.createElement("script");
        if (script.src) {
          newScript.src = script.src;
        } else {
          newScript.innerHTML = script.innerHTML;
        }
        elem_md.appendChild(newScript);
      });

      setContents();              // 加载文档大纲
      if (elem_md.onload) { elem_md.onload(); }  // 设置标记功能挂载在 onlaod
      location.hash = "!" + src;  // 更新地址
    }
  }

  /**
   * 负责下载 html 文件并更新文档
   * @param {string} src 加载文件的相对路径和文件名，即 location.hash 的值
   */
  function loadHTML(src) {
    toggleDisplay(src);
    elem_html.setAttribute("src", src);
    location.hash = "!" + src;  // 更新地址
  }

  /**
   * 加载文档，根据 src 确定是用 loadMD 还是 loadHTML
   * @param {string} src 加载文件的相对路径和文件名，即 location.hash 的值
   * @param {boolean} [nocache]  是否下载最新资源，true 表示强制跳过本地缓存
   */
  function loadPage(src, nocache) {
    if (src.indexOf(".htm") !== -1) { loadHTML(src); }
    else { loadMD(src, nocache); }
  }

  // 开始初始化页面  ##############################################################################
  var currentPath = location.pathname;
  var src = location.hash ? location.hash.slice(2) : (localStorage.getItem(currentPath) ||
      elem_sidemenu.querySelector("a").getAttribute("href"));

  loadPage(src);
  if (!localStorage.getItem(currentPath)) { localStorage.setItem(currentPath, src); }

  // 当加载 html 文件时，自动调整 iframe#html 高度并设置目录导航
  window.addEventListener("resize", adjustIframeHeight);
  elem_html.onload = function () {
    adjustIframeHeight();
    setContentsHTML();
  };

  // 设置顶部导航栏
  ajax('/header.html', function (text) {
    elem_header.innerHTML = text;
    var links = elem_header.getElementsByTagName("a");
    for (var i = 0, length = links.length; i < length; i++) {
      if (window.location.href.indexOf(links[i].href) !== -1) {
        return links[i].className = "active";
      }
    }
  });

  elem_header.onclick = function (e) {
    if (e.target.tagName !== "A") { return; }
    window.location.href = e.target.href;
    e.target.className = "active";
  };

  // 定义菜单开关按钮
  elem_togglemenu.addEventListener("click", function () {
    elem_sidemenu.classList.toggle("show");
  });


  // 定义页面切换及菜单栏折叠功能
  elem_sidemenu.addEventListener("click", function (e) {
    var nextStyle;

    // 定义页面切换功能
    if (e.target.tagName === "A") {
      src = e.target.getAttribute("href");

      if (src !== localStorage.getItem(currentPath)) {
        loadPage(src);
        window.scrollTo(0, 0);
        localStorage.setItem(currentPath, src);
      } else {
        loadPage(src, true);
      }

      e.preventDefault();  // 阻止默认跳转页面的动作
    }

    // 定义菜单栏折叠功能，点击 h2 标题栏可折叠/展开该部分内容
    if (e.target.tagName.indexOf("H2") === 0) {
      nextStyle = e.target.nextElementSibling.style;
      nextStyle.display = nextStyle.display ? "" : "none";
      e.target.className = e.target.className ? "" : "collapse";
    }

    e.stopPropagation();
  });

  // 当加载的是 html 文件时，拦截标签跳转操作
  elem_outline.addEventListener("click", function (e) {
    if (src.indexOf(".htm") !== -1 && e.target.tagName === "A") {
      elem_html.src = src + e.target.getAttribute("href");
      console.log(elem_html.src);
      e.preventDefault();
    }
  });

  // 对 hash 变化做出响应
  window.onhashchange = function (event) {
    if (event.newURL.indexOf("!") === -1) {  // 防止点击页内导航时修改网址
      location.href = event.oldURL;
    } else {                                 // 如果带 ! 而 hash 变化了就是点击了回退或前进按钮
      src = location.hash.slice(2);
      loadPage(src);
      localStorage.setItem(currentPath, src);
    }
  };
})();

// 提供一些额外功能增强 ###########################################################################
(function () {
  "use strict";

  var elem_md = document.getElementById("md");
  var elem_header = document.getElementById("header");
  var elem_prompt;

  function toggleClass(element, className) {
    if (element.classList) {
      element.classList.toggle(className); // IE10 or higher
    } else {
      element.className = element.className.indexOf(className) === -1 ?
        element.className + " " + className :
        element.className.replace(className, "");
    }
  }

  // 给笔记正文添加折叠功能 -- #md > h2 区块
  elem_md.addEventListener("click", function (e) {
    if (e.target.tagName === "H2") {
      var next = e.target.nextElementSibling;
      var reg = /h2|h1/i;
      while (!reg.test(next.tagName)) {
        next.style.display = next.style.display ? "" : "none";
        next = next.nextElementSibling;
        if (next === null) break;
      }
      toggleClass(e.target, "collapse");
      e.stopPropagation();
    }
  });

  // 给笔记正文添加折叠功能 -- #md .dl 区块
  elem_md.addEventListener("dblclick", function (e) {
    var elem = e.target;
    while (elem.parentElement) {
      elem = elem.parentElement;
      if (elem.className.indexOf("dl") === 0) {
        toggleClass(elem, "collapse");
        return;
      }
    }
  });

  // 让顶部导航条显示一会儿再隐藏，以免访客不知道有这导航
  setTimeout(function() { elem_header.style.top = 0; }, 1000 * 4);
  setTimeout(function() { elem_header.style.top = ""; }, 1000 * 5);

  // 再加个提示窗吧，还是怕访客看不到导航条
  if (!localStorage.getItem("prompted") ||
    (Date.now() - localStorage.getItem("prompted") > 1000*60*60*24*15)) {  // 首次登陆或间隔2周提示
    elem_prompt = document.createElement("div");
    elem_prompt.innerHTML =  isMobile()
      ? "移动端手势操作指南：<br>当页面位于顶部时下拉可调出顶部导航条；向上滑隐藏导航条；" +
        "<br>从页面左侧往右滑动调出左侧菜单栏；在左侧菜单栏内向左滑动隐藏左侧菜单栏。" +
        "<br>点击本提示框即可关闭此提示框。"
      : "鼠标移动到页面顶部即可调出顶部导航条。<br> 本提示只出现一次，点击即可关闭！"
    elem_prompt.setAttribute("style", 'position: fixed; bottom: 0; right: 0; z-index: 999;' +
        'padding: 0.5em; text-align: left;' +
        'background-color: #ff9; border: 1px solid #999; border-top-left-radius: 0.5em;');
    elem_prompt.onclick = function () {this.style.display = "none";};
    document.body.appendChild(elem_prompt);
    localStorage.setItem("prompted", Date.now());
  }
})();


// 定义在页面上添加或删除标记(用淡紫色底色高亮显示)的功能，作为试验功能提供 #######################
(function () {
  "use strict";
  if (isMobile()) { return; } // 移动端不开启笔记标注功能

  var elem_markbutton = document.getElementById("mark");           // 右上角按钮 - 增/删标记
  var elem_md         = document.getElementById("md");             // markdown 文档容器
  var page, marks, html;

  /** 将所有标记高亮显示，如果有传入标记，就会将该标记去掉高亮显示 */
  function highlight() {

    // 每次 loadMD 加载文档时都会更新以下变量，其他函数就可以拿到最新内容
    page = location.hash;
    marks = JSON.parse( localStorage.getItem(page) || "[]" );
    html = elem_md.innerHTML;

    marks.forEach(function (mark) {
      html = html.replace(mark, '<del class="mark">$&</del>');
    });
    elem_md.innerHTML = html;
  }

  /** 去掉无效的标记内容 */
  function clean() {
    var changed = false;
    marks.forEach(function (mark, index) {
      if (html.indexOf(mark) === -1){
        marks.splice(index, 1);
        changed = true;
      }
    });
    if (changed) { localStorage.setItem(page, JSON.stringify(marks)); }
  }

  /** 负责添加或删除标记 */
  function setMark() {
    var range = window.getSelection().getRangeAt(0);
    var container = document.createElement('div');
    var selection, markToRemove, i;

    container.appendChild(range.cloneContents());
    selection = container.innerHTML;

    elem_md.style.cursor = "";
    elem_md.removeEventListener("mouseup", setMark);

    if (selection === "") { return; }

    // 确定是要增加标记还是要删除标记
    for (i = 0; i < marks.length; i++) {
      if (marks[i].indexOf(selection) !== -1){
        markToRemove = (marks.splice(i, 1))[0];
        break;
      }
    }

    if (markToRemove) {
      html = html.replace('<del class="mark">' + markToRemove + '</del>', markToRemove);
    } else {
      marks.push(selection);
      html = html.replace(selection, '<del class="mark">$&</del>');
    }

    localStorage.setItem(page, JSON.stringify(marks));
    elem_md.innerHTML = html;
  }

  elem_markbutton.style.display = "";

  // 文档加载时初始化标记，通过将初始化函数挂载到 onload 供 loadMD 函数在文档加载完成后调用
  elem_md.onload = function initMark() {
    highlight();
    clean();
  };

  // 单击 “增/删标记” 按钮，鼠标会变成带问号箭头，选中文本即添加一个标记，如选择已有标记内容，则删除该标记
  elem_markbutton.onclick = function () {
    elem_md.style.cursor = "help";
    elem_md.addEventListener("mouseup", setMark);
  };
})();
