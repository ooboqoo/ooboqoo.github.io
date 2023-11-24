# CET-6

<script>
(function translate () {
  const ps = document.querySelectorAll('#md p')
  for (let p of ps) {
    p.innerHTML = p.innerHTML
      .replace(/(^|<br>)([忘析混错联派类]) ([\w-]+)/g, '$1<span class="tag-class">$2</span> <span class="word">$3</span>')
  }
})();
</script>

<style>
  .tag-class { font-size: .75em; color: #999; }
  .word { color: red; }
</style>







