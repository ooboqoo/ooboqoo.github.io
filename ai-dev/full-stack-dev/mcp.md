# MCP & A2A


## MCP

https://www.youtube.com/watch?v=zrs_HWkZS5w

MCP 模型上下文协议，即规定 Context 中有哪些 函数、资源 可以使用。

MCP 协议只规定了如何发现和调用函数，其他跟大模型有关的事项都不涉及。

### MCP Host vs MCP Server

MCP Host 会启动多个 MCP Server，Host 和各个 Server 之间通过 stdio 中传递 JSON 数据包来通信。

```txt
输入: {"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"Cline","version":"3.34.1"}},"jsonrpc":"2.0","id":0}
输出: {"jsonrpc":"2.0","id":0,"result":{"protocolVersion":"2025-03-26","capabilities":{"experimental":{},"prompts":{"listChanged":false},"resources":{"subscribe":false,"listChanged":false},"tools":{"listChanged":false}},"serverInfo":{"name":"weather","version":"1.19.0"}}}
输入: {"method":"notifications/initialized","jsonrpc":"2.0"}
输入: {"method":"tools/list","jsonrpc":"2.0","id":1}
输出: {"jsonrpc":"2.0","id":1,"result":{"tools":[{"name":"get_alerts","description":"Get weather alerts for a US state.\n\nArgs:\n    state: Two-letter US state code (e.g. CA, NY)\n","inputSchema":{"properties":{"state":{"title":"State","type":"string"}},"required":["state"],"title":"get_alertsArguments","type":"object"},"outputSchema":{"properties":{"result":{"title":"Result","type":"string"}},"required":["result"],"title":"get_alertsOutput","type":"object"}},{"name":"get_forecast","description":"Get weather forecast for a location.\n\nArgs:\n    latitude: Latitude of the location\n    longitude: Longitude of the location\n","inputSchema":{"properties":{"latitude":{"title":"Latitude","type":"number"},"longitude":{"title":"Longitude","type":"number"}},"required":["latitude","longitude"],"title":"get_forecastArguments","type":"object"},"outputSchema":{"properties":{"result":{"title":"Result","type":"string"}},"required":["result"],"title":"get_forecastOutput","type":"object"}}]}}
输入: {"method":"resources/list","jsonrpc":"2.0","id":2}
输出: {"jsonrpc":"2.0","id":2,"result":{"resources":[]}}
输入: {"method":"resources/templates/list","jsonrpc":"2.0","id":3}
输出: {"jsonrpc":"2.0","id":3,"result":{"resourceTemplates":[]}}
输入: {"method":"tools/call","params":{"name":"get_forecast","arguments":{"latitude":40.7128,"longitude":-74.006}},"jsonrpc":"2.0","id":4}
输出: {"jsonrpc":"2.0","id":4,"result":{"content":[{"type":"text","text":"\nOvernight:\nTemperature: 53°F\nWind: 18 mph E\nForecast: Rain showers likely. Cloudy. Low around 53, with temperatures rising to around 56 overnight. East wind around 18 mph. Chance of precipitation is 70%. New rainfall amounts less than a tenth of an inch possible.\n\n---\n\nThursday:\nTemperature: 63°F\nWind: 20 to 23 mph E\nForecast: Rain showers before 2pm, then showers and thunderstorms. Cloudy. High near 63, with temperatures falling to around 61 in the afternoon. East wind 20 to 23 mph, with gusts as high as 37 mph. Chance of precipitation is 100%. New rainfall amounts between 1 and 2 inches possible.\n\n---\n\nThursday Night:\nTemperature: 52°F\nWind: 14 to 20 mph S\nForecast: Showers and thunderstorms likely before 2am. Mostly cloudy. Low around 52, with temperatures rising to around 55 overnight. South wind 14 to 20 mph, with gusts as high as 31 mph. Chance of precipitation is 70%. New rainfall amounts between 1 and 2 inches possible.\n\n---\n\nFriday:\nTemperature: 54°F\nWind: 16 to 22 mph SW\nForecast: Partly sunny, with a high near 54. Southwest wind 16 to 22 mph, with gusts as high as 36 mph.\n\n---\n\nFriday Night:\nTemperature: 48°F\nWind: 18 to 23 mph W\nForecast: Partly cloudy. Low around 48, with temperatures rising to around 50 overnight. West wind 18 to 23 mph.\n"}],"structuredContent":{"result":"\nOvernight:\nTemperature: 53°F\nWind: 18 mph E\nForecast: Rain showers likely. Cloudy. Low around 53, with temperatures rising to around 56 overnight. East wind around 18 mph. Chance of precipitation is 70%. New rainfall amounts less than a tenth of an inch possible.\n\n---\n\nThursday:\nTemperature: 63°F\nWind: 20 to 23 mph E\nForecast: Rain showers before 2pm, then showers and thunderstorms. Cloudy. High near 63, with temperatures falling to around 61 in the afternoon. East wind 20 to 23 mph, with gusts as high as 37 mph. Chance of precipitation is 100%. New rainfall amounts between 1 and 2 inches possible.\n\n---\n\nThursday Night:\nTemperature: 52°F\nWind: 14 to 20 mph S\nForecast: Showers and thunderstorms likely before 2am. Mostly cloudy. Low around 52, with temperatures rising to around 55 overnight. South wind 14 to 20 mph, with gusts as high as 31 mph. Chance of precipitation is 70%. New rainfall amounts between 1 and 2 inches possible.\n\n---\n\nFriday:\nTemperature: 54°F\nWind: 16 to 22 mph SW\nForecast: Partly sunny, with a high near 54. Southwest wind 16 to 22 mph, with gusts as high as 36 mph.\n\n---\n\nFriday Night:\nTemperature: 48°F\nWind: 18 to 23 mph W\nForecast: Partly cloudy. Low around 48, with temperatures rising to around 50 overnight. West wind 18 to 23 mph.\n"},"isError":false}}
```

### MCP Host vs LLM

Cline 通过 XML 与模型沟通



## A2A









