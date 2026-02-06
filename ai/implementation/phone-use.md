# Phone Use

## android-action-kernel

https://github.com/actionstatelabs/android-action-kernel

又一个 Phone Use 开源项目：android-action-kernel，让AI直接动手操作原生Android应用，单次调用成本降低95%、延迟<1秒

它主路径不用视觉模型，而是利用 Android 系统原生的 Accessibility API，拿到界面 XML 树，包括按钮文字、坐标、是否可点状态等，直接获取屏幕语义信息给LLM决策。

省掉截图-OCR-视觉模型的高成本，每次操作$0.01，便宜了95%；延迟从3-5秒缩短到<1秒，快了5倍；准确性提升至99%+

### 核心代码

```py
def get_llm_decision(goal: str, screen_context: str) -> Dict[str, Any]:
    """Sends screen context to LLM and asks for the next move."""
    system_prompt = """
    You are an Android Driver Agent. Your job is to achieve the user's goal by navigating the UI.
    
    You will receive:
    1. The User's Goal.
    2. A list of interactive UI elements (JSON) with their (x,y) center coordinates.
    
    You must output ONLY a valid JSON object with your next action.
    
    Available Actions:
    - {"action": "tap", "coordinates": [x, y], "reason": "Why you are tapping"}
    - {"action": "type", "text": "Hello World", "reason": "Why you are typing"}
    - {"action": "home", "reason": "Go to home screen"}
    - {"action": "back", "reason": "Go back"}
    - {"action": "wait", "reason": "Wait for loading"}
    - {"action": "done", "reason": "Task complete"}
    
    Example Output:
    {"action": "tap", "coordinates": [540, 1200], "reason": "Clicking the 'Connect' button"}
    """
    
    response = client.chat.completions.create(
        model=MODEL,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"GOAL: {goal}\n\nSCREEN_CONTEXT:\n{screen_context}"}
        ]
    )
    
    return json.loads(response.choices[0].message.content)
```

### 网友评论

https://x.com/aigclink/status/1999391269609701607

* 走 Accessibility 接口比纯视觉方案效率高太多。不用截图跑 OCR，直接拿结构化数据，速度快还省钱，实在是是没必要非得死磕图像识别，而且效率也会高很多
	* APP内h5和自渲染引擎的页面都用不了这个 通用性太差
* 视觉模型和文本模型的价格差距已经很小了，特别是国内的，真是又快又便宜！Midscene 去年就是基于 xml 树的，效果是不如视觉方案的，在移动端上框架众多，可能要适配每一个技术框架（比如各种跨端框架），而且对 canvas 这种就束手无策！


