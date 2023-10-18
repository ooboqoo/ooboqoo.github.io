# GORM

https://gorm.io/docs/index.html


问：泛型出来后有没有更好用的 ORM 推荐，想象中应该有一些更抽象的 ORM  
问（补充）：现在写业务代码最烦的就是写 Entity 和 DTO 等各种对象之间的转换。大部分对象转换就是值一个个赋过去，手写起来很麻烦。用基于反射的自动转换的轮子又有一定性能问题。  
答：可以看下 https://gorm.io/docs/serializer.html ，不需要给 gorm 定义 struct，直接用 idl 就行





