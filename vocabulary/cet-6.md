# CET-6

<script>
(function translate () {
  const ps = document.querySelectorAll('#md p')
  for (let p of ps) {
    p.innerHTML = p.innerHTML
      .replace(/(^|<br>)([忘析混错联派类]) ([\w-]+)/g, '$1<span class="tag-class">$2</span> <span class="word">$3</span>')
      .replace(/\b(n|v|vt|vi|a|ad|prep)\./g, '<span class="tag-pos">$&</span>')
      .replace(/SYN|OPP|BrE|NAmE/g, '<span class="tag-syn">$&</span>')
  }
  const exs = document.querySelectorAll('#md p span.exp, #md p span.exa')
  for (let ex of exs) { ex.dataset.txt = ex.innerHTML; ex.innerHTML = '' }
  const ems = document.querySelectorAll('#md p em')
  for (let em of ems) {
    const txt = em.textContent
    if (txt[0] === '/' && txt[txt.length - 1] === '/') { em.classList.add('tag-ps') }
  }
})();
</script>

<style>
  .tag-class { font-size: .75em; color: #999; }
  .word { color: red; }
  .tag-ps { color: #6aa; }
  .tag-pos { padding: 0 2px; color: #c33; }
  .tag-syn { padding: 0 2px; color: #999; font-size: .75em; border: 1px solid; border-radius: 4px; }
  .exp::before, .exa::before { padding: 0 2px; color: #999; border: 1px solid; border-radius: 4px; }
  .exp:hover::after, .exa:hover::after { display: block; position: absolute; background-color: #f6f6f6; padding: 12px 4px 12px 12px; width: 95%; }
  .exp:hover::after, .exa:hover::after { content: attr(data-txt); }
  .exp::before { content: '释'; }
  .exa::before { content: '例'; }
</style>

a  _/eɪ/_
b  _/biː/_
c  _/siː/_
d  _/diː/_
e  _/iː/_
f  _/ef/_
g  _/dʒiː/_

h  _/eɪtʃ/_
i  _/aɪ/_
j  _/dʒeɪ/_
k  _/keɪ/_
l  _/el/_
m  _/em/_
n  _/en/_

o  _/əʊ $ oʊ/_
p  _/piː/_
q  _/kjuː/_
r  _/ɑː $ ɑːr/_
s  _/es/_
t  _/tiː/_

u  _/juː/_
v  _/viː/_
w  _/ˈdʌbəljuː/_
x  _/eks/_
y  _/waɪ/_
z  _/ziː/_



### TOP 100 Phrasal Verbs

go on - 继续进行 SYN carry on  
carry on - 继续  
carry out - 执行  SYN execute  
set up - 建立 SYN establish  
pick up - 拾起  
go back - 回去  
get back - 返回  
come back - 回来  
go out - 出去  
point out - 指出  
find out - 发现  
come up - 出现  
make up - 编造  
take over - 接管  
come out - 出来  
come in - 进来  
go down - 下降  
work out - 解决  
set out - 出发  
take up - 占据  
sit down - 坐下  
turn out - 结果是  
take on - 承担  
give up - 放弃  
get up - 起床  
look up - 查找  
go up - 上升  
get out - 出去  
take out - 取出  
come down - 下来  
put down - 放下  
put up - 搭建  
turn up - 出现  
get on - 上车  
bring up - 提出  
bring in - 带进   
look back - 回顾  
look down - 俯视  
bring back - 带回  
break down - 故障  
take off - 脱下  
go off - 离开  
bring about - 引起  
go in - 进去  
set off - 出发  
put out - 熄灭  
look out - 注意  
take back - 拿回  
hold up - 耽搁  
get down - 下来  
hold out - 坚持  
put on - 穿上  
bring out - 带出  
move on - 继续前进  
turn back - 转身 
put back - 放回  
go round - 绕过  
break up - 分手 
come along - 跟着来  
set up - 建立  
turn round - 转身  
get in - 进入 
come round - 来访  
make out - 辨认出  
get off - 下车  
turn down - 拒绝  
bring down - 使倒下  
come over - 过来  
break out - 爆发  
go over - 检查  
turn over - 翻转  
go through - 经历  
hold on - 等一下  
pick out - 挑选  
sit back - 坐下  
hold back - 抑制  
put in - 放入  
move in - 搬进  
look around - 四处看看  
take down - 记下  
put off - 推迟  
come about - 发生  
go along - 陪同  
look round - 环顾四周  
set about - 开始  
turn off - 关闭  
give in - 屈服  
move out - 搬出  
come through - 渡过  
move back - 后退  
break off - 中断  
get through - 完成  
give out - 分发  
come off - 成功  
take in - 接受  
give back - 归还  
set down - 放下  
move up - 上移  
turn around - 转身  
get in - 进入  







