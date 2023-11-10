# 计算机基础


How does HTTPS Work?

<img src="images/https.jpeg" />

Hypertext Transfer Protocol Secure (HTTPS) is an extension of HTTP that utilizes Transport Layer Security (TLS) to encrypt communication between a client and server.  Any intercepted data will be unreadable and secure from tampering 篡改 and eavesdropping 窃听.

What's the process for encrypting and decrypting data?

Step 1 - The journey begins with the client (like your browser) establishing a TCP connection with the server.

Step 2 - Next comes the “client hello” where the browser sends a message containing supported cipher suites and the highest TLS version it can handle. Cipher suites are sets of algorithms that typically include: a key exchange method to share keys between devices, a bulk encryption algorithm to encrypt data, and a message authentication code algorithm to check data integrity. 密码套件是一组算法，通常包括：在设备之间共享密钥的密钥交换方法、用于加密数据的批量加密算法以及用于检查数据完整性的消息验证码算法。

The server responds with a “server hello”, confirming the chosen cipher suite and TLS version that they can both understand. The server then sends a TLS certificate to the client containing its domain name, certificate authority signature, and the server’s public key. The client checks this certificate to validate it is trusted and belongs to the server.

Step 3 - Once the TLS certificate is validated, the client creates a session key to be used for encrypting the bulk data transfer. Bulk data transfer refers to the transmission of the actual application data between client and server once the secure TLS connection is established. To securely send this session key to the server, it’s encrypted with the server’s public key. The server, with its private key, is the only one who can decrypt this encrypted session key.

Step 4 - Now that both parties have the secret session key, they shift gears to symmetric encryption 对称加密. It’s like they’ve agreed on a private language that only they understand. This makes the data transfer very secure. Symmetric encryption is much faster for large amounts of data.





