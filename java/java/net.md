# 网络编程

ServerSocket 主要用在 TCP 协议的服务器程序开发上，使用 accept() 方法等待客户端连接，每一个连接的客户端都使用一个 Socket 表示。

服务器端加入多线程机制后，就可以同时为多个用户提供服务。

### 网络开发的经典模型 —— Echo 程序

```java
public class EchoServer {
    public static void main(String[] args) throws IOException {
        ServerSocket server = new ServerSocket(9997);
        while (true) {
            Socket client = server.accept();  // 阻塞，客户端连接后才会往下执行
            new Thread(new EchoThread(client)).start();
            System.out.println(client);       // Socket[addr=/127.0.0.1,port=49164,localport=9997]
        }
    }
}

class EchoThread implements Runnable {
    private Socket client;
    public EchoThread(Socket client) { this.client = client; }
    public void run() {
        try {
            Scanner scan = new Scanner(client.getInputStream());
            PrintStream out = new PrintStream(client.getOutputStream());
            while (!scan.hasNext("(?i:exit)")) {  // 阻塞，无输入不会往下执行
                String str = scan.next().trim();
                System.out.println("Received: " + str);
                out.println("ECHO: " + str);
            }
            scan.close(); out.close(); client.close();
        } catch (Exception e) { e.printStackTrace(); }
    }
}
```

```java
public class EchoClient {
    public static void main(String[] args) throws IOException {
        Socket client = new Socket("localhost", 9997);
            // Socket[addr=localhost/127.0.0.1,port=9997,localport=49276]
        Scanner input = new Scanner(System.in);
        Scanner scan = new Scanner(client.getInputStream());
        PrintStream out = new PrintStream(client.getOutputStream());
        input.useDelimiter("\n"); scan.useDelimiter("\n");
        while (true) {
            System.out.println("请输入要发送的数据: ");
            if (input.hasNext()) {  // 阻塞，无输入不会往下执行
                String str = input.next().trim();
                out.println(str);
                if (str.equalsIgnoreCase("exit")) { break; }
                if (scan.hasNext()) { System.out.println(scan.next()); }  // 连续返回时只能输出第一项
            }
        }
        input.close(); scan.close(); out.close(); client.close();
    }
}
```
