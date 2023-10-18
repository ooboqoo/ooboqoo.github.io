# WebRTC

https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API

### RTCPeerConnection


### MediaStream



### RTCDataChannel



## Example

### 抓取并显示摄像头影像

```js
navigator.mediaDevices.enumerateDevices().then(devices => {
  console.log({devices})
  const hasCamera = !!devices.filter(device => device.kind === 'videoinput').length
  if (!hasCamera) {
    alert('没有找到可用摄像头！')
  } else {
    navigator.getUserMedia(
      {video: true, audio: false},
      (stream) => { video.srcObject = stream; video.play() },
      (err) => { console.log('An error occured! ' + err) }
    )
  }
})
```
