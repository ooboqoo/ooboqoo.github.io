(function() {
  var src = document.getElementById("md").getAttribute("data-src");
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", src, false);
  xmlhttp.send();

  // 替换自定义的<tag>标记，并给所有表格套了个 div.responsive
  document.getElementById("md").innerHTML = marked(xmlhttp.responseText)
    .replace(/<tag>/g, "<").replace(/<\/tag>/g, ">")
    .replace(/(<table>[\S\s]*?<\/table>)/g, '<div class="responsive">$1</div>');

  // 代码高亮
  hljs.initHighlightingOnLoad();
}());
