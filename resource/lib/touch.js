/**
 * 在 https://github.com/bh-lay/toucher 项目上做了删减调整
 *
 * 用法介绍：
 * ```
 * var myTouch = addTouch(document.getElementById('touchBox'));
 * myTouch.on('singleTap',function(e) {
 *   //
 * }).on('longTap',function(e) {
 *   //
 * }).on('singleTap','.checkA',function(e) {
 *   console.log(this,e);
 *   return false;
 * });
 * ```
 */

(function(window, document) {

  /**
   * 事件触发器，根据事件最原始被触发的 target，逐级向上追溯事件绑定
   * @param {string} eventName 事件名
   * @param {object} e 原生事件对象
   */
  function EMIT(eventName, e) {
    this._events = this._events || { };
    // 事件堆无该事件，结束触发
    if (!this._events[eventName]) { return; }

    var handlers = this._events[eventName];
    var target = this.dom;

    handlers.forEach(function (handler) {
      runHandler(eventName, handler, target, e);
    });
  }

  /**
   * 执行绑定的回调函数，并创建一个事件对象
   * @param {string} eventName 事件名
   * @param {function} handler 被执行掉的函数
   * @param {object} dom 指向的 dom
   * @param {object} e 原生 event 对象
   */
  function runHandler(eventName, handler, dom, e) {
    // 优先使用自定义的 touches（目前是为了解决 touchEnd 无 touches 的问题）
    var touches = e.plugTouches || e.touches;
    var touch = touches.length ? touches[0] : { };
    var newEvent = {
      type: eventName,
      target: e.target,
      pageX: touch.pageX,
      pageY: touch.pageY,
      clientX: touch.clientX || 0,
      clientY: touch.clientY || 0
    };

    // 为 swipe 事件增加交互初始位置及移动距离
    if (eventName.match(/^swipe/) && e.plugStartPosition) {
      newEvent.startX = e.plugStartPosition.pageX;
      newEvent.startY = e.plugStartPosition.pageY;
      newEvent.moveX = newEvent.pageX - newEvent.startX;
      newEvent.moveY = newEvent.pageY - newEvent.startY;
    }

    var call_result = handler.call(dom, newEvent);  // 执行绑定事件的回调，并记录返回值
    // 若返回false，阻止浏览器默认事件
    if (call_result === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    return call_result;
  }

  /** 判断swipe方向 */
  function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >= Math.abs(y1 - y2)
      ? (x1 - x2 > 0 ? 'Left' : 'Right')
      : (y1 - y2 > 0 ? 'Up' : 'Down');
  }

  /** 监听原生的事件，主动触发模拟事件 */
  function eventTransform(DOM) {
    var _this = this;
    var touchStartTime = 0;  // 单击开始时间
    var lastTouchTime = 0;   // 记录上一次点击时间
    var touchDelay;          // 单击事件的延时器
    var longTap;             // 测试长按事件的延时器
    var isActive = false;    // 记录当前事件是否已为等待结束的状态

    var eventCache = null;   // 记录有坐标信息的事件
    var x1, y1, x2, y2;      // 记录初始单击的位置

    /** 单次用户操作结束 */
    function onActionOver(e) {
      isActive = false;
      clearTimeout(longTap);
      clearTimeout(touchDelay);
    }

    /** 判断事件是否为单击事件 */
    function isSingleTap() {
      onActionOver();
      EMIT.call(_this, 'singleTap', eventCache);
    }

    /** 触摸开始 */
    function onTouchStart(e) {
      // 缓存事件
      eventCache = e;
      x1 = e.touches[0].pageX;
      y1 = e.touches[0].pageY;
      x2 = 0;
      y2 = 0;
      isActive = true;
      touchStartTime = new Date();
      EMIT.call(_this,'swipeStart', e);
      // 检测是否为长按
      clearTimeout(longTap);
      longTap = setTimeout(function(){
        onActionOver(e);
        // 断定此次事件为长按事件
        EMIT.call(_this,'longTap', e);
      },500);
    }

    /** 触摸结束 */
    function onTouchEnd(e) {
      // touchend 中，拿不到坐标位置信息，故使用全局保存下数据
      e.plugStartPosition = eventCache.plugStartPosition;
      e.plugTouches = eventCache.touches;

      EMIT.call(_this, 'swipeEnd', e);
      if(!isActive) {
        return;
      }
      var now = new Date();
      // 若未监听doubleTap，直接响应
      if (!_this._events.doubleTap || _this._events.doubleTap.length == 0) {
        isSingleTap();
      } else if (now - lastTouchTime > 200) {
        // 延迟响应
        touchDelay = setTimeout(isSingleTap,190);
      } else {
        clearTimeout(touchDelay);
        onActionOver(e);
        // 断定此次事件为连续两次单击事件
        EMIT.call(_this,'doubleTap', eventCache);
      }
      lastTouchTime = now;
    }

    /** 手指移动 */
    function onTouchMove(e) {
      // 缓存事件
      eventCache = e;
      // 在原生事件基础上记录初始位置（为swipe事件增加参数传递）
      e.plugStartPosition = {
        pageX : x1,
        pageY : y1
      };
      // 断定此次事件为移动事件
      EMIT.call(_this,'swipe',e);

      if (!isActive){
        return;
      }
      x2 = e.touches[0].pageX;
      y2 = e.touches[0].pageY;
      if (Math.abs(x1-x2)>2 || Math.abs(y1-y2)>2) {
        // 断定此次事件为移动手势
        var direction = swipeDirection(x1, x2, y1, y2);
        EMIT.call(_this,'swipe' + direction, e);
      } else {
        // 断定此次事件为单击事件
        isSingleTap();
      }
      onActionOver(e);
    }

    // 添加事件监听
    DOM.addEventListener('touchstart', onTouchStart);
    DOM.addEventListener('touchend', onTouchEnd);
    DOM.addEventListener('touchmove', onTouchMove);
    DOM.addEventListener('touchcancel', onActionOver);
  }

  function Touch(DOM) {
    this.dom = DOM;
    this._events = { };                  // 存储监听事件的回调
    eventTransform.call(this, this.dom);  // 监听 DOM 原生事件
  }

  /** 增加事件监听，支持链式调用 */
  Touch.prototype.on = function ON(eventStr, func) {

    // 检测 callback 是否合法，事件名参数是否存在
    if (typeof(func) === 'function' && eventStr && eventStr.length) {
      var eventNames = eventStr.split(/\s+/);
      var _this = this;

      eventNames.forEach(function(eventName) {
        // 事件堆无该事件，创建一个事件堆
        if(!_this._events[eventName]) {
          _this._events[eventName] = [];
        }
        _this._events[eventName].push(func);
      });
    }

    // 提供链式调用的支持
    return this;
  };

  // 对外提供接口
  window.addTouch = function (dom) {
    return new Touch(dom);
  };
})(window, document);

// 控制导航条操控的代码直接放在这里，方便使用
window.addEventListener('load', function() {
  var header   = document.getElementById('header');
  var md       = document.getElementById('md');
  var sidemenu = document.getElementById("sidemenu");

  addTouch(md).on('swipeDown', function(e) {
    if (document.body.scrollTop < 80) {
      header.classList.add("show");
    }
  }).on('swipeUp', function(e) {
    header.classList.remove("show");
  }).on('swipeRight', function(e) {
    if (e.startX < 80) {
      sidemenu.classList.toggle("show");
    }
  });

  addTouch(sidemenu).on('swipeLeft', function(e) {
    sidemenu.classList.toggle("show");
  });

});
