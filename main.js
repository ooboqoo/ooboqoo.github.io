/**
 该文档负责加载笔记导航栏，并定义了 setBase 函数
 支持IE9及以上浏览器
**/

// 下载目录文档并进行相关的初始化工作
(function() {

  // 定义初始化函数
  function navinit() {

    if (!document.body) return;
    document.removeEventListener("readystatechange", navinit);
    var i = 0;  // for 语句用的 i
    var nav = document.createElement("nav");
    nav.id = "nav";
    nav.innerHTML = xmlhttp.responseText;
    document.body.appendChild(nav);

    var sidemenu = document.getElementById("sidemenu");

    // 定义打开菜单按钮动作
    document.getElementById("openmenu").addEventListener("click", function(e) {
      sidemenu.style.display = sidemenu.style.display === "block" ? "" :
        'block';
      e.stopPropagation();
    });

    // 定义菜单关闭按钮动作
    document.getElementById("closebtn").addEventListener("click", function(e) {
      sidemenu.style.display = '';
      e.stopPropagation();
    });

    // 定义折叠菜单栏功能
    document.getElementById("sidemenu").addEventListener("click", function(e) {
      var neStyle = e.target.nextElementSibling.style;
      if (e.target.tagName.toLowerCase().indexOf("h2") === 0) {
        neStyle.display = neStyle.display ? "" : "none";
        e.target.className = e.target.className ? "" : "collapse";
      }
      e.stopPropagation();
    });

    // 初始化菜单栏各区块的展开和折叠（实际就是展开当前页面所在的区块）
    var anchors = sidemenu.getElementsByTagName("a");
    var targetA, targetDiv;
    for(i = 0; i < anchors.length; i++){
      if (anchors[i].href === document.URL){
        targetA = anchors[i];
        break;
      }
    }
    if (targetA){
      targetDiv = targetA;
      do {
        targetDiv = targetDiv.parentElement;
      } while(targetDiv.tagName !== "DIV" && targetDiv.parentElement);
      if (targetDiv.style.display === "none") {
        var h2 = sidemenu.getElementsByTagName("h2");
        for (i = 0; i< h2.length; i++) {  // 
          h2[i].className = "collapse";
          h2[i].nextElementSibling.style.display = "none";
        }
        targetDiv.style.display = "";
        targetDiv.previousElementSibling.className = "";
      }
    }

    // 定义“页内导航”
    var contents = document.getElementById("contents"),
      pagenav = document.getElementById("pagenav"),
      x;
    if (contents !== null) {
      x = contents.getElementsByTagName("a");
      pagenav.style.display = "block";
      for (i = 0; i < x.length; i++) {
        pagenav.getElementsByTagName("div")[0].appendChild(x[i].cloneNode(
          true));
      }
      // 解决 ipad 无法点击页面导致无法关闭弹出菜单问题
      if (/ipad|iphone/i.test(navigator.userAgent)) {
        document.addEventListener("touchend", function() {});
      }
    }

    // 优化 ipad 侧边按钮点击操作
    if (/ipad/i.test(navigator.userAgent)) {
      var sidelabel = document.getElementsByClassName("sidelabel");
      for (i = 0; i < sidelabel.length; i++) {
        sidelabel[i].style.paddingRight = "10px";
      }
    }
  }

  // 下载 nav 并执行 navinit
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "/nav.html", true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      if (document.readyState === "complete") navinit();
      else document.addEventListener("readystatechange", navinit);
    }
  };
})();

// 后期添加的功能增强
window.addEventListener("DOMContentLoaded", function() {
  var toggleClass = function(element, className) {
    if (element.classList) {
      element.classList.toggle(className); // IE10 or higher
    } else {
      element.className = element.className.indexOf(className) === -1 ?
        element.className + " " + className :
        element.className.replace(className, "");
    }
  };

  // 给笔记正文添加折叠功能 -- #article > h2 区块
  if (document.getElementById("article")) {
    document.getElementById("article").addEventListener("click", function(e) {
      if (e.target.tagName.toLowerCase() === "h2") {
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
  }

  // 给笔记正文添加折叠功能 -- #article .dl 区块
  var dls = document.getElementsByClassName("dl"),
    i;
  if (dls) {
    for (i = 0; i < dls.length; i++) {
      dls[i].addEventListener("dblclick", function(e) {
        toggleClass(this, "collapse");
        e.stopPropagation();
      });
    }
  }

  // 调整 ipad 字体大小
  if (/ipad/i.test(navigator.userAgent)) {
    var meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content = "width=980";
    document.getElementsByTagName("head")[0].appendChild(meta);
  }
});

/* 
 * 输出了一个全局变量 setBase 作为 base 标签的替代方案
 * 调用示例：<script>setBase('table', 'http://www.w3schools.com/');</script>
 */
window.setBase = function(where, base) {
  window.addEventListener("DOMContentLoaded", function() {
    var superNode = document.getElementsByTagName(where),
      i, j, anchors;
    for (i = 0; i < superNode.length; i++) {
      anchors = superNode[i].getElementsByTagName("a");
      for (j = 0; j < anchors.length; j++) {
        if (anchors[j].href.search(location.hostname) === -1) continue;
        anchors[j].href = base + anchors[j].getAttribute('href');
      }
    }
  });
};
