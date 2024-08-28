# 计算机基础


### How does HTTPS Work?

<img src="images/https.jpeg" />

Hypertext Transfer Protocol Secure (HTTPS) is an extension of HTTP that utilizes Transport Layer Security (TLS) to encrypt communication between a client and server.  Any intercepted data will be unreadable and secure from tampering 篡改 and eavesdropping 窃听.

What's the process for encrypting and decrypting data?

Step 1 - The journey begins with the client (like your browser) establishing a TCP connection with the server.

Step 2 - Next comes the “client hello” where the browser sends a message containing supported cipher suites and the highest TLS version it can handle. Cipher suites are sets of algorithms that typically include: a key exchange method to share keys between devices, a bulk encryption algorithm to encrypt data, and a message authentication code algorithm to check data integrity. 密码套件是一组算法，通常包括：在设备之间共享密钥的密钥交换方法、用于加密数据的批量加密算法以及用于检查数据完整性的消息验证码算法。

The server responds with a “server hello”, confirming the chosen cipher suite and TLS version that they can both understand. The server then sends a TLS certificate to the client containing its domain name, certificate authority signature, and the server’s public key. The client checks this certificate to validate it is trusted and belongs to the server.

Step 3 - Once the TLS certificate is validated, the client creates a session key to be used for encrypting the bulk data transfer. Bulk data transfer refers to the transmission of the actual application data between client and server once the secure TLS connection is established. To securely send this session key to the server, it’s encrypted with the server’s public key. The server, with its private key, is the only one who can decrypt this encrypted session key.

Step 4 - Now that both parties have the secret session key, they shift gears to symmetric encryption 对称加密. It’s like they’ve agreed on a private language that only they understand. This makes the data transfer very secure. Symmetric encryption is much faster for large amounts of data.


### Session, Cookie, Token, JWT, SSO, OAuth 2.0

<img src="images/sso.jpeg" width="750" />

When you login to a website, your identity needs to be managed. Here is how different solutions work:

* Session - The server stores your identity and gives the browser a session ID cookie. This allows the server to track login state. But cookies don't work well across devices.
* Token - Your identity is encoded into a token sent to the browser. The browser sends this token on future requests for authentication. No server session storage is required. But tokens need encryption/decryption.
* JWT - *JSON Web Tokens* standardize identity tokens using digital signatures for trust. The signature is contained in the token so no server session is needed.
* SSO - *Single Sign-On* uses a *central authentication service*. This allows a single login to work across multiple sites.
* OAuth2 - Allows limited access to your data on one site by another site, without giving away passwords. OAuth 是一种被广泛使用的 SSO 协议。
* QR Code - Encodes a random token into a QR code for mobile login. Scanning the code logs you in without typing a password.

Each method has it's won perks. JWT for simplicity, SSO for convenience, and OAuth2 for security.

微信登录功能文档 https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html


#### API Security Checklist

Checklist of the most important security countermeasures when designing, testing, and releasing your API.

Authentication
* Don't use Basic Auth. Use standard authentication instead (e.g., JWT, Auth).
* Don't reinvent the wheel in Authentication, token generation, password storage. Use the standards.
* Use Max Retry and jail features in Login.
* Use encryption on all sensitive data.

JWT (JSON Web Token)
* Use a random complicated key ( JWT Secret ) to make brute forcing the token very hard.
* Don't extract the algorithm from the header. Force the algorithm in the backend (HS256 Or R5256 ).
* Make token expiration ( TTL, RTTL) as short as possible.
* Don't store sensitive data in the JWT payload, it can be decoded easily.
* Avoid storing too much data. JWT is usually shared in headers and they have a size limit.

Auth
* Always validate redirect uri server-side to allow only whitelisted URLs.
* Always try to exchange for code and not tokens (don't allow response_type=token ).
* Use state parameter with a random hash to prevent CSRF on the Auth authentication process.
* Define the default scope, and validate scope parameters for each application.

