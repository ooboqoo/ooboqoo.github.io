/**
 该文档负责加载笔记导航栏，并定义了 setBase 函数
 支持IE9及以上浏览器
**/

(function() {
  document.removeEventListener("readystatechange", navinit);

  // 定义初始化函数
  function navinit() {
    var nav = document.createElement("div"),
      i = 0;
    nav.id = "nav";
    nav.innerHTML = xmlhttp.responseText;
    document.body.appendChild(nav);

    // 定义打开菜单按钮动作
    document.getElementById("openmenu").addEventListener("click", function(e) {
      var sidemenu = document.getElementById("sidemenu");
      sidemenu.style.display = sidemenu.style.display === "block" ? "" :
        'block';
      e.stopPropagation();
    });

    // 定义菜单关闭按钮动作
    document.getElementById("closebtn").addEventListener("click", function(e) {
      document.getElementById("sidemenu").style.display = '';
      e.stopPropagation();
    });

    // 定义折叠菜单栏功能
    document.getElementById("sidemenu").addEventListener("click", function(e) {
      var neStyle = e.target.nextElementSibling.style;
      if (e.target.tagName.toUpperCase().indexOf("H2") === 0) {
        neStyle.display = neStyle.display ? "" : "none";
        e.target.className = e.target.className ? "" : "collapse";
      }
      e.stopPropagation();
    });

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
      // 解决定位问题
      if (window.innerWidth >= 1210) {
        pagenav.style.left = window.innerWidth / 2 - 385 + "px";
      }
      window.addEventListener("resize", function() {
        var pagenav = document.getElementById("pagenav");
        if (window.innerWidth >= 1210) {
          pagenav.style.left = window.innerWidth / 2 - 385 + "px";
        } else {
          pagenav.style.left = "";
        }
      });
    }

    // 优化 ipad 侧边按钮点击操作
    if (/ipad/i.test(navigator.userAgent)) {
      var sidelabel = document.getElementsByClassName("sidelabel");
      for (i = 0; i < sidelabel.length; i++) {
        sidelabel[i].style.paddingRight = "10px";
      }
    }
  }

  // 下载 nav 并初始化
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "/nav.html", true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      if (document.readyState !== "loading") {
        navinit();
      } else {
        document.addEventListener("readystatechange", navinit);
      }
    }
  };
})();

window.addEventListener("DOMContentLoaded", function() {

  // 给笔记正文添加折叠功能
  if (document.getElementById("article")) {
    document.getElementById("article").addEventListener("click",
      function(e) {
        var next = e.target.nextElementSibling;
        if (e.target.tagName.toUpperCase() === "H2" &&
          next.tagName.toUpperCase() === "DIV") {
          next.style.display = next.style.display ? "" : "none";
          e.target.className = e.target.className ? "" : "collapse";
        }
      });
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
