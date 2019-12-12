# 词汇表 - 语言规范

<style>
  strong { color:#C00; }
  i, em { font-style: normal; font-family:"lucida sans unicode", arial, sans-serif; color: #0aa; }
  span { color: #999; }
</style>

__lexical__  _/ˈleksɪkəl/_  a.词汇的  
__syntax__  _/ˈsɪntæks/_  n. 句法规则, 句法  
__semantic__  _/sɪˈmæntɪk/_  a. 语义的  
__literal__  _/ˈlɪtərəl/_  原义的, 字面上的, 直译的; [计] 字面量, 字面值  
__statement__  n. 陈述, 声明; [计] 语句  
__expression__  _/ɪkˈspreʃən/_  表达式  <span>combine variables and constants to produce new values.</span>  
__clause__  分句, 从句, 子句  
__block__  代码块  

__operator__  _/ˈɒpəreɪtə/_  n. 技工, 操作员; 经营者, 运营商; [计] 操作符, 算子  
__operand__  _/ˈɒpərænd/_  n. [计] 操作数, 运算对象  







## 编译原理

__JIT__  运行时动态编译  
__AOT__  预编译(静态编译)  
__AST__  Abstract Syntax Tree 抽象语法树  
__DSL__  领域专用语言  



__产生式 production__  产生式是表征程序性知识的最小单位，是指人脑中贮存的一系列 "如果—那么" 形式表示的规则。

__词法分析 lexical analysis | scanning__  词法分析阶段是编译过程的第一个阶段。这个阶段的任务是从左到右一个字符一个字符地读入源程序，即对构成源程序的字符流进行扫描，然后根据构词规则识别单词(也称单词符号或符号)。

__词法分析程序 lexical analyzer | scanner__

__语法分析 syntax analysis | parsing__  语法分析是编译过程的一个逻辑阶段。语法分析的任务是在词法分析的基础上将单词序列组合成各类语法短语，如“程序”，“语句”，“表达式”等等。语法分析程序判断源程序在结构上是否正确。源程序的结构由上下文无关文法描述。

__语法分析程序 parser__

__语义分析 syntax analysis__  语义分析是编译过程的一个逻辑阶段。语义分析的任务是对结构上正确的源程序进行上下文有关性质的审查。

__源语言 source language__

__源程序 source program__  被编译程序翻译的程序称为源程序，书写该程序的语言称为源语言。

__目标语言 object language | target language__

__目标程序 object program | target program__  编译程序翻译源程序而得到的结果程序称为目标程序, 书写该程序的语言称为目标语言。

__中间语言 intermediate language__  
__中间表示 intermediate representation__  

在进行了语法分析和语义分析阶段的工作之后，有的编译程序将源程序变成一种内部表示形式，这种内部表示形式叫做中间语言或中间表示或中间代码。所谓“中间代码”是一种结构简单、含义明确的记号系统，这种记号系统复杂性介于源程序语言和机器语言之间，容易将它翻译成目标代码。另外，还可以在中间代码一级进行与机器无关的优化。

__令牌 token__  
__标识符 identifier__  
__保留字 reserved word__  
__关键字 keyword__  
__字面量 literal__  
__原始值类型 primitive type__  
__数据属性 data property__  
__访问器属性 accessor property__  
__引用 reference__  
__严格模式 strict mode__  

__语法糖 syntactic sugar__  它意指那些没有给计算机语言添加新功能，而只是对人类来说更“甜蜜”的语法。语法糖往往给程序员提供了更实用的编码方式，有益于更好的编码风格，更易读。

__蓝图 blueprint__
