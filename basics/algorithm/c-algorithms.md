# 数据结构与算法 (C实现)


## 数组



## 链表

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



## 队列



## 递归



