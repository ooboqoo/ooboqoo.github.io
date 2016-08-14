// 图片放大效果
window.addEventListener('load', function() {
  var cvs1 = document.getElementById("cvs1");
  var ctx1 = cvs1.getContext("2d");
  var cvs2 = document.getElementById("cvs2");
  var ctx2 = cvs2.getContext("2d");
  var rect = cvs1.getBoundingClientRect();
  var ratio = cvs2.width / cvs1.width;
  var img = new Image();

  img.onload = function() {
    ctx1.drawImage(img, 0, 0, cvs1.width, cvs1.height);
  };
  img.src = "flower.jpg";

  cvs1.onmousemove = function(e) {
    var mouseX = e.clientX - rect.left;
    var mouseY = e.clientY - rect.top;
    var focusWidth = 50;
    var focusHeight = 50;
    ctx1.drawImage(img, 0, 0, cvs1.width, cvs1.height);
    ctx1.strokeRect(mouseX, mouseY, focusWidth, focusHeight);
    ctx2.clearRect(0, 0, cvs2.width, cvs2.height);
    ctx2.drawImage(img, mouseX * ratio, mouseY * ratio, focusWidth * ratio,
      focusHeight * ratio, 0, 0, cvs2.width, cvs2.height);
  };

  cvs1.onmouseleave = function() {
    ctx1.drawImage(img, 0, 0, cvs1.width, cvs1.height);
  };  
});

// 弹跳小球效果
window.addEventListener('load', function() {
  var cvs = document.getElementById("ball");
  var ctx = cvs.getContext("2d");
  var rect = cvs.getBoundingClientRect();
  var balls = [];
  var colors = ["red", "green", "blue", "orange", "deeppink", "olive"];
  var ballUnderDrag = false;
  cvs.onmousedown = canvasClick;
  cvs.onmouseup = stopDragging;
  cvs.onmouseout = stopDragging;
  cvs.onmousemove = dragBall;

  ctx.globalAlpha = 0.8;
  drawFrame();

  function Ball(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = fromTo(-5, 5);
    this.dy = fromTo(-5, 5);
    this.r = radius;
    this.c = color;
    this.underDrag = false;
  }

  function fromTo(m, n) {
    return Math.round(m + Math.random() * Math.abs(m - n));
  }

  function createBall(x, y) {
    var r = fromTo(20, 40);
    x = x + r > cvs.width ? x - r : (x -r < 0 ? x + r : x);
    y = y + r > cvs.height ? cvs.height -r : y;
    var ball = new Ball(x, y, r, colors[fromTo(0, colors.length - 1)]);
    balls.push(ball);
  }

  function drawFrame() {
    ctx.clearRect(0,0,cvs.width,cvs.height);
    balls.forEach(function(b) {
      // 为移动的小球提供模拟重力加速及摩擦减速效果
      if (!b.underDrag) {
        b.x += b.dx;  // dx 为 x 方向的加速度
        b.y += b.dy;  // dy 为 y 方向的加速度
        b.dx = (b.x + b.r + b.dx > cvs.width || b.x - b.r + b.dx < 0) ? -b.dx :
          b.dx * 0.998;  // dx 是持续减，而 dy 是碰撞时减
        b.dy = (b.y + b.r + b.dy > cvs.height) ? -b.dy * 0.9 : b.dy + 0.2;
      }
      ctx.fillStyle = b.c;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    });
    setTimeout(drawFrame, 20);
  }

  function canvasClick(e) {
    var mouseX = e.clientX - rect.left;
    var mouseY = e.clientY - rect.top;
    for (var i = balls.length - 1; i >= 0; i--) {
      var distanceFromCenter = Math.sqrt(Math.pow(balls[i].x - mouseX, 2) +
        Math.pow(balls[i].y - mouseY, 2));
      if (distanceFromCenter <= balls[i].r) {
        ballUnderDrag = balls[i];
        ballUnderDrag.underDrag = true;
        return;
      }
    }
    createBall(mouseX, mouseY);
  }

  function dragBall(e) {
    var mouseX = e.clientX - rect.left;
    var mouseY = e.clientY - rect.top;
    if (ballUnderDrag !== false) {
      ballUnderDrag.x = mouseX;
      ballUnderDrag.y = mouseY;
    }
  }

  function stopDragging() {
    if (ballUnderDrag) {
      ballUnderDrag.dx = fromTo(-5, 5);
      ballUnderDrag.dy = fromTo(-5, 5);
      ballUnderDrag.underDrag = false;
    }
    ballUnderDrag = false;
  }

});