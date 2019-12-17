# 数据结构与算法 (C实现)

> 学习底层算法时 C 有优势，纯粹的一步步内存操作，更直观、更接近硬件现场；  
> 但当需要封装一些数据结构时，不搞个类就感觉很难受，这时 Java 的面向对象就体现出优势了。


## 数组

```c
// 支持动态扩容的数组
typedef struct {
  size_t size;
  void *p;
} Vectory;
// todo
```

```c
// 大小固定的有序数组，支持动态增删改操作
typedef struct {

} SortedArray;
// todo
```

```c
// 88. 合并两个有序数组
// 说明：nums1Size >= m + n
// 解题思路：从后向前遍历一遍即可
void merge(int *nums1, int nums1Size, int m, int *nums2, int nums2Size, int n) {
  int i = m + n;
  m--;
  n--;
  while (i--) {
    if (n < 0) return;
    if (m < 0) nums1[i] = nums2[n--];
    else nums1[i] = nums1[m] < nums2[n] ? nums2[n--] : nums1[m--];
  }
}
```



## 链表

```c
// 实现单链表、循环链表、双向链表，支持增删操作
```

### 单链表

```c
struct ListNode {
  int val;
  struct ListNode *next;
}
```

```c
// 206. 反转链表
// 解题思路1：双指针迭代 🌟
// 解题思路2：递归
struct ListNode *reverseList(struct ListNdde *head) {
  if (head == NULL) return head;
  struct ListNode *a = head, *b = head->next, *tmp;
  a->next = NULL;
  while(b != NULL) {
    tmp = b->next;
    b->next = a;
    a = b;
    b = tmp;
  }
  return a;
}
```

```c
// 141. 环形链表（判断链表中是否有环）
// 解题思路1：快慢指针 🌟
// 解题思路2：哈希表
bool hasCycle(struct ListNode *head) {
  struct ListNode *a = head, *b = head;
  while (b != NULL) {
    a = a->next;
    b = b->next;
    if (b == NULL) break;
    b = b->next;
    if (a == b) return true;  // 只要存在环，b 肯定会与 a 重合，不可能出现 b 跨过 a 的情况
  }
  return false;
}
```

```c
// 21. 合并两个有序链表
// 解题思路1：迭代 🌟
// 解题思路2：先合并后排序
struct ListNode *mergeTwoLists(struct ListNode *l1, struct ListNode *l2) {
  if (l1 == NULL) return l2;
  if (l2 == NULL) return l1;
  struct ListNode *head, *p;
  if (l1->val < l2->val) {
    head = l1;
    l1 = l1->next;
  } else {
    head = l2;
    l2 = l2->next;
  }
  p = head;
  while (l1 != NULL && l2 != NULL) {
    if (l1->val < l2->val) {
      p->next = l1;
      l1 = l1->next;
    } else {
      p->next = l2;
      l2 = l2->next;
    }
    p = p->next;
  }
  if (l1 != NULL) p->next = l1;
  if (l2 != NULL) p->next = l2;
  return head;
}

// [难] 23. 合并K个排序链表
// 解题思路1：直接迭代     时间复杂度 O(k*n)
// 解题思路2：逐一两两合并  时间复杂度 O(k*n)
// 解题思路3：分治思想 🌟  时间复杂度 O(nlogk)
struct ListNode *mergeKLists(struct ListNode **lists, int listsSize) {
  if (listsSize == 0) return NULL;
  if (listsSize == 1) return *lists;
  return mergeTwoLists(mergeTwoLists(*lists, *(lists + 1)),
                       mergeKLists(lists + 2, listsSize - 2));
}
```

```c
// 19. 删除链表的倒数第N个节点
// 说明：给定的 n 保证是有效的
// 解题思路：双指针
struct ListNode *removeNthFromEnd(struct ListNode *head, int n) {
  struct ListNode *p = head, *q = head;
  while(n--) q = q->next;
  if (q == NULL) return head->next;
  while(q->next != NULL) {
    p = p->next;
    q = q->next;
  }
  p->next = p->next->next;
  return head;
}
```

```c
// 876. 链表的中间结点
// 说明：如果有两个中间结点则返回第二个结点
// 解题思路1: 快慢指针 🌟
// 解题思路2: 将值放到 C++ 中的 vector 中，最后 `return A[A.size() / 2];`
struct ListNode* middleNode(struct ListNode* head){
  struct ListNode *p = head, *q = head;
  while(q->next != NULL) {
    p = p->next;
    q = q->next;
    if (q->next != NULL) q = q->next;
  }
  return p;
}
```



## 栈

```c
// 顺序栈

void push(int x) {

}

int pop() {

}

```

```c
// 链式栈

```

```c
// 模拟实现一个浏览器的前进、后退功能

```

```c
// 支持动态扩容的顺序栈

```



## 队列

```c
// 实现一个循环队列

bool enqueue(int x, int *queue) {

}

int dequeue (int *queue) {

}
```



## 递归

```c
// 斐波那契数列求值 f(n)=f(n-1)+f(n-2)
int fib(int n) {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
}

// 求阶乘 n!
int factorial(int n) {
  if (n == 1) return 1;
  return factorial(n * factorial(n - 1));
}

// 编程实现一组数据集合的全排列
```



## 其他

```c
// 9. 回文数
// 解题思路1：反转整数后比较 🌟
// 解题思路2：转成字符比较
bool isPalindrome(int x) {
  if (x < 0) return false;
  int tmp = x;
  long y = 0;               // 如用 int 倒置后可能出现越界异常
  while (tmp != 0) {
    y = y * 10 + tmp % 10;  // C 中 `%` 只能用于整数
    tmp /= 10;              // C 中 `/` 在处理 int 类型时会自动舍弃小数部分
  }
  return x == y;
}
```
