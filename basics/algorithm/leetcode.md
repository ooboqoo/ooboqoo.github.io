<style>strong { padding:2px 4px; border:1px solid; border-radius:6px; } h4 strong { font-size:.75em }</style>

# Leetcode



测试用例：CodeSignal 平台不支持调试，但可以添加自定义用例，可以构造几个基本的测试用例来查看输出情况

面试代码平台：
* HackerRank
* CodeSignal 测评，5小时内完成 两道 easy+ 题目



大佬的在线解题书 https://github.com/halfrost/LeetCode-Go





## 题型和解法

做算法题和实际开发的区别：实际开发时可以借助各种库，但做算法题不能用这些库，要的就是纯手撸

题目限制条件：做题时看清题目中的条件(Description + Constraints)，很多时候只需要处理特定场景，大大降低实现难度，而且可能人家就是考这种场景下的处理方法


Leetcode TS 环境下可以直接使用 lodash.js 和 datastructures-js
https://support.leetcode.com/hc/en-us/articles/360011833974-What-are-the-environments-for-the-programming-languages



关于边界：边界、中间场景 直接在纸上把各个变量列出来核对，不然改来改去非常影响效率。还可以添加测试用例进行验证

双指针写法：
* 在一个 for 循环里（非同步）移动指针，即每个循环里只移动一个指针，不要套两层 for 代码不好写会出各种问题。
* 结束条件、边界逻辑处理也都在 for 内部处理

### 题目特征

做题时，需要考虑会用到哪些数据结构，以及哪些算法。碰到一些特征要快速反应，如
* 所有可行解：回溯
* O(log n) 的解法：二分法
* 常量额外空间：原地记录状态
* 第K个元素：动态 ——》 必须是堆；静态 -》借助快排思想，实现一个 quickSelect
  - 215题，数组中的第K个最大元素，这个题目想到的解法肯定是小顶堆，但解题场景是没有时间实现堆的，所以这题最优的解法是借助快排的原理，实现一个 quickSelect 函数。
* 排序相关的题目，凡是要求 O(n) 时间复杂度内完成的，除了适用于 桶排序 等 O(n) 的排序算法，其他基本都是用 hashmap 解决。




### TypeScript 解题注意点

整数排序一定要提供比较函数

```ts
arr.sort((a, b) => a - b);
```

## Top150 快速复习

滑动窗口
* 最短型滑动窗口
  - [209]() 长度最小的子数组
    * 题目描述
    * 解题思路
  - [76]() 最小覆盖子串







## Temp



// TODO
* https://leetcode.cn/problems/perfect-squares/description/ 279 完全平方数





BFS 可以看成是层序遍历，从某个节点触发，BFS 首先遍历到距离为 1 的节点，然后是距离为 2、3、4... 的节点。因此，BFS 可以用来求最短路径问题。BFS 先搜索到的节点，一定是距离最近的节点。



763 划分字母区间
核心是先遍历一遍，找出每个字符最后出现的位置，存到 map 中。






207题，课程表，考的是图相关知识：有向有环图，入度，出度...


```ts
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    // 构建邻接表和入度数组
    const adj: number[][] = Array.from({length: numCourses}, () => []);
    const inDegree: number[] = Array(numCourses).fill(0);

    for (const pair of prerequisites) {
        const [course, pre] = pair; // 要学 course 需先学 pre -> 边 pre -> course
        adj[pre].push(course);
        inDegree[course] += 1;
    }

    // 初始化队列（所有入度为 0 的课程）
    const queue: number[] = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    let processed = 0;

    while(processed < queue.length) {
        const node = queue[processed];
        for (const nei of adj[node]) { // nei -> neighbor
            inDegree[nei] -= 1;
            if (inDegree[nei] === 0) {
                queue.push(nei);
            }
        }
        processed++;
    }

    return processed === numCourses;
};
```

41题，缺失的第一个正数 https://leetcode.cn/problems/first-missing-positive/description/  标记为 hard 的原因是，需要对hash有深入的理解和灵活运用的能力，有思路后编码倒不难。


39题，组合总和，回溯，注意去除重复子集的思路

![题解](images/leetcode/39.png)

```ts
function combinationSum(candidates: number[], target: number): number[][] {
    candidates.sort((a,b) => a-b);
    const res: number[][] = [];
    function dfs(items: number[], sum: number) {
        for (const c of candidates) {
           // 剪枝二 避免生成重复子集
            if (items.length && c < items.at(-1)) {
                continue;
            }
            // 剪枝一 元素不能超过 target
            if (sum + c > target) {
                break;
            }
            if (sum + c === target) {
                res.push([...items, c]);
                break;
            }
            dfs([...items, c], sum+c);
        }
    }
    dfs([], 0);
    return res;
};

// 优化版本
// 优化1：引入 startIndex 避免 full-loop scans
// 优化2：引入 paths 替换 items 减少内存分配负担
function combinationSum(candidates: number[], target: number): number[][] {
    candidates.sort((a, b) => a - b);
    const res: number[][] = [];
    const paths: number[] = [];
    function dfs(startIdx: number, sum: number) {
        for (let i = startIdx; i < candidates.length; i++) {
            const c = candidates[i];
            if (sum + c > target) {
                break;
            }
            paths.push(c);
            if (sum + c === target) {
                res.push([...paths]);
                paths.pop();
                break;
            }
            dfs(i, sum+c);
            // 回溯
            paths.pop();
        }
    }
    dfs(0, 0);
    return res;
};
```



## Array

#### 88. 合并两个有序数组 __easy__ __双指针__

解题思路：逆序双指针，从后往前遍历一遍即可

```go
func main() {
	nums1 := []int{1, 2, 3, 0, 0, 0}
	nums2 := []int{2, 5, 6}
	merge(nums1, 3, nums2, 3)
	fmt.Println(nums1)
}

// 代码较直观 - 这种写法容易出错
func merge(nums1 []int, m int, nums2 []int, n int) {
	i := m + n - 1
	m--
	n--
	for ; i >= 0; i-- {
		if n == -1 {
			return
		}
		if m == -1 {
			nums1[i] = nums2[n]
			n--
			continue
		}
		if nums2[n] >= nums1[m] {
			nums1[i] = nums2[n]
			n--
		} else {
			nums1[i] = nums1[m]
			m--
		}
	}
}

// 双指针的正确写法 - 代码更为紧凑 + 不易出错
func mergeV2(nums1 []int, m int, nums2 []int, n int) {
	i := m + n - 1
	m--
	n--
	for ; n > -1; i-- {
		if m == -1 || nums2[n] >= nums1[m] {
			nums1[i] = nums2[n]
			n--
		} else {
			nums1[i] = nums1[m]
			m--
		}
	}
}
```

#### 57 插入区间 Insert Interval  __medium__

```ts
function insert(intervals: number[][], newInterval: number[]): number[][] {
    const n = intervals.length
    let i = 0
    for (; i < n && newInterval[0] > intervals[i][1]; i++) {
    }
    const index = i
    for (; i < n && newInterval[1] >= intervals[i][0]; i++) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0])
        newInterval[1] = Math.max(newInterval[1], intervals[i][1])
    }
    intervals.splice(index, i - index, newInterval)
    return intervals
};
```

```go
func insert(intervals [][]int, newInterval []int) [][]int {
	res := make([][]int, 0, len(intervals)+1)
	i := 0
	for i < len(intervals) && intervals[i][1] < newInterval[0] {
		i++
	}
    res = append(res, intervals[:i]...)
	for i < len(intervals) && intervals[i][0] <= newInterval[1] {
		newInterval[0] = min(newInterval[0], intervals[i][0])
		newInterval[1] = max(newInterval[1], intervals[i][1])
		i++
	}
	res = append(res, newInterval)
    res = append(res, intervals[i:]...)
	return res
}
```




## 字符串





## 哈希表

#### 1 两数之和 Two Sum  __easy__

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

```go
// Your runtime beats 60.29 % of golang submissions
// Your memory usage beats 57.26 % of golang submissions (4.1 MB)
func twoSum(nums []int, target int) []int {
	m := make(map[int]int)
	for i, num := range nums {
		if j, ok := m[target-num]; ok {
			return []int{j, i}
		}
		m[num] = i
	}
	return nil
}
```

#### 205 同构字符串  __easy__

解题要点：需要维护两张哈希表互查，不然 "baba" vs "badc" 这种场景会失败。

同构字符串定义：如果 s 中的字符可以按某种映射关系替换得到 t ，那么这两个字符串是同构的。

```go
func isIsomorphic(s, t string) bool {
	s2t := map[byte]byte{}
	t2s := map[byte]byte{}
	for i := range s {
		si, ti := s[i], t[i]
		if s2t[si] > 0 && s2t[si] != ti || t2s[ti] > 0 && t2s[ti] != si {
			return false
		}
		s2t[si] = ti
		t2s[ti] = si
	}
	return true
}
```

#### 202 Happy Number  __easy__

迭代过程中会出现以下3种情况：得到 1；死循环；值会越来越大(实际不会发生，3位数最大到243,4位以上的每次回丢失一位降到3位数)

第三种情况分析有点难，但其实题目里已经点明了就 两种情况，所以直接「处理循环」就行了。

```go
func isHappy(n int) bool {
	dict := map[int]bool{}
	for n != 1 {
		if dict[n] {
			return false
		}
		dict[n] = true
		n = getSum(n)
	}
	return true
}

func getSum(n int) int {
	sum := 0
	// 学习：逐位取数值的技巧
	for n > 0 {
		m := n % 10
		sum += m * m
		n = n / 10
	}
	return sum
}
```

#### 219 重复元素 Contains Duplicate II  __easy__

解题要点：滑动窗口 + 哈希表

题目：给你一个整数数组 nums 和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，满足 nums[i] == nums[j] 且 abs(i - j) <= k。

```go
func containsNearbyDuplicate(nums []int, k int) bool {
	m := map[int]bool{}
	for i, v := range nums {
		if i > k {
			delete(m, nums[i-k-1])
		}
		if m[v] {
			return true
		}
		m[v] = true
	}
	return false
}
```

#### 128 最长连续序列 Longest Consecutive Sequence  __medium__

解题：简单地，排序后就能找到连续最长序列，但本题要求 O(n)。JavaScript 中用 `Set` Go 中用 `map[int]bool` 来解

```go
func longestConsecutive(nums []int) int {
	if len(nums) == 0 {
		return 0
	}
	numSet := make(map[int]bool)
	for _, v := range nums {
		numSet[v] = true
	}
	longestStreak := 0
	for num := range numSet { // 注意，这里的 num 出现的顺序是随机的
		if !numSet[num-1] {
			currentNum := num
			currentStreak := 1
			for numSet[currentNum+1] {
				currentNum++
				currentStreak++
			}
			if longestStreak < currentStreak {
				longestStreak = currentStreak
			}
		}
	}
	return longestStreak
}

// 这个版本性能更好，技巧性比较强（确保序列两头都保存序列的长度）
func longestConsecutiveV2(nums []int) int {
	if len(nums) == 0 {
		return 0
	}
	max := 1
	m := make(map[int]int)
	for _, v := range nums {
		if _, ok := m[v]; !ok {
			left := m[v-1]
			right := m[v+1]
			sum := left + right + 1
			m[v] = sum
			// 对于 [4,1,3,2], map 最后为 [4:4,1:4,3:2,2:4] 发现 3 的数值是不对的，但1、4的值是对的就没问题
			m[v-left] = sum  // 序列的最左边保存了当前序列的长度 2-1=1
			m[v+right] = sum // 序列的最右边保存了当前序列的长度 2+2=4
			if sum > max {
				max = sum
			}
		}
	}
	return max
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

```java
// 用数组实现的队列
public class ArrayQueue {
  private String[] items;  // 数组
  private int n = 0;       // 数组大小
  private int head = 0;    // 队头下标
  private int tail = 0;    // 队尾下标

  public ArrayQueue(int capacity) {
    items = new String[capacity];
    n = capacity;
  }

  public boolean enqueue(String item) {
    if (tail == n) return false;  // 队列已经满
    items[tail++] = item;
    return true;
  }

  public String dequeue() {
    if (head == tail) return null;  // 队列为空
    return items[head++];
  }
}
```

```java
// 用数组实现循环队列
public class CircularQueue {
  private String[] items;  // 数组
  private int n = 0;       // 数组大小
  private int head = 0;    // 队头下标
  private int tail = 0;    // 队尾下标

  public CircularQueue(int capacity) {
    items = new String[capacity];
    n = capacity;
  }

  public boolean enqueue(String item) {
    if ((tail + 1) % n == head) return false;  // 队列满了(为了实现队满的判断，循环队列会浪费一个数组元素)
    items[tail] = item;
    tail = (tail + 1) % n;
    return true;
  }

  public String dequeue() {
    if (head == tail) return null;
    String ret = items[head];
    head = (head + 1) % n;
    return ret;
  }
}
```


## 二叉树 Binary Tree

#### 104 Maximum Depth of Binary Tree  __easy__  __DFS__  __BFS__

DFS 深度优先搜索 Depth-First Search  
BFS 广度优先搜索 Breadth-First Search  

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

// 深度优先搜索
func maxDepth(root *TreeNode) int {
	if root == nil {
		return 0
	}
	return max(maxDepth(root.Left), maxDepth(root.Right)) + 1
}

// 广度优先搜索，代码多了很多但性能要更好些
func maxDepth(root *TreeNode) int {
	queue := []*TreeNode{}
	res := 0
	if root != nil {
		queue = append(queue, root)
	}
	for ; len(queue) > 0; res++ {
		for n := len(queue); n > 0; n-- {
			node := queue[0]
			queue = queue[1:]
			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}
	}
	return res
}
```




## 堆 Heap

#### 215 Kth Largest Element in an Array

基于小顶堆的解法

```go
func findKthLargest(nums []int, k int) int {
	arr := make([]int, k)
	for i := 0; i < k; i++ {
		arr[i] = -10000
	}
	for i := 0; i < len(nums); i++ {
		if arr[0] < nums[i] {
			arr[0] = nums[i]
			heapify(arr)
		}
	}
	return arr[0]
}

func heapify(arr []int) {
	n := len(arr)
	for i := 0; i*2+1 < n; {
		minPos := i                 // 这个 minPos 变量很有技巧性，大幅简化了代码
		if arr[i*2+1] < arr[i] {
			minPos = i*2 + 1
		}
		if i*2+2 < n && arr[i*2+2] < arr[minPos] {
			minPos = i*2 + 2
		}
		if minPos == i {
			break
		}
		arr[i], arr[minPos] = arr[minPos], arr[i]
		i = minPos
	}
}
```

基于快速排序的解法(也非常高效)

```go

```



## 动态规划 Dynamic Programming

「状态转移表法」解题步骤
* 确定 `dp[i]` 为 `len(nums)==i` 时的目标解
* 两层 `for` 循环自下而上遍历

#### 70 Climbing Stairs  __easy__  __DynamicProgramming__  __Memoization__

```go
// 没有缓存会超时
var cache = make([]int, 46)
// 状态转移方程法(递归+缓存)
func climbStairs(n int) (res int) {
	if n <= 2 {
		return n
	}
	defer func() {
		cache[n] = res
	}()
	if cache[n] > 0 {
		return cache[n]
	}
	return climbStairs(n-1) + climbStairs(n-2)
}

// 状态转移表法 f(n步数,c走法)
func climbStairs(n int) (res int) {
	if n <= 2 {
		return n
	}
	dp := []int{0, 1, 2} // 滚动数组将空间复杂度由O(n)降为O(1)
	for i := 3; i <= n; i++ {
		dp = dp[1:]
		dp = append(dp, dp[0]+dp[1])
	}
	return dp[2]
}
```

#### 198 小偷问题 House Robber  __medium__

```go
func rob(nums []int) int {
	n := len(nums)
	if n == 0 {
		return 0
	}
	if n == 1 {
		return nums[0]
	}
	if n == 2 {
		return max(nums[0], nums[1])
	}
	dp := []int{0, nums[0], max(nums[0], nums[1])}
	for i := 2; i < n; i++ {
		dp = dp[1:]
		dp = append(dp, max(dp[1], nums[i]+dp[0]))
	}
	return dp[2]
}
```

#### 139 单词拆分 Word Break  __medium__

```go
func wordBreak(s string, wordDict []string) bool {
	wordDictSet := make(map[string]bool)
	for _, w := range wordDict {
		wordDictSet[w] = true
	}
	// dp[i] 表示字符串 s 前 i 个字符组成的字符串 s[0:i-1] 是否能被拆分
	dp := make([]bool, len(s)+1)
	dp[0] = true // 空字符串
	for i := 1; i <= len(s); i++ {
		for j := 0; j < i; j++ {
			if dp[j] && wordDictSet[s[j:i]] { // 解题核心：往上添加字符串
				dp[i] = true
				break
			}
		}
	}
	return dp[len(s)]
}
```

### 322 找零 Coin Change  __medium__

```go
func coinChange(coins []int, amount int) int {
	dp := make([]int, amount+1)
	for i := 1; i <= amount; i++ {
		min := amount + 1
		for j := 0; j < len(coins); j++ {
			prev := i - coins[j]
			if prev >= 0 && dp[prev] != -1 && dp[prev] < min {
				min = dp[prev]
			}
		}
		if min > -1 && min < amount+1 {
			dp[i] = min + 1
		} else {
			dp[i] = -1
		}
	}
	return dp[amount]
}
```

### 300 最长递增子序列 Longest Increasing Subsequence  __medium__

```go
func lengthOfLIS(nums []int) int {
	n := len(nums)
	// dp[i] 代表 nums 以 nums[i] 结尾的最长子序列长度
	dp := make([]int, n)
	for i := 0; i < n; i++ {
		max := 0
		// 往前找比我小的递增子序列最大值
		for j := 0; j < i; j++ {
			if nums[j] < nums[i] && dp[j] > max {
				max = dp[j]
			}
		}
		dp[i] = max + 1
	}
	max := 1
	for i := 0; i < n; i++ {
		if dp[i] > max {
			max = dp[i]
		}
	}
	return max
}

// 进阶：实现 O(nlogn) 的时间复杂度算法（动态规划+二分查找）
func lengthOfLIS(nums []int) int {
}
```

#### 120 Triangle  __medium__

心得：找状态转移方程还是很头疼，不够熟练

```go
func minimumTotal(triangle [][]int) int {
	n := len(triangle)
	dp := make([]int, n+1) // 这里涉及到了哨兵节点，所以长度为n+1

	// 状态转移方程，从下往上推：dp[i][j]=min(dp[i+1][j],dp[i+1][j+1])+triangle[i][j]
	for i := n - 1; i >= 0; i-- {
		for j := 0; j <= i; j++ {
			dp[j] = min(dp[j], dp[j+1]) + triangle[i][j]
		}
	}
	fmt.Println(dp)
	return dp[0]
}
```


## 双指针

在一个 for 循环里（非同步）移动指针，有助于简化代码。

#### 392 判断子序列 Is Subsequence  __easy__  __双指针__

```go
func isSubsequence(s string, t string) bool {
    if len(s) > len(t) {
        return false
    }
    i, j := 0, 0
    // 注意这里双指针移动的写法，一个 for 循环就够了，我会习惯性写两个 for 导致代码增多，判断还出各种问题
    for i < len(s) && j < len(t) {
        if s[i] == t[j] {
            i++
        }
        j++
    }
    return i == len(s)
}
```

#### 15 三数之和 3Sum  __medium__

这道题感觉在 Medium 里也算难的吧

题目描述：
题解1：

```go
func threeSum(nums []int) (res [][]int) {
	n := len(nums)
	slices.Sort(nums) // 解题关键：排序
	for i, x := range nums[:n-2] {
		if i > 0 && x == nums[i-1] { // 跳过重复数字
			continue
		}
		j, k := i+1, n-1
		for j < k {
			s := x + nums[j] + nums[k]
			if s > 0 {
				k--
			} else if s < 0 {
				j++
			} else {
				res = append(res, []int{x, nums[j], nums[k]})
				for j++; j < k && nums[j] == nums[j-1]; j++ {} // 跳过重复数字
				for k--; k > j && nums[k] == nums[k+1]; k-- {} // 跳过重复数字
			}
		}
	}
	return
}
```

```ts
// 难点在于规避重复解
function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b) // 数字排序别忘比较函数，规避重复解
  const map = new Map() // 用 Map 记录数字最后出现位置
  nums.forEach((v, i) => map.set(v, i));
  const res = []
  let i = 0
  let j = 1
  while (i < nums.length) {
    const a = nums[i]
    // 确定 a 数值后，题目变成 2数相加问题
    while (j < nums.length) {
      const b = nums[j]
      const c = 0 - a - b
      // 剪枝
      if (c < 0) {
        break
      }
      if (map.has(c) && map.get(c) > j) {
        res.push([a, b, c])
      }
      // 规避重复解。手欠写成 `while(nums[j++] === b) { }` 就坑了，不符合条件时 j++ 也会执行一次
      while (nums[j] === b) {
        j++
      }
    }
    // 规避重复解
    while (nums[i] === a) {
        i++
    }
    j = i + 1
  }
  return res
}
```




## 回溯

#### 79 单词搜索 Word Search  __medium__

思路倒是比较直接的，但这里的 DFS 概念，以及 visited、directions、内嵌函数 等技巧值得学习

```go
func exist(board [][]byte, word string) bool {
	m := len(board)
	n := len(board[0])
	visited := make([][]bool, m) // 记录是否访问过，刚开始用 map[string]bool 会超时
	for i := range visited {
		visited[i] = make([]bool, n)
	}

	directions := [...]struct{ x, y int }{{-1, 0}, {1, 0}, {0, -1}, {0, 1}} // 上下左右
	var dfs func(i, j, k int) bool  // 因为要递归调用，所以要先声明
	dfs = func(i, j, k int) bool {  // 注意这里内嵌函数的写法
		if board[i][j] != word[k] {
			return false
		}
		if k == len(word)-1 {
			return true
		}

		visited[i][j] = true
		defer func() { visited[i][j] = false }() // 回溯时取消访问标记
		for _, d := range directions {
			ii, jj := i+d.x, j+d.y
			if 0 <= ii && ii < m && 0 <= jj && jj < n && !visited[ii][jj] {
				if dfs(ii, jj, k+1) {
					return true
				}
			}
		}
		return false
	}

	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if dfs(i, j, 0) {
				return true
			}
		}
	}
	return false
}
```



## 滑动窗口

滑动窗口：对于字符串，可以用 `map[byte]bool` 来存储，对于数字则一个 sum 存储就行

#### 209 长度最小的子数组 Minimum Size Subarray Sum  __medium__

```go
func minSubArrayLen(target int, nums []int) int {
	n := len(nums)
	size := n + 1
	sum := 0
	start, end := 0, 0
	for end < n {
		sum += nums[end]
		end++
		for sum-nums[start] >= target {
			sum -= nums[start]
			start++
		}
		if sum >= target && end-start < size {
			size = end - start
		}
	}
	if size == n+1 {
		return 0
	}
	return size
}
```

#### 30 串联所有单词的子串 Substring with Concatenation of All Words  __hard__

https://leetcode.cn/problems/substring-with-concatenation-of-all-words/submissions/496859443

刚开始没有关注到 words 内成员都是等长的，测试用例中小部分用例超时

解题关键：sliding window algorithm 滑动窗口

```js
function findSubstring(s, words) {
  const result = [];
  if (words.length === 0) {
    return result;
  }
  const frameWidth = words[0].length;
  const windowWidth = frameWidth * words.length;
  function sliding(start) {
    const window = new Map();
    // init
    for (let i = 0; i < words.length; i++) {
      const frame = s.substr(start + i * frameWidth, frameWidth);
      window.set(frame, (window.get(frame) ?? 0) + 1);
    }
    for (let w of words) {
      window.set(w, (window.get(w) ?? 0) - 1);
      if (window.get(w) === 0) {
        window.delete(w);
      }
    }
    // loop
    for (let i = start; i <= s.length - windowWidth; i += frameWidth) {
      if (window.size === 0) {
        result.push(i);
      }
      const preFrame = s.substr(i, frameWidth);
      const nextFrame = s.substr(i + windowWidth, frameWidth);
      window.set(preFrame, (window.get(preFrame) ?? 0) - 1);
      if (window.get(preFrame) === 0) {
        window.delete(preFrame);
      }
      window.set(nextFrame, (window.get(nextFrame) ?? 0) + 1);
      if (window.get(nextFrame) === 0) {
        window.delete(nextFrame);
      }
    }
  }
  for (let i = 0; i < frameWidth && i + frameWidth * words.length <= s.length; i++) {
    sliding(i);
  }
  return result;
}

console.log(findSubstring('barfoofoobarthefoobarman', ['foo', 'bar', 'the']));
```

## 前缀和

滑动窗口解决的是“动态维护一个区间”的问题，前缀和解决的是“快速计算某个区间结果”的问题。它们都处理连续区段，但一个动态，一个静态。

#### 560 和为 K 的子数组 https://leetcode.cn/problems/subarray-sum-equals-k

一般来说，看到连续子数组元素相关的，基本就是「滑动窗口」或者「前缀和」，而滑动窗口的使用需要满足前置条件：窗口内的元素必须要有“单调性”，也就是说新元素进入窗口必须使得内部和不能减少，必须使得窗口向着不满足约束的方向前进。由于数组 *存在负数*，因此新入元素反而可能使得窗口更加不超过k。因此排除滑动窗口，想到使用前缀和。前缀和的优势就在于能够将子数组求和的时间优化到 O(n)。

解题思路
1. 连续子数组和问题
2. 发现需要频繁计算区间和
3. 联想前缀和技巧（空间换时间）
4. 数学变换：sum(i,j) = prefix[j+1] - prefix[i] = k
5. 转化为 prefix[i] = prefix[j+1] - k
6. 用哈希表存储历史 prefix[i] 实现 O(1) 查找
7. 添加边界条件 prefix[0]=0
8. O(n) 高效解法

```

```ts
function subarraySum(nums: number[], k: number): number {
    // 计算前缀和，其实可以优化到下面那个循环里计算，不过这样看着直观
    const preSum = Array.from(nums);
    for (let i = 1; i < nums.length; i++) {
        preSum[i] += preSum[i-1];
    }
    let res = 0;
    const map = new Map<number, number>([[0,1]]); // preSum 为某个值时，对应出现的次数，避免每次遍历查找 si 为特定值的个数
    for (let sj of preSum) {
        const si = sj - k;  // !!核心!! 理解图示： [..., idx=i, {... sum=k ...idx=j}]
        res += map.get(si) || 0;
        map.set(sj, map.has(sj) ? map.get(sj)+1 : 1)
    }
    return res;
};
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



#### 回文数

```go
// 将数字完全反转后跟原数进行比较
// Your runtime beats 12.72 % of golang submissions
// Your memory usage beats 72.28 % of golang submissions (4.1 MB)
func isPalindrome(x int) bool {
	if x < 0 {
		return false
	}
	var y int
	for i := x; i > 0; i /= 10 {
		y = y*10 + i%10
	}
	return x == y
}
```

```go
// 改进版：只转一半就开始比较
// Your runtime beats 68.76 % of golang submissions
func isPalindrome(x int) bool {
	if x < 0 || (x%10 == 0 && x != 0) {
		return false
	}
	var y int
	for ; x > y; x /= 10 {
		y = y*10 + x%10
	}
	return x == y || x == y/10
}
```



### 274 H-Index

方法一：使用内置 排序函数 解题，时间复杂度为 排序的 O(nlogn)

```go
func hIndex(citations []int) (h int) {
    sort.Ints(citations)
    for i := len(citations) - 1; i >= 0 && citations[i] > h; i-- {
        h++
    }
    return
}
```

方法二：计数排序，...使得计数排序的时间复杂度降低到 O(n)

```go
func hIndex(citations []int) (h int) {
    n := len(citations)
    counter := make([]int, n+1)
    for _, citation := range citations {
        if citation >= n {
            counter[n]++
        } else {
            counter[citation]++
        }
    }
    // 此时 counter 相当于一个排好序的数组
    for i, total := n, 0; i >= 0; i-- {
        total += counter[i]
        if total >= i {
            return i
        }
    }
    return 0
}
```



#### 135 分糖果 Candy  __hard__

```go
// 两次遍历：左规则遍历 + 右规则遍历，然后取每个点的最大值
// 性能较差
func candy(ratings []int) int {
	n := len(ratings)

	// 左规则：当 ratings[i−1]<ratings[i] 时，i 号学生的糖果数量将比 i−1 号孩子的糖果数量多。
	left := make([]int, n)
	left[0] = 1
	for i := 1; i < n; i++ {
		if ratings[i] > ratings[i-1] {
			left[i] = left[i-1] + 1
		} else {
			left[i] = 1
		}
	}

	// 右规则：当 ratings[i]>ratings[i+1] 时，i 号学生的糖果数量将比 i+1 号孩子的糖果数量多。
	right := 1
	res := max(left[n-1], right)
	for i := n - 2; i >= 0; i-- {
		if ratings[i] > ratings[i+1] {
			right++
		} else {
			right = 1
		}
		fmt.Println(max(left[i], right))
		res += max(left[i], right)
	}
	return res
}
```


#### 228 汇总区间 Summary Ranges  __easy__

普通的写法，需要特别处理「数组为空」并且在循环结束后需要补上最后一段区间的逻辑。

```go
func summaryRanges(nums []int) []string {
    n := len(nums)
	res := []string{}
	// n == 0
    if n == 0 {
        return res
    }
	start := 0
	for i := 1; i < n; i++ {
		if nums[i] != nums[i-1]+1 {
			if i-start > 1 {
				res = append(res, fmt.Sprintf("%d->%d", nums[start], nums[i-1]))
			} else {
				res = append(res, fmt.Sprintf("%d", nums[start]))
			}
			start = i
		}
	}
	// i == n
	if n-start > 1 {
		res = append(res, fmt.Sprintf("%d->%d", nums[start], nums[n-1]))
	} else {
		res = append(res, fmt.Sprintf("%d", nums[start]))
	}
	return res
}
```

而采用 *分组循环* 写法，无需特判数组是否为空，也无需在循环结束后再补上处理最后一段区间的逻辑。这种写法是所有写法中最不容易出 BUG 的。

适用场景：按照题目要求，*数组会被分割成若干段，且每段的判断处理逻辑都是一样的*。

```
i, n = 0, len(nums)
while i < n:
    start = i
    while i < n and ...:
        i += 1
    # 从 start 到 i-1 是一段
    # 下一段从 i 开始，无需 i+=1
```

```go
func summaryRanges(nums []int) (ans []string) {
	for i, n := 0, len(nums); i < n; {
		start := i
		for i++; i < n && nums[i] == nums[i-1]+1; i++ {
		}
		s := strconv.Itoa(nums[start])
		if start < i-1 {
			s += "->" + strconv.Itoa(nums[i-1])
		}
		ans = append(ans, s)
	}
	return
}
```

