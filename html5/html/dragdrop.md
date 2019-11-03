# HTML5 Drag/Drop

https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

## API

### Events

||||
|-----------|-----------|------------------------------------------------------------------------------
| dargstart | element   | is fired when the user starts dragging an element or text selection
| dragend   | element   | is fired when a drag operation is being ended
| drag      | element   | 拖动过程中连续触发
| drop      | container | is fired when an element or text selection is dropped on a valid drop target
| dragenter | container | is fired when a dragged element or text selection enters a valid drop target
| dragleave | container | 拖拽对象从容器离开时触发
| dragover  | container | 拖动过程中连续触发

注意： `dragover` 事件中必须阻止浏览器默认行为，否则后续的 `drop` 事件将不会被触发。因为浏览器默认是不允许将可拖拽元素放置到另外的元素上的。

### Interfaces

#### DataTransfer

|||
|----------------|-----------------------------------------------------------------------------------------------
| dropEffect     | 设置或读取操作类型，可选值 `none` `copy` `link` `move`
| effectAllowed  | |
| files          | 将本地文件拖拽到页面容器时用到
| items          | 可拖拽多个对象，IE10 不支持
| types          | 可拖拽多个对象
| setData(format, data) | format - A DOMString representing the type of the drag data to add to the `drag object`
| getData(format)       | |
| clearData([format])   | |
| setDragImage(img, x, y) | 设置拖拽时用的自定义图片，IE10 不支持


## 应用示例

### 可拖动列表项

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>HTML5 Drag/Drop</title>
  <style>
    [draggable] { user-select: none; }
    .container { list-style-type: none; }
    .column { width: 162px; padding: 5px; text-align: center; cursor: move; }
    .column.dragging { opacity: 0.4; }
    .column.dragover { border-top: 2px solid blue; }
    .column header { padding: 5px; background-color: #ccc; border: 2px solid #666; border-radius: 10px; }
  </style>
</head>
<body>
  <ul class="container">
      <li class="column" draggable="true"><header>A1</header></li>
      <li class="column" draggable="true"><header>B1</header></li>
      <li class="column" draggable="true"><header>C1</header></li>
  </ul>
  <ul class="container">
      <li class="column" draggable="true"><header>A2</header></li>
      <li class="column" draggable="true"><header>B2</header></li>
      <li class="column" draggable="true"><header>C2</header></li>
  </ul>
  <script>
    var dragSrcElem = null;

    function handleDragStart(ev) {
      dragSrcElem = this;
      this.classList.add('dragging');
      ev.dataTransfer.setData('text/html', this.innerHTML);  // 演示通过 DataTransfer 传递信息
    }
    function handleDragEnd(ev) { this.classList.remove('dragging'); }
    function handleDragOver(ev) {
      ev.preventDefault();  // 没有这一句，就不会触发 drop
      this.classList.add('dragover');  // 这一句必须放 dragover 里，如果放 dragenter 里容易被 dragleave 误移除
    }
    function handleDragLeave(ev) { this.classList.remove('dragover'); }
    function handleDrop(ev) {
      if (this != dragSrcElem) {
        dragSrcElem.parentNode.removeChild(dragSrcElem);
        this.parentNode.insertBefore(dragSrcElem, this);
        alert(ev.dataTransfer.getData('text/html'));  // <header>XX</header>
      }
      this.classList.remove('dragover');
    }

    function addDnDHandlers(elem) {
      elem.addEventListener('dragstart', handleDragStart, false);
      elem.addEventListener('dragend', handleDragEnd, false);
      elem.addEventListener('dragover', handleDragOver, false);
      elem.addEventListener('dragleave', handleDragLeave, false);
      elem.addEventListener('drop', handleDrop, false);
    }

    [].forEach.call(document.querySelectorAll('.container .column'), addDnDHandlers);
  </script>
</body>
</html>
```

### 上传文件

IE10 开始支持 **拖拽**、**File API** 以及样式中的 **Flexbox**，所以适用于 IE10+ 场景。

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>HTML5 Drag/Drop</title>
  <style>
    [draggable] { user-select: none; }
    #uploader { display: flex; justify-content: center; align-items: center;
                width: 200px; height: 200px; border: 1px dotted gray; }
  </style>
</head>
<body>
  <div id="uploader" draggable="true">请拖动文件到框内</div>
  <script>
    var uploader = document.getElementById('uploader');
    function handleDrop(ev) {
      ev.preventDefault();  // 要是没有这句，浏览器会尝试打开文件
      var files = ev.dataTransfer.files;
      console.log(files);
      upload(files);
      ev.stopPropagation();
    }
    uploader.addEventListener('dragover', ev => ev.preventDefault(), false);
    uploader.addEventListener('drop', handleDrop, false);

    function upload(files) {
      var fd = new FormData();
      files.forEach(function (file) { fd.append("file", file); });
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "URL/TO/YOUR/FILE/HANDLER");
      xhr.send(fd);
    }
  </script>
</body>
</html>
```

