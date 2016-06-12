/*
 * 该文档负责加载笔记顶部导航栏，并定义了 setBase 函数
 * 支持IE9及以上浏览器
 */

(function(){
  /*  下载topnav 并初始化 */
var xmlhttp=new XMLHttpRequest();
xmlhttp.open("GET","/topnav",true);
xmlhttp.send();
xmlhttp.onreadystatechange=function() {
  if (xmlhttp.readyState==4 && xmlhttp.status==200){
    if (document.body) navinit();
    else document.addEventListener("DOMContentLoaded", navinit());
  }
};

function navinit() {
  /*  定义顶部导航栏 */
  var topnav = document.createElement("div");
  topnav.id = "topnav";
  topnav.innerHTML=xmlhttp.responseText;
  topnav.style.position = "fixed";
  topnav.style.top = 0;
  topnav.style.left = 0;
  document.body.appendChild(topnav);
  document.getElementById("topnavpage").style.top = topnav.offsetHeight + "px";
  document.body.firstElementChild.style.marginTop = topnav.offsetHeight + "px";
  /*  定义顶部导航栏之“页内导航” */
  var contents = document.getElementById("contents");
  var topnavpage = document.getElementById("topnavpage");
  var topnavHeight = document.getElementById("topnav").offsetHeight;
  var x, i;
  if (contents != undefined) {
    x = contents.getElementsByTagName("a");
    topnavpage.parentElement.style.display = ""; 
    for (i=0; i < x.length; i++) topnavpage.appendChild(x[i].cloneNode(true));
    topnavpage.style.display = "block";
    if (topnavpage.offsetHeight + topnavHeight > window.innerHeight) {
      topnavpage.style.height = (window.innerHeight - topnavHeight) + "px";
      topnavpage.style.overflow = "scroll";
    }
    topnavpage.style.display = ""; //开了又关是为了拿到.offsetHeight
    if(/ipad|iphone/i.test(navigator.userAgent)){  // 解决 ipad 无法点击页面导致无法关闭弹出菜单问题
      document.addEventListener("touchend",function(){ },false);
    }
  }   
  /*  定义顶部导航栏之“页面标题” */
  var topnavcc = topnav.children[0].children
  if( topnavcc[0].clientWidth + topnavcc[1].clientWidth/2+20 < topnav.children[0].clientWidth/2){
    topnavcc[1].innerHTML = document.title;
    topnavcc[1].style.marginLeft = "-" + topnavcc[1].clientWidth / 2 + "px";
  }  
  /*  定义顶部导航栏之“参考手册” */
  var navref = document.getElementById("nav_references");
  navref.style.top =  topnavHeight + "px";
  if (navref.offsetHeight +topnavHeight > window.innerHeight) { //解决手机浏览无法滚动菜单问题
    navref.style.height = (window.innerHeight - topnavHeight) + "px";
    navref.style.overflow = "scroll";
  }
  /*  定义左侧导航栏 */  
  document.getElementById("sidemenu").style.top = topnav.offsetHeight + "px";
  document.getElementById("sidemenu").style.height = (window.innerHeight - topnavHeight) + "px";
}
  /*  调整 ipad 字体大小 */
if(/ipad/i.test(navigator.userAgent)){
  var meta = document.createElement("meta");
  meta.name = "viewport";
  meta.content = "width=980";
  document.getElementsByTagName("head")[0].appendChild(meta);
} 
})();

/* 负责开关左侧导航条 */
function sidemenuToggle() {
  var visibility = window.getComputedStyle ?
    window.getComputedStyle(document.getElementById("sidemenu"),null).getPropertyValue("visibility"):
    document.getElementById("sidemenu").currentStyle["visibility"];
  if (visibility == "hidden") {
    document.getElementById("sidemenu").style.height = (window.innerHeight -
      document.getElementById("topnav").offsetHeight) + "px";
    document.getElementById("sidemenu").style.visibility = "visible";
    if(document.getElementById("article")) document.getElementById("article").style.left = null;
    return;
  }
  document.getElementById("sidemenu").style.visibility = "hidden";
  if(document.getElementById("article")) document.getElementById("article").style.left = 0;
}

/* 负责开关“参考手册”弹出内容，设定为传参是为以后加项目做准备，如加项目还需添加 close_all 函数 */
function navToggle(x) {  
  if (document.getElementById("nav_" + x).style.visibility != "visible") {
    document.getElementById("nav_" + x).style.visibility = "visible";
    if (document.getElementById("topnavbtn_" + x)) {    
      document.getElementById("topnavbtn_" + x).getElementsByTagName("i")[0].style.display = "none";
      document.getElementById("topnavbtn_" + x).getElementsByTagName("i")[1].style.display = null;
    }
  } else {
    document.getElementById("nav_" + x).style.visibility = "hidden";
    if (document.getElementById("topnavbtn_" + x)) {
    document.getElementById("topnavbtn_" + x).getElementsByTagName("i")[0].style.display = null;
    document.getElementById("topnavbtn_" + x).getElementsByTagName("i")[1].style.display = "none";         
    }
  }
}

/* 设置base的替代方案，调用示例：<script>setBase('table', 'http://www.w3schools.com/cssref/');</script> */
function setBase(where, base){
  var oldonload = window.onload;
  window.onload = function(){
    if(typeof oldonload == 'function') oldonload();
    var superNode = document.getElementsByTagName(where);
    var m,n,anchors;
    for (m=0;m<superNode.length;m++){
      anchors = superNode[m].getElementsByTagName("a");
      for (n=0;n< anchors.length;n++){
        if(anchors[n].href.search(location.hostname) == -1) continue;
        anchors[n].href = base + anchors[n].getAttribute('href');
      }  
    }
  }
}