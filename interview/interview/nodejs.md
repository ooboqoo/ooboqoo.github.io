# Node.js


下面是 Node.js 面试常见问题清单（含简短回答要点），覆盖原理、性能、架构、网络、调试、运维、安全等核心领域。非常适合作为面试准备速查表。

⸻

🟦 一、Node.js 基础原理

1. Node.js 为什么是单线程？如何处理高并发？

* JS 本身是单线程 → 简化开发模型（避免锁竞争）
* 高并发依赖 事件循环（Event Loop） + 异步 I/O
* CPU 密集型可以用：worker_threads, child_process, cluster（多进程）

IO 不在 JS 线程做，而是在内核或线程池完成，并由事件循环调度结果。
* 像文件读取、网络请求 等都是操作系统内核处理。
  1. JS 发起IO操作
  2. libuv 调用系统内核发起 IO
  3. 内核异步完成后，通过事件通知 libuv
  4. libuv 再将回调压入事件循环
  5. JS 主线程执行回调
* 另一类任务由 libuv 的线程池执行（默认 4 个线程），如压缩、加密 等


⸻

2. Node.js 的 Event Loop 原理？每个阶段做什么？

六大阶段：
1. *timers*（处理 setTimeout / setInterval）
2. I/O callbacks
3. idle, prepare
4. *poll*（核心的 I/O 阶段，处理 IO 事件）
5. *check*（setImmediate）// setImmediate 里再 setImmediate 就要到下一轮再执行了
6. close callbacks

微任务（Promise）在 每个阶段结束后执行

⸻

3. setTimeout(fn, 0) 和 setImmediate(fn) 的区别？
	•	setTimeout → timers 阶段
	•	setImmediate → check 阶段
通常 I/O 回调后 setImmediate 比 setTimeout 更快。

⸻

4. process.nextTick vs Promise.then？
	•	nextTick 在微任务之前执行，优先级最高
	•	滥用 nextTick 会阻塞事件循环

⸻

5. require 和 import 的区别？
	•	require → CommonJS，同步加载、运行时解析
	•	import → ESModule，编译时确定依赖、异步加载
	•	Node 支持双模块但有互相隔离规则（如无法混用默认导出方式）

⸻

🟦 二、性能 & 架构

6. 如何解决 Node.js CPU 密集导致的阻塞？
	•	使用 worker_threads 分担 CPU 工作
	•	或 cluster 创建多进程
	•	或 Rust/C++ Addons

⸻

7. Node.js 如何实现高吞吐？
	•	非阻塞 I/O + 事件驱动
	•	负载均衡（Nginx/PM2）
	•	多进程集群
	•	高效连接复用（HTTP/2、keep-alive）
	•	使用缓存层（Redis）

⸻

8. 如何处理大量长连接（如 WebSocket）？
	•	合理设置 server.maxConnections
	•	Close 掉不活跃连接
	•	使用 cluster 多核扩展
	•	ws/Socket.IO + Redis Adapter 做水平扩展

⸻

9. Node.js 内存限制是多少？如何突破？
	•	默认约 512MB～4GB（取决于 32/64 位）
	•	启动时配置：

node --max-old-space-size=8192 app.js



⸻

10. 如何监控 Node 性能？

常用工具：
	•	node --inspect
	•	Chrome DevTools
	•	clinic.js
	•	0x
	•	Prometheus + Grafana

⸻

🟦 三、模块、包管理、构建

11. package-lock.json 有什么作用？
	•	锁定包版本，保证构建一致性
	•	提高安装速度
	•	记录依赖树

⸻

12. Node.js ESM 与 CJS 混用时有哪些限制？
	•	require 不能导入 ESM（除非动态 import）
	•	ESM 必须使用 .js + "type": "module"
	•	不同的模块解析规则（路径、扩展名）

⸻

13. npm、yarn、pnpm 区别是什么？

pnpm 最快，且节省磁盘（基于硬链接）
npm 官方、兼容性最好
yarn 有 workspaces，多用于 monorepo

⸻

🟦 四、网络编程与协议

14. Node.js 如何实现反向代理？

http.createServer((req, res) => {
  proxy.web(req, res, { target: 'https://api.xxx.com' });
});


⸻

15. 什么是 Stream？为什么用 Stream？
	•	Stream 是分段读写的接口，不需要一次性加载全部内容
	•	适合：
	•	大文件读写
	•	网络传输
	•	压缩、加密

⸻

16. 如何实现文件上传？（FormData、stream、Busboy）
	•	用 busboy 或 multer 解析 multipart/form-data
	•	用 stream.pipe(fs.createWriteStream()) 写文件

⸻

17. 讲讲 Node.js 的 HTTP Keep-Alive 原理？
	•	连接复用，同一 TCP 多次请求
	•	大幅提高 QPS
	•	Node 默认开启 keep-alive

⸻

🟦 五、安全

18. Node.js 常见安全风险？如何防御？

XSS、CSRF、SQL 注入、路径遍历、依赖漏洞
对策：
	•	使用 helmet
	•	参数化 SQL
	•	校验输入（zod、joi）
	•	限制文件访问路径
	•	使用 npm audit、Snyk

⸻

🟦 六、框架相关（Express / Koa / Nest）

19. Express 与 Koa 的区别？
	•	Express 基于 callback，中间件是洋葱皮风格前身
	•	Koa 使用 async/await，简洁
	•	更现代的设计是 Koa → egg → Nest

⸻

20. NestJS 为什么受欢迎？
	•	完整架构（DI、装饰器、Provider）
	•	适合大型企业项目
	•	TypeScript 支持完美
	•	模块化、可测试性强

⸻

21. Koa 中间件“洋葱模型”本质是什么？

中间件链：

async (ctx, next) => {
  // before
  await next()
  // after
}

像堆栈一样入栈／回溯。

⸻

🟦 七、数据库与存储

22. Node.js 如何应对数据库连接池耗尽？
	•	增加 pool size
	•	使用 queue / 限流
	•	使用读写分离
	•	避免未释放连接

⸻

23. 为什么 ORM（Prisma / TypeORM）有时性能差？
	•	需要生成 SQL
	•	不适合复杂 JOIN
	•	可以结合 raw SQL 优化

⸻

🟦 八、测试与调试

24. Node.js 如何在本地调试？

node --inspect-brk index.js

然后 Chrome 打开：chrome://inspect.

⸻

25. 如何测试异步代码？（Jest、Vitest）

使用 async/await 或 done
或对 Promise 直接 expect：

await expect(fn()).resolves.toBe(...)


⸻

🟦 九、部署与运维

26. PM2 有哪些功能？
	•	多进程 cluster
	•	自动重启
	•	日志管理
	•	配合 Nginx 做负载均衡

⸻

27. Node.js 如何零停机更新？
	•	cluster 的 worker.disconnect()
	•	Nginx upstream 逐个 reload
	•	PM2 graceful restart

⸻

28. Docker 中 Node 性能优化：
	•	使用 Alpine
	•	降低 layer 数量
	•	Node 版本固定
	•	禁用 devDependencies（npm ci --omit=dev）

⸻

🟦 十、OpenAI / LLM 常见面试题（新的热门）

29. 如何在 Node 后端实现 AI 流式输出？
	•	SSE（text/event-stream）
	•	或 OpenAI Streamable HTTP（分块 chunked）

⸻

30. 为什么 LLM 流要用 “Transfer-Encoding: chunked”？
	•	允许服务器 不预先知道内容长度
	•	边生成边发送
	•	是短连接，但可以持续很久

