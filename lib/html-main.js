/*!
 * 此代码为遗留 html 页面提供功能支持，大的框架的代码已经移到新的 main.js
 * 2016/8/15
 */

// 删减后的页面初始化代码
window.addEventListener("DOMContentLoaded", function() {

    // 定义“页内导航”
    var contents = document.getElementById("contents");
    var pagenav = document.createElement("div");
    var i, x;

    if (contents !== null) {

      pagenav.id = "pagenav";
      pagenav.innerHTML = '索引<div id="plist"></div>';
      document.body.appendChild(pagenav);
      
      x = contents.getElementsByTagName("a");
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

});

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
