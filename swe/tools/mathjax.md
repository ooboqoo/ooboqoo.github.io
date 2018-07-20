<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML"></script>

# MathJax

https://www.w3schools.com/charsets/ref_utf_math.asp  
https://blog.kamidox.com/write-math-formula-with-mathjax.html

## MathJax 与 Markdown

http://docs.mathjax.org/en/latest/config-files.html

<div class="demo">
  \\( z = r\cdot e^{2\pi i}. \\)
  <div class="desc">
    <pre>\\( z = r\cdot e^{2\pi i}. \\)</pre>
  </div>
</div>
<p></p>
<div class="demo">
  \\[ J(\theta) = \frac 1 2 \sum\_{i=1}^m (h\_\theta(x^{(i)})-y^{(i)})^2 \\]
  <div class="desc">
    <pre>\\[ J(\theta) = \frac 1 2 \sum\_{i=1}^m (h\_\theta(x^{(i)})-y^{(i)})^2 \\]</pre>
  </div>
</div>

公式中的一些标记(如 `_` `\`) 会被 Markdown 引擎处理, 所以需要特别注意这层影响. 常规的解决方法有:
  * 对一些标记进行转义处理
  * 用 `` ` `` 或 html 标签包裹

另外还需注意 MathJax 的一些特性:

* MathJax 默认不检查 `<code>` 标签内部的数学公式。
* MathJax 默认也不会把单美元符号 `$` 识别为行内公式，因为单美元符号可能表示货币。


## Tex

https://www.latex-project.org/

MathML 是 XML 健壮但书写不友好, 而 LaTex 虽然没那么健壮但胜在书写简便.

## 插入数学公式

LaTeX 的数学模式有两种：行内模式和行间模式。前者在正文的行文中，插入数学公式；后者独立排列单独成行，并自动居中。

在行文中，使用 `$ ... $` 可以插入行内公式，使用 `\[ ... \]` 可以插入行间公式，如果需要对行间公式进行编号，则可以使用 `equation` 环境.

行内公式也可以使用 `\(...\)` 来插入, 也有 plainTeX 风格的 `$$ ... $$` 来插入不编号的行间公式。

```tex
\begin{equation}
...
\end{equation}
```

### 上下标

在数学模式中, `^` 表示上标, `_` 表示下标, 默认只作用于之后的一个字符, 如果想对连续的几个字符起作用, 请将这些字符用花括号 `{}` 括起来.

```tex
\[ z = r\cdot e^{2\pi i}. \]
```

### 根式与分式

根式用 `\sqrt{...}` 来表示，分式用 `\frac{分子}{分母}` 来表示。

### 运算符

一些小的运算符，可以在数学模式下直接输入；另一些需要用控制序列生成，如

```tex
\[ \pm\; \times \; \div\; \cdot\; \cap\; \cup\; \geq\; \leq\; \neq\; \approx \; \equiv \]
```

连加、连乘、极限、积分等大型运算符分别用 \sum, \prod, \lim, \int生成。他们的上下标在行内公式中被压缩，以适应行高。我们可以用 \limits 和 \nolimits 来强制显式地指定是否压缩这些上下标。例如：

```tex
$ \sum_{i=1}^n i\quad \prod_{i=1}^n $
$ \sum\limits _{i=1}^n i\quad \prod\limits _{i=1}^n $
\[ \lim_{x\to0}x^2 \quad \int_a^b x^2 dx \]
\[ \lim\nolimits _{x\to0}x^2\quad \int\nolimits_a^b x^2 dx \]
```

多重积分可以使用 \iint, \iiint, \iiiint, \idotsint 等命令输入。

```tex
\[ \iint\quad \iiint\quad \iiiint\quad \idotsint \]
```

### 矩阵

amsmath 的 pmatrix, bmatrix, Bmatrix, vmatrix, Vmatrix 等环境可以在矩阵两边加上各种分隔符。

```tex
\[ \begin{pmatrix} a&b\\c&d \end{pmatrix} \quad
\begin{bmatrix} a&b\\c&d \end{bmatrix} \quad
\begin{Bmatrix} a&b\\c&d \end{Bmatrix} \quad
\begin{vmatrix} a&b\\c&d \end{vmatrix} \quad
\begin{Vmatrix} a&b\\c&d \end{Vmatrix} \]
```

