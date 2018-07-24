<script>MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'md']);</script>
<style>
td:first-child{ color:red; }  td:first-child em { color: gray; }
p > code { display: inline-block; min-width: 100px; background: inherit; }
</style>

# Tex 语法速查


## 参考资源

  http://www.forkosh.com/mathtextutorial.html  
  http://ctan.mirror.rafal.ca/info/lshort/english/lshort.pdf  
  http://www.tug.org/twg/mactex/tutorials/ltxprimer-1.0.pdf
  http://mirrors.shu.edu.cn/CTAN/info/symbols/math/maths-symbols.pdf

## 示例

<div class="demo">
  \\( z = r\cdot e^{2\pi i}. \\)
  <div class="desc">
    <pre>\\( z = r\cdot e^{2\pi i}. \\)</pre>
  </div>
</div>
<div class="demo">
  \\[ J(\theta) = \frac 1 2 \sum\_{i=1}^m (h\_\theta(x^{(i)})-y^{(i)})^2 \\]
  <div class="desc">
    <pre>\\[ J(\theta) = \frac 1 2 \sum\_{i=1}^m (h\_\theta(x^{(i)})-y^{(i)})^2 \\]</pre>
  </div>
</div>
<div class="demo column">
  <div>
    \\[ y= \begin{cases} -x,\quad x\leq 0 \\\\ x,\quad x>0 \end{cases} \\]
  </div>
  <div class="desc">
    <pre>\\[ y= \begin{cases}
-x,\quad x\leq 0 \\\\ x,\quad x>0
\end{cases} \\]</pre>
  </div>
</div>


## 语法

数学标记

||||
-------|------|-------------------|------------
 ^     | 上标 | \\( x^2 \\)       | `x^2`
 _     | 下标 | \\( x_1 \\)       | `x_1`
 \to   | 箭头 | \\( \to \\)       | `\to`
 \quad | 空格 |                   | 
 \backslash | | \\( \backslash \\)| 
 \\    | 换行 |                   | 
 \frac _a b_        | 分数 fraction    | \\( \frac a b \\)       | `\frac a b`
 \sqrt[_n_]{_x_}    | 根式 square root | \\( \sqrt[n]{x} \\)     | `\sqrt[n]{x}`
 \sum\_{_exp_}^_m_  | 累加             | \\( \sum_{i=1}^m \\)    | `\sum_{i=1}^m`
 \prod\_{_exp_}^_n_ | 累乘             | \\( \prod_{k=1}^n \\)   | `\prod_{k=1}^n`
 \lim               | 极限             | \\( \lim_{x\to0}x^2 \\) | `\lim_{x\to0}x^2`
 \int               | 积分             | \\( \int_a^b \\)        | `\int_a^b`

数学符号

\\( \times \\) `\times`
\\( \div \\) `\div`
\\( \pm \\) `\pm`
\\( \leq \\) `\leq`
\\( \geq \\) `\geq`
\\( \neq \\) `\neq`
\\( \approx \\) `\approx`

\\( \infty \\) `\infty`
\\( \in \\) `\in`
\\( \notin \\) `\notin`
\\( \supset \\) `\supset`
\\( \subset \\) `\subset`
\\( \cup \\) `\cup`
\\( \cap \\) `\cap`

\\( \cdot \\) `\cdot`
\\( \cdots \\) `\cdots`
\\( \circ \\) `\circ`
\\( \prime \\) `\prime`
\\( \mid \\) `\mid`
\\( \equiv \\) `\equiv`

\\( \dot a \\) `\dot a`
\\( \hat b \\) `\hat b`
\\( \bar c \\) `\bar c`
\\( \tilde d \\) `\tilde d`

希腊字母

\\( \alpha \\) `\alpha`
\\( \beta \\) `\beta`
\\( \gamma \\) `\gamma`
\\( \delta \\) `\delta`
\\( \epsilon \\) `\epsilon`
\\( \varepsilon \\) `\varepsilon`
\\( \zeta \\) `\zeta`

\\( \eta \\) `\eta`
\\( \theta \\) `\theta`
\\( \vartheta \\) `\vartheta`
\\( \iota \\) `\iota`
\\( \kappa \\) `\kappa`
\\( \lambda \\) `\lambda`
\\( \mu \\) `\mu`

\\( \nu \\) `\nu`
\\( \xi \\) `\xi`
\\( \omicron \\) `\omicron`
\\( \pi \\) `\pi`
\\( \rho \\) `\rho`
\\( \sigma \\) `\sigma`
\\( \tau \\) `\tau`

\\( \upsilon \\) `\upsilon`
\\( \phi \\) `\phi`
\\( \chi \\) `\chi`
\\( \psi \\) `\psi`
\\( \omega \\) `\omega`

\\( \Gamma \\) `\Gamma`
\\( \Delta \\) `\Delta`
\\( \Theta \\) `\Theta`
\\( \Lambda \\) `\Lambda`
\\( \Xi \\) `\Xi`
\\( \Pi \\) `\Pi`
\\( \Sigma \\) `\Sigma`

\\( \Upsilon \\) `\Upsilon`
\\( \Phi \\) `\Phi`
\\( \Psi \\) `\Psi`
\\( \Omega \\) `\Omega`

|||||
---|---|---------|--------------|-------------------------------------
 Α | α | alpha   | /ˈælfə/      | 角度; 系数; 角加速度
 Β | β | beta    | /ˈbeɪtə/     | 磁通系数; 角度; 系数
 Γ | γ | gamma   | /ˈɡæmə/      | 电导系数; 角度; 比热容比
 Δ | δ | delta   | /ˈdeltə/     | 变化量，屈光度，一元二次方程中的判别式
 Ε | ε | epsilon | /ˈepsɪlɑːn/  | 对数之基数; 介电常数
 Ζ | ζ | zeta    | /ˈziːtə/     | 系数; 方位角; 阻抗; 相对粘度
 Η | η | eta     | /ˈiːtə/      | 迟滞系数; 效率
 Θ | θ | theta   | /ˈθiːtə/     | 温度; 相位角
 Ι | ι | iota    | /aɪˈəʊtə/    | 微小; 一点儿
 Κ | κ | kappa   | /ˈkæpə/      | 介质常数; 绝热指数
 Λ | λ | lambda  | /ˈlæmdə/     | 波长(小写); 体积; 导热系数
 Μ | μ | mu      | /mjuː/       | 磁导系数; 微0.001; 动摩擦因数; 流体动力粘度
 Ν | ν | nu      | /njuː $ nuː/ | 磁阻系数; 流体运动粘度; 光子频率
 Ξ | ξ | xi      | /ksaɪ $ saɪ/ | 随机数; (小)区间内的一个未知特定值
 Ο | ο | omicron | /əʊˈmaɪkrɒn/ | 高阶无穷小函数
 Π | π | pi      | /paɪ/        | 圆周率
 Ρ | ρ | rho     | /rəʊ/        | 电阻系数; 柱坐标和极坐标中的极径; 密度
 Σ | σ | sigma   | /ˈsɪɡmə/     | 总和(大写),表面密度; 跨导(小写)
 Τ | τ | tau     | /tɔː $ taʊ/  | 时间常数
 Υ | υ | upsilon | /ˈʊpsɪlɑːn/  | 位移
 Φ | φ | phi     | /faɪ/        | 磁通; 角
 Χ | χ | chi     | /kaɪ/        | 统计学中有卡方分布
 Ψ | ψ | psi     | /psaɪ $ saɪ/ | 角速; 介质电通量(静电力线); 角
 Ω | ω | omega   | /ˈəʊmɪɡə/    | 欧姆(大写); 角速(小写); 角

其他符号

\\( \partial \\)  `\partial`  




