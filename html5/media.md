# HTML5 `<audio>` &amp; `<video>`

## HTML Media

就目前情况，视频用 MP4 音频用 MP3 可以应付所有主流浏览器，要应付 IE8 用带 FLASH 后备的 JavaScript 播放器就好。另外找视频托管网站可以得到更加专业强大的解决方案。

### Tags and Attributes

<table>
  <tr><th>Tag</th><th>Description</th></tr>
  <tr><td class="html5badge"><a href="tag_video.asp">&lt;video&gt;</a></td><td>Defines a video or movie</td></tr>
  <tr><td class="html5badge"><a href="tag_audio.asp">&lt;audio&gt;</a></td><td>Defines sound content</td></tr>
  <tr><td class="html5badge"><a href="tag_source.asp">&lt;source&gt;</a></td><td>Defines multiple media resources for media elements, such as &lt;video&gt; and &lt;audio&gt;</td></tr>
  <tr><td class="html5badge"><a href="tag_track.asp">&lt;track&gt;</a></td><td>Defines text tracks in media players</td></tr>
  <tr><td><a href="tag_object.asp">&lt;object&gt;</a></td><td>Defines an embedded object</td></tr>
  <tr><td class="html5badge"><a href="tag_embed.asp">&lt;embed&gt;</a></td><td>Defines a container for an external (non-HTML) application</td></tr>
</table>

<table>
  <tr><th>Attribute</th><th>Value</th><th>Tag</th><th>Description</th></tr>
  <tr><td class="html5badge"><a href="att_video_src.asp">src</a></td><td><i>URL</i></td><td>&lt;audio&gt; / &lt;video&gt;</td><td>指定资源地址</td></tr>
  <tr><td class="html5badge"><a href="att_video_controls.asp">controls</a></td><td>controls</td><td>&lt;audio&gt; / &lt;video&gt;</td><td>显示控制条</td></tr>
  <tr><td class="html5badge"><a href="att_video_preload.asp">preload</a></td><td>auto<br>metadata<br>none</td><td>&lt;audio&gt; / &lt;video&gt;</td><td>指定预加载方式</td></tr>
  <tr><td class="html5badge"><a href="att_video_autoplay.asp">autoplay</a></td><td>autoplay</td><td>&lt;audio&gt; / &lt;video&gt;</td><td>自动播放</td></tr>
  <tr><td class="html5badge"><a href="att_video_loop.asp">loop</a></td><td>loop</td><td>&lt;audio&gt; / &lt;video&gt;</td><td>循环播放</td></tr>
  <tr><td class="html5badge"><a href="att_video_muted.asp">muted</a></td><td>muted</td><td>&lt;audio&gt; / &lt;video&gt;</td><td>静音</td></tr>
    <tr><td class="html5badge"><a href="att_video_poster.asp">poster</a></td><td><em>URL IMG</em></td><td>&lt;video&gt;</td><td>指定海报(播放前显示的画面)</td></tr>
  <tr><td class="html5badge"><a href="att_video_height.asp">height</a></td><td><i>pixels</i></td><td>&lt;video&gt;</td><td>高</td></tr>
  <tr><td class="html5badge"><a href="att_video_width.asp">width</a></td><td><i>pixels</i></td><td>&lt;video&gt;</td><td>宽</td></tr>
  <tr><td class="html5badge"><a href="att_source_media.asp">media</a></td><td><i>media_query</i></td><td>&lt;source&gt;</td><td>通过媒体查询指定相匹配的源文件</td></tr>
  <tr><td class="html5badge"><a href="att_source_src.asp">src</a></td><td><i>URL</i></td><td>&lt;source&gt;</td><td>指定资源地址</td></tr>
  <tr><td class="html5badge"><a href="att_source_type.asp">type</a></td><td><em>media_type</em></td><td>&lt;source&gt;</td><td>指定资源 MIME 类型</td></tr>
</table>

```html
<video width="320" height="240" controls muted preload="metadata" poster="poster.jpg">
  <source src="movie.mp4" type="video/mp4">
  <source src="movie_mobile.mp4" type="video/mp4" media="(max-device-width: 480px)">
  Your browser does not support the video tag.
</video>

<audio src="horse.mp3" autoplay loop></audio>
```

### HTML Video - Browser Support
Currently, there are 3 supported video formats for the &lt;video&gt; element: MP4, WebM, and Ogg:

<table>
  <tr><th>Browser</th><th>MP4</th><th>WebM</th><th>Ogg</th></tr>
  <tr><td>Internet Explorer</td><td>YES IE9</td><td>NO</td><td>NO</td></tr>
  <tr><td>Chrome</td><td>YES 5</td><td>YES 6</td><td>YES 5</td></tr>
  <tr><td>Firefox</td><td>YES 21</td><td>YES 4</td><td>YES 3.5</td></tr>
  <tr><td>Safari</td><td>YES 3.1</td><td>NO</td><td>NO</td></tr>
  <tr><td>Opera</td><td>YES (from Opera 25)</td><td>YES 10.6</td><td>YES 10.5</td></tr>
</table>
<table>
  <tr><th>File Format</th><th>File</th><th>Media Type</th></tr>
  <tr><td>MP4</td><td>.mp4</td><td>video/mp4</td></tr>
  <tr><td>WebM</td><td>.webm</td><td>video/webm</td></tr>
  <tr><td>Ogg</td><td>.ogg</td><td>video/ogg</td></tr>
  <tr><td>Flash</td><td>.swf .flv</td><td>作为后备使用插件加载</td></tr>
</table>

### HTML Audio - Browser Support
Currently, there are 3 supported file formats for the &lt;audio&gt; element: MP3, Wav, and Ogg:

<table>
  <tr><th>Browser</th><th>MP3</th><th>Wav</th><th>Ogg</th></tr>
  <tr><td>Internet Explorer</td><td>YES IE9</td><td>NO</td><td>NO</td></tr>
  <tr><td>Chrome</td><td>YES 5</td><td>YES 8</td><td>YES 5</td></tr>
  <tr><td>Firefox</td><td>YES 21</td><td>YES 3.6</td><td>YES 3.6</td></tr>
  <tr><td>Safari</td><td>YES 3.1</td><td>YES 3.1</td><td>NO</td></tr>
  <tr><td>Opera</td><td>YES</td><td>YES 10.5</td><td>YES 10.5</td></tr>
</table>
<table>
  <tr><th>File Format</th><th>File</th><th>Media Type</th></tr>
  <tr><td>MP3</td><td>.mp3</td><td>audio/mpeg</td></tr>
  <tr><td>Ogg</td><td>.ogg</td><td>audio/ogg</td></tr>
  <tr><td>Wav</td><td>.wav</td><td>audio/wav</td></tr>
</table>

### HTML Video - Methods, Properties, and Events

```html
<div style="text-align:center">
  <button onclick="playPause()">Play/Pause</button>
  <button onclick="makeBig()">Big</button>
  <button onclick="makeNormal()">Normal</button>
  <br><br>
  <video id="video1" width="420">
    <source src="mov_bbb.mp4" type="video/mp4">
    <source src="mov_bbb.ogg" type="video/ogg">
    Your browser does not support HTML5 video.
  </video>
</div>
<script>
  var myVideo = document.getElementById("video1");
  function playPause() { if (myVideo.paused) myVideo.play(); else myVideo.pause(); }
  function makeBig() { myVideo.width = 560; }
  function makeNormal() { myVideo.width = 420; } 
</script>
```

### HTML Plug-ins

Plug-ins can be added to web pages with the &lt;object&gt; tag or the &lt;embed&gt; tag. 

Plug-ins can be used for many purposes: display maps, scan for viruses, verify your bank id, etc.

```html
<object width="400" height="50" data="flash.swf"></object>
<object width="100%" height="500px" data="webpage.html"></object>
<object data="img.jpg"></object>

<embed width="400" height="50" src="flash.swf">
<embed width="100%" height="500px" src="webpge.html">
<embed src="img.jpg">
```
Note that the &lt;embed&gt; element does not have a closing tag. It can not contain alternative text.

### YouTube / Youku

```html
<iframe width="420" height="315" src="http://www.youtube.com/embed/XGSy3_Czz8k?autoplay=1"></iframe>
<!-- HTML5 里 iframe 可配置选项大幅削减 -->
<embed src="http://player.youku.com/player.php/sid/XMzI2NTc4NTMy/v.swf"
  allowFullScreen="true" quality="high" width="480" height="400" align="middle"
  allowScriptAccess="always" type="application/x-shockwave-flash"></embed>
<!-- HTML5 标准里 embed 是不能有关闭标签的，但优酷代码里有，另外优酷也推荐 iframe 方式以同时支持 safari -->
```

## CH05 音频与视频

### 5.1 网络视频的演变

在没有 HTML5 的情况下，可以通过两种方式向网页中添加视频。一种过时的方式是使用 `<embed>` 元素把视频硬塞进页面中。这种方式的问题是一切只能听天由命。你没有办法控制播放进度，也不能提前缓冲视频以避免长时间的播放停滞，甚至你都不知道自己的视频文件能否在不同浏览器或操作系统中播放。

第二种方式是使用浏览器插件，比如最受欢迎的 Adobe Flash。Flash 完全解决了浏览器支持问题，Flash 视频能够在安装了 Flash 插件的任何地方播放。不过，Flash 也不完美。为了把 Flash 视频放到网页中，必须使用 `<object>` 和 `<embed>` 元素编写一大堆乱七八糟的标记，必须适当地编码视频文件，但是，最严重的问题还在于苹果的移动设备根本就不支持 Flash。
插件不可靠也是业界的共识，这是由插件的工作方式决定的。

### 5.2 HTML5 音频与视频

HTML5 支持音频和视频的想法非常简单。既然能使用 `<img>` 元素在网页中添加图像，就应该能使用 `<audio>` 和 `<video>` 元素在网页中添加音频和视频，于是 HTML5 就增加了这两个元素。

#### 不行就还用 Flash
HTML5 新增的音频和视频功能不能满足所有需求。如果你需要考虑以下事项，那么最好还是用 Flash（至少目前还是要用）。

- 有许可限制的内容。HTML5 视频文件没有任何版权保护措施。数字版权管理功能现在还在开发中。
- 录制视频或音频。如果你想开发一个在线聊天程序，要使用访客机器上的麦克风和摄像头，还得用 Flash。
- 自适应视频流。主流的、视频丰富的网站都需要精细地控制视频流和缓冲。在 HTML5 能提供这些功能之后，视频分享网站可能会向 HTML5 迁移，但不会完全脱离 Flash。
- 低延迟、高性能音频。虽然浏览器开发商在努力提升 HTML5 音频的性能，但目前还无法满足要求。
- 动态创建或编辑音频。

### 5.3 HTML5 媒体格式

MIME 类型就是一小段信息，表示某种 Web 资源的内容类型。例如，网页的 MIME 类型就是 text/html。
Web 服务器在把某个资源发送给浏览器的时候，会在前面发送 MIME 类型。这样，浏览器就不必根据文件的扩展名或其他信息去判断了。

为避免出错，务必要正确地配置 Web 服务器，同时也不要忘了给自己的音频和视频文件使用正确的扩展名。因为 Web 服务器要成对儿使用这两方面信息。比如，把 .mp4 文件配置为 video/mp4 这个 MIME 类型后，却在视频文件上使用了.mpFour 作为扩展名，那 Web 服务器就不知道你想让它做什么了。

#### 移动设备的注意事项

移动设备上的浏览器各有各的问题。有些不支持像自动播放和循环这样的功能，因为这些功能会耗尽电量以及宝贵的带宽。但即便你不打算使用这些功能，移动设备也需要做专门的考虑来确保良好的视频播放性能以及将数据使用量最小化。针对移动设备进行视频编码时，可以降低质量，可能的话，还可以降低分辨率。

这里有一个经验法则，如果你想让视频能在移动设备上播放，那就应该使用H.264 Baseline Profile（而非Hight Profile）编码。对于iPhone和Android手机，视频尺寸不必超过 640×480 像素。很多编码软件都有针对移动视频进行优化的预设选项。

### 5.4 后备措施：如何讨好每一款浏览器

Web 开发人员用在 HTML5 视频上的后备措施有两种。第一种是格式后备措施。这个机制是 HTML5 内置的，允许你将一种格式的媒体文件替换成另一种格式的文件。第二种后备措施是一个技术方案，如果浏览器不支持 &lt;video&gt; 和 &lt;audio&gt; 元素，可以用久经考验的 Flash 播放器替代。Flash 后备措施更容易实现，因为它使用相同的媒体文件，并且它兼容了更多的浏览器，比如“恐龙时代”的 IE8，所以忽略 Flash 后备措施是在冒险。

如果创建一个同时支持桌面和移动设备的视频页面，为确保移动设备播放轻量级视频，桌面浏览器播放高品质视频，需要写一些 JavaScript，或者使用媒体查询，这会在8.4节介绍。

#### 添加 Flash 后备措施

要理解 Flash 后备措施是怎样工作的，首先要知道有史以来的所有浏览器在对待不认识的标签时行为都一样：视而不见。比如，假设 IE8 遇到了陌生的 &lt;video&gt; 开始标签，它只会“一笑而过”，根本不去检查其 src 属性。然而，浏览器不会忽略不认识的元素中包含的内容，这可是一个非常重要的差异。同时也要注意，支持 HTML5 音频的浏览器即使不能播放媒体文件，也会忽略后备内容。

各式各样的 Flash 播放器太多了，其中很多都是免费的，至少非商业用途不收费。顺便说一下，有很多 JavaScript 播放器直接支持 HTML5 并且有一个内置的 Flash 后备措施。比如 [Video.js](https://github.com/videojs/video.js)。这种方式的优势是简化了 HTML 代码，不足之处在于这远离了纯粹的 HTML5 解决方案。
```html
<!--[if IE 8]><script src="//vjs.zencdn.net/ie8/1.1.1/videojs-ie8.min.js"></script><![endif]-->
<link href="//vjs.zencdn.net/5.8/video-js.min.css" rel="stylesheet">
<script src="//vjs.zencdn.net/5.8/video.min.js"></script>

<video id="video1" class="video-js vjs-default-skin" controls width="640" height="264" data-setup='{}'>
  <source src="video1.mp4" type="video/mp4">
  To view this video please enable JavaScript, or upgrade to a web browser that supports HTML5 video.
</video>
```
As of Video.js 5.0, the source is transpiled from ES2015 to ES5, but IE8 only supports ES3. In order to continue to support IE8, we've bundled an ES5 shim and sham together and hosted it on the CDN.

### 5.5 使用 JavaScript 控制播放器

### 5.6 视频字幕 P144
