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
  .exp:hover::after, .exa:hover::after { display: block; position: absolute; background-color: #f6f6f6; padding: 4px 4px 4px 12px; width: 95%; }
  .exp:hover::after, .exa:hover::after { content: attr(data-txt); }
  .exp::before { content: '释'; }
  .exa::before { content: '例'; }
</style>


# 外教系统课

## 业务沟通

### Double checking information

swag  _/swæɡ/_  n. 脏款,脏物; 会议、展会等场合的伴手礼  


[析] lie vs lay
* lie 有“说谎”的意思，此时是个规则动词，动词变形是 lie, lied, lied
* lie 表示“躺” “东西平放” “位于” 等意思时，是不规则动词，动词变形是 lie, lay, lain
* lay 本身也可以当一个动词，且是不规则动词，动词变形为 lay, laid, laid，是及物动词，后面必须接宾语

* 说谎 lie-lied-lied-lying
* 躺，位于 lie-lay-lain-lying
* 放置，下蛋 lay-laid-laid-laying






