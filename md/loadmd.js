(function() {
  var src = document.getElementById("md").getAttribute("data-src");
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", src, false);
  xmlhttp.send();
  document.getElementById("md").innerHTML =
    marked(xmlhttp.responseText).replace(/(<table>[\S\s]*?<\/table>)/ig,
      '<div class="responsive">$1</div>');  // 给表格套了个 div
  // 移除 pre 下 code 标记，并修改 class 的值，以适配 highlight.js
  var pre = document.getElementById("md").getElementsByTagName("pre");
  var code;
  for (var i = 0; i < pre.length; i++) {
    code = pre[i].children[0];
    pre[i].className = code.className.replace("lang-", "");
    pre[i].innerHTML = code.innerHTML;
  }
}());
