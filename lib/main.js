/*!
 * mdreader 的核心 js 代码，负责对页面的加载及功能定义
 * version 1.0.3
 * last update：2016/8/15
 * 
 * 依赖两个全局变量:
 * marked - marked.js Markdown 语言解析库
 * hljs - highlight.pak.js 语法高亮库
 */

window.addEventListener("DOMContentLoaded", function() {
  "use strict";

  // 统一列出对 index.html DOM元素的依赖
  var elem_main       = document.getElementsByTagName("main")[0];  // #md 容器
  var elem_md         = document.getElementById("md");             // markdown 文档容器
  var elem_tools      = document.getElementById("tools");          // 右上角按钮区
  var elem_outline    = document.getElementById("outline");        // 右上角按钮 - 页内标题导航
  var elem_markbutton = document.getElementById("mark");           // 右上角按钮 - 添加/删除笔记
  var elem_html       = document.getElementById("html");           // html 文档容器 iframe#html
  var elem_header     = document.getElementById("header");         // 顶部导航条 iframe#header
  var elem_sidemenu   = document.getElementById("sidemenu");       // 左侧菜单
  var elem_togglemenu = document.getElementById("togglemenu");     // 显示/关闭左侧菜单的按钮

  /**
   * 通过 XMLHttp 下载资源
   * @param {string} src - 资源地址
   * @param {boolean} [optional] nocache - 是否下载最新资源，true 表示强制跳过本地缓存
   */
  function ajax(src, nocache) {
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", src, false);
    if (nocache) { xmlhttp.setRequestHeader("Cache-Control", "no-cache"); }
    xmlhttp.send();
    return xmlhttp.responseText;
  }

  /**
   * 根据 src 参数确认加载的是 html 还是 markdown 文件，并调整他们的容器的显示和隐藏
   * @param {string} src 加载文件的相对路径和文件名，即 location.hash 的值
   */
  function toggleDisplay(src) {
    if (src.indexOf(".htm") !== -1) {
      elem_main.style.display = "none";
      elem_tools.style.display = "none";
      elem_html.style.display = "block";
    } else {
      elem_main.style.display = "block";
      elem_tools.style.display = "block";
      elem_html.style.display = "none";
    }
  }

  /**
   * 根据加载的 html 文档的高度动态调整其容器 iframe#html 的高度以免出现滚动条
   */
  function adjustIframeHeight() {
    var bHeight = elem_html.contentWindow.document.body.scrollHeight;
    var dHeight = elem_html.contentWindow.document.documentElement.scrollHeight;
    elem_html.height = Math.max(bHeight, dHeight);
  }

  /**
   * 根据 markdown 文档标题自动生成目录导航
   */
  function setContents(){
    var contents = document.createElement("div");
    var nodes = elem_md.getElementsByTagName("*");
    var headings = [];
    var index = 0;
    
    [].forEach.call(nodes, function(node) {
      if (node.tagName.indexOf("H") === 0) { headings.push(node); }
    });
    headings.forEach(function(heading) {
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
    elem_outline.appendChild(contents);
  }

  /**
   * 负责下载 md 文件并更新文档
   * @param {string} src 加载文件的相对路径和文件名，即 location.hash 的值
   * @param {boolean} [optional] nocache - 是否下载最新资源，true 表示强制跳过本地缓存
   */
  function loadMD(src, nocache) {
    toggleDisplay(src);

    // 解析 md 并插入文档（顺便给所有表格套了个 div.responsive）
    elem_md.innerHTML = marked(ajax(src, nocache))
      .replace(/(<table>[\S\s]*?<\/table>)/g, '<div class="responsive">$1</div>');

    // 给文档代码设置高亮
    [].forEach.call(elem_md.querySelectorAll("pre > code"), hljs.highlightBlock);

    // 通过重新生成 script 标签来执行 script 标签内容
    [].forEach.call(elem_md.getElementsByTagName("script"), function(script){
      var newScript = document.createElement("script");
      newScript.innerHTML = elem_md.removeChild(script).innerHTML;
      elem_md.appendChild(newScript);
    });

    setContents();              // 加载文档大纲
    location.hash = "!" + src;  // 更新地址
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
   * @param {boolean} [optional] nocache - 是否下载最新资源，true 表示强制跳过本地缓存
   */
  function loadPage(src, nocache) {
    if (src.indexOf(".htm") !== -1) {
      loadHTML(src); 
    } else {
     loadMD(src, nocache);
    }
  }

  // ##################################  开始初始化页面  ##########################################
  var currentPath = location.pathname;
  var src = location.hash ? location.hash.slice(2) : (localStorage.getItem(currentPath) ||
      elem_sidemenu.getElementsByTagName("a")[0].getAttribute("href"));

  loadPage(src);
  if (!localStorage.getItem(currentPath)) { localStorage.setItem(currentPath, src); }

  // 当加载 html 文件时，自动调整 iframe#html 高度
  window.addEventListener("resize", adjustIframeHeight);
  elem_html.onload = adjustIframeHeight;

  // 如果没有顶端导航栏内容，就不显示
  elem_header.onload = function() {
    if (this.contentDocument.getElementsByTagName("a").length < 2) {
      this.style.display = "none";
    }
  };

  // 定义菜单开关按钮
  elem_togglemenu.addEventListener("click", function() {
    elem_sidemenu.classList.toggle("show");
  });

  // 定义页面切换及菜单栏折叠功能
  elem_sidemenu.addEventListener("click", function(e) {

    // 定义页面切换功能
    if (e.target.tagName === "A") {
      var src = e.target.getAttribute("href");
      var currentPath = location.pathname;

      if (src !== localStorage.getItem(currentPath)) {
        loadPage(src);
        window.scrollTo(0, 0);
        localStorage.setItem(currentPath, src);
      } else {
        loadPage(src, true);
      }

      e.preventDefault();  // 阻止默认跳转页面的动作
      return;
    }

    // 定义菜单栏折叠功能，点击 h2 标题栏可折叠/展开该部分内容
    var nextStyle = e.target.nextElementSibling.style;
    if (e.target.tagName.indexOf("H2") === 0) {
      nextStyle.display = nextStyle.display ? "" : "none";
      e.target.className = e.target.className ? "" : "collapse";
    }

    e.stopPropagation();
  });

  // 给笔记正文添加折叠功能 -- #md > h2 区块
  elem_md.addEventListener("click", function(e) {
    if (e.target.tagName === "H2") {
      var next = e.target.nextElementSibling;
      var reg = /h2|h1/i;
      while (!reg.test(next.tagName)) {
        next.style.display = next.style.display ? "" : "none";
        next = next.nextElementSibling;
        if (next === null) break;
      }
      e.target.className = e.target.className ? "" : "collapse";
      e.stopPropagation();
    }
  });

  // 让顶部导航条显示一会儿再隐藏，以免访客不知道有这导航
  setTimeout(function() { elem_header.style.top = 0; }, 1000 * 10);
  setTimeout(function() { elem_header.style.top = ""; }, 1000 * 13);

  // 防止点击页内导航时修改网址
  window.onhashchange = function(event) {
    if (event.newURL.indexOf("!") === -1) { location.href = event.oldURL; }
  };
});

// ################################################################################################
//            该部分定义在页面上添加或删除笔记（用淡紫色底色高亮显示）的相关功能
// ################################################################################################

  // // setMark 函数负责管理添加或删除标记
  // function setMark(){
  //   var page = location.hash;
  //   var marks = JSON.parse( localStorage.getItem(page) || "[]" );
  //   var html = document.getElementById("md").innerHTML;
  //   var container = document.createElement('div');
  //   var selection, markToRemove, i;

  //   /**
  //    * 将所有标记高亮显示，如果有传入标记，就会将该标记去掉高亮显示
  //    * @param {string} 待去除高亮的标记
  //    */
  //   function highlight(markToRemove){
  //     marks.forEach(function(mark){
  //       html = html.replace(mark, '<del class="mark">$&</del>');
  //     });
  //     if (markToRemove) {
  //       html = html.replace('<del class="mark">' + markToRemove + '</del>', markToRemove);
  //     }
  //     document.getElementById("md").innerHTML = html;
  //   }

  //   /** 去掉无效的标记内容 */
  //   function clean(){
  //     var changed = false;
  //     marks.forEach(function(mark, index){
  //       if (html.indexOf(mark) === -1){
  //         marks.splice(index, 1);
  //         changed = true;
  //       }
  //     });
  //     if (changed) { localStorage.setItem(page, JSON.stringify(marks)); }
  //   }

  //   // 提取选择区域内的 HTML 代码
  //   if (lastRange) {
  //     container.appendChild(lastRange.cloneContents());
  //     selection = container.innerHTML;
  //   }

  //   // 页面初始化或者没有选择内容时就不用继续向下执行
  //   switch (selection){
  //     case undefined: highlight(); clean();  // 此处特意不用 break
  //     case ""       : return;
  //   }

  //   // 确定是要增加标记还是要删除标记
  //   for (i = 0; i < marks.length; i++){
  //     if (marks[i].indexOf(selection) > -1){
  //       markToRemove = (marks.splice(i, 1))[0];
  //       break;
  //     }
  //   }

  //   if (!markToRemove) { marks.push(selection); }
  //   highlight(markToRemove);
  //   localStorage.setItem(page, JSON.stringify(marks));
  // }

  //   // 设置标记功能
  //   elem_md.addEventListener("mouseup", function(e){
  //     if(e.target !== markbutton) { lastRange = window.getSelection().getRangeAt(0); }
  //   });  // 如果不做这一步，点击 #mark 按钮调用 setMark 时就拿不到前面选择的文本
  //   document.getElementById("mark").addEventListener("click", setMark);

