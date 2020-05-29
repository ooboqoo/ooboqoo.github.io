# Swiper


https://swiperjs.com/


### thumbs-gallery

带 thumbs 的轮播实际上是两个轮播组合起来的。初始化后，`.gallery-thumbs` 下的 `.swiper-slider` 会被强制修改宽度，计算公式 `.gallery-thumbs的宽度 / slidesPerView`。`.swiper-srapper` 元素的作用不是用来定位或计算宽度的，而是用以支持切屏动画的。

```css
.swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
}
```

```html
<div class="swiper-container gallery-top">
  <div class="swiper-wrapper">
    <div class="swiper-slide" style="background-image:url(./images/nature-1.jpg)"></div>
    <div class="swiper-slide" style="background-image:url(./images/nature-2.jpg)"></div>
    <div class="swiper-slide" style="background-image:url(./images/nature-3.jpg)"></div>
    <div class="swiper-slide" style="background-image:url(./images/nature-4.jpg)"></div>
  </div>
  <div class="swiper-button-next swiper-button-white"></div>
  <div class="swiper-button-prev swiper-button-white"></div>
</div>
<div class="swiper-container gallery-thumbs">
  <div class="swiper-wrapper">
    <div class="swiper-slide" style="background-image:url(./images/nature-1.jpg)"></div>
    <div class="swiper-slide" style="background-image:url(./images/nature-2.jpg)"></div>
    <div class="swiper-slide" style="background-image:url(./images/nature-3.jpg)"></div>
    <div class="swiper-slide" style="background-image:url(./images/nature-4.jpg)"></div>
  </div>
</div>
```

```js
var galleryThumbs = new Swiper('.gallery-thumbs', {
  spaceBetween: 10,
  slidesPerView: 3,
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
});
var galleryTop = new Swiper('.gallery-top', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  thumbs: {
    swiper: galleryThumbs
  }
});
```




### 屏内滚动

碰到的问题：在整屏滚动的场景下，某个位置需要支持内容滚动。

```jsx
import React, {useEffect} from 'react';

export default function Page(props) {
  const handleScroll = evt => {
    const el = evt.currentTarget;
    // 滚动到顶部或底部就启用 swiper 滚动
    if (el.scrollTop === 0 || el.scrollTop + el.clientHeight === el.scrollHeight) {
      el.classList.remove('swiper-no-swiping');
    }
  };

  useEffect(() => {
    const el = boardElement.current;
    if (el.clientHeight === el.scrollHeight) {
      el.classList.remove('swiper-no-swiping');
      el.classList.remove('no-swiping');
    }
  }, []);

  return (
    <div className="no-swiping swiper-no-swiping" onTouchMove={handleScroll}>
      <div dangerouslySetInnerHTML={{__html: story}}></div>
    </div>
  );
}
```







