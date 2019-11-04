# Animation Snippets

具体实现直接在 DevTools 中查看源码。

### Donut spinner

```css
@keyframes spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.donut {
  animation: spin 1.2s linear infinite;
}
```

<div class="demo">
  <div class="donut"></div>
  <style>
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .donut {
      display: inline-block;
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-left-color: #7983ff;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      animation: spin 1.2s linear infinite;
    }
  </style>
</div>

### 抖动提醒 wiggle

<div class="demo">
  <a class="wiggle-button">More(每 2s 抖一抖)</a>
  <style>
    .wiggle-button {
      display: inline-block;
      padding: 5px 10px;
      color: #333;
      border: 1px solid #ccc;
      animation: wiggle 2s linear infinite;
      will-change: transform;
    }
    @keyframes wiggle {
      2% {transform: translateX(3px) rotate(2deg); }
      4% {transform: translateX(-3px) rotate(-2deg); }
      6% {transform: translateX(3px) rotate(2deg); }
      8% {transform: translateX(-3px) rotate(-2deg); }
      10% {transform: translateX(2px) rotate(1deg); }
      12% {transform: translateX(-2px) rotate(-1deg); }
      14% {transform: translateX(2px) rotate(1deg); }
      16% {transform: translateX(-2px) rotate(-1deg); }
      18% {transform: translateX(1px) rotate(0); }
      20% {transform: translateX(-1px) rotate(0); }
    }
  </style>
</div>

### Flip Card

卡片具有正面和背面，鼠标悬停会翻转

<div class="demo">
  <div class="flip-card">
    <div class="flip-card__front-side">Front Side<br>鼠标hover翻动</div>
    <div class="flip-card__back-side">Back Side</div>
  </div>
  <style>
    .flip-card {
      position: relative;
      width: 200px;
      height: 100px;
      perspective: 800px;  /* 改成 20px 就能看到这个属性的作用了 */
    }
    .flip-card__front-side, .flip-card__back-side {
      position: absolute;
      width: 100%;
      height: 100%;
      transition: transform .8s;
      backface-visibility: hidden; /* 这个新属性很重要，去掉对比下就知道 */
      border: 1px solid #eee;
      border-radius: 4px;
      box-shadow: 2px 2px 6px #eee;
    }
    .flip-card__back-side {
      background-image: linear-gradient(to right bottom, #ffb900, #ff7730);
      transform: rotateY(180deg);
    }
    .flip-card:hover .flip-card__front-side {
      transform: rotateY(-180deg);
    }
    .flip-card:hover .flip-card__back-side {
      transform: rotateY(0);
    }
  </style>
</div>

### Fancy Avatar

<div class="demo">
  <figure class="fancy-avatar">
    <img src="https://natours.netlify.com/img/nat-8.jpg" alt="Person on a tour" class="fancy-avatar__img">
    <figcaption class="fancy-avatar__caption">Mary Smith</figcaption>
  </figure>
  <div>
    <p style="font-weight: bold;">I had the best week ever with my family</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur libero repellat quis consequatur ducimus quam nisi exercitationem omnis earum qui.</p>
    <p>Aperiam, ipsum sapiente aspernatur libero repellat quis consequatur ducimus quam nisi exercitationem omnis earum qui.</p>
  </div>
  <style>
    .fancy-avatar {
      position: relative;
      float: left;
      width: 150px;
      height: 150px;
      /* border-radius: 50%; overflow: hidden; */  /* 这两位在上 hover 效果时就不行了，得用 clip-path 才行 */
      clip-path: circle(50% at 50% 50%);
      shape-outside: circle(50% at 50% 50%);       /* 这个属性控制了文字环绕效果 */
    }
    .fancy-avatar__img {
      height: 100%;
      object-fit: cover;  /* 图片不变形 */
      transform: scale(1.5);
      transition: transform .8s;
    }
    .fancy-avatar__caption {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 20%);
      transition: transform .8s;
      color: #fff;
      font-size: 1.5em;
      text-align: center;
      opacity: 0;
    }
    .fancy-avatar:hover .fancy-avatar__img {
      transform: scale(1);
      filter: blur(3px) brightness(80%);
    }
    .fancy-avatar:hover .fancy-avatar__caption {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  </style>
</div>

### Background Video

<div class="demo">
  <div class="bg-video">
    <video class="bg-video__video" autoplay muted loop>
      <source src="https://natours.netlify.com/img/video.mp4" type="video/mp4">
      <source src="https://natours.netlify.com/img/video.webm" type="video/webm">
    </video>
    <div>
      <p>更多免费背景资源见 https://coverr.co/</p>
      <p>...</p>
      <p>...</p>
      <p>...</p>
    </div>
  </div>
  <style>
    .bg-video {
      position: relative;
      width: 400px;
    }
    .bg-video__video {
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      object-fit: cover;  /* 确保影片覆盖整个区域 */
      opacity: .3;
    }
  </style>
</div>


