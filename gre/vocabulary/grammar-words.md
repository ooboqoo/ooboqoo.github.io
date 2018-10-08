# 语法书中生词

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

noun  _/naʊn/_  n.名词
  <span class="exp">See also: collective noun; count noun; mass noun; proper noun; singular noun; uncount noun</span>  
pronoun  _/ˈproʊnaʊn/_  n.代词,代名词
  <span class="exp">See also: indefinite pronoun; personal pronoun; reflexive pronoun; relative pronoun</span>  
adjective  _/ˈædʒɪktɪv/_  n.形容词
  <span class="exp">a word that describes a noun or pronoun.</span>  
adjectival  _/ˌædʒɪkˈtaɪvəl◂/_  n.形容词的,形容词性的
  <span class="exa">an adjectival phrase 形容词短语</span>  
article  _/ˈɑːrtɪkəl/_  n.报纸、杂志的文章; 物品,物件; 文件的条款,条文; 冠词
  <span class="exp">a 和 an 是不定冠词，the 是定冠词</span>  
preposition  _/ˌprepəˈzɪʃən/_  n.介词,前置词  
conjunction  _/kənˈdʒʌŋkʃən/_  n.(事件的)同时发生,同地发生; (语法中的)连词  _in conjunction with_ 与…一起  
interjection  _/ˌɪntəˈdʒekʃən/_  n.(突然的)插话; 感叹词,感叹语  
interject  _/ˌɪntəˈdʒekt/_  v.(突然)插入 formal.
  <span class="exp">to interrupt what someone else is saying with a sudden remark</span>  

predicate  _/ˈpredɪkət/_  n.谓语  _/'predɪkeɪt/_  v.基于,取决于 _be predicated on/upon something_  
object  _/'ɒbdʒɪkt/_  n.物体; 目标; 语法中的宾语  _/əb'dʒekt/_  v.不喜欢,不赞成  
predicative  _/prɪˈdɪkətɪv $ ˈpredəkeɪtɪv/_  表语(形容词担任), 和系动词一道构成谓语(系表结构)
  <span class="exp">a predicative adjective or phrase comes after a verb</span>  
adverbial  _/ədˈvɜːbiəl $ -ɜːr-/_  adj.副词的,状语的  






stand  stood



the Tropic of Cancer  北回归线  Cancer 巨蟹座  
the Tropic of Capricorn  南回归线  Capricorn 摩羯座  
the tropics  n.热带地区  -- the hottest part of the world, which is around the equator  




