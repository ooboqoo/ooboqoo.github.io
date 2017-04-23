### ECMAScript

#####@ 文法 Grammars

文法是用于描述语言的语法结构的形式规则。文法G定义为四元组(，，，)。其中为非终结符号(或语法实体，或变量)集；为终结符号集；为产生式(也称规则)的集合；产生式(规则)是形如或 a ::=b 的(a , b)有序对,其中(∪)且至少含有一个非终结符，而(∪)。，和是非空有穷集。称作识别符号或开始符号，它是一个非终结符，至少要在一条规则中作为左部出现。 
　　一个文法的例子: G=(={A，R},={0,1} ，={A?0R，A?01,R?A1},=A) 
文法分类（A hierarchy of Grammars） 
　　著名语言学家Noam Chomsky定义了四类文法和四种形式语言类，文法的四种类型分别是0型、1型、2型和3型。几类文法的差别在于对产生式施加不同的限制，分别是： 
　　0型文法(短语结构文法)(phrase structure grammars)： 
　　设G=(，，，)，如果它的每个产生式是这样一种结构： (∪)　　且至少含有一个非终结符，而(∪)，则G是一个0型文法。 
　　1型文法（上下文有关文法）(context-sensitive grammars)： 
　　设G=(，，，)为一文法，若中的每一个产生式均满足|，仅仅　　除外，则文法G是1型或上下文有关的。 
　　2型文法（上下文无关文法）(context-free grammars)： 
　　设G=(，，，)，若P中的每一个产生式满足：是一非终结符，(∪)　　则此文法称为2型的或上下文无关的。 
　　3型文法（正规文法）(regular grammars)： 
　　设G=(，，，)，若中的每一个产生式的形式都是A→aB或A→a，其中A和B都是非终结，a是终结符，则G是3型文法或正规文法。 
　　0型文法产生的语言称为0型语言。 
　　1型文法产生的语言称为1型语言，也称作上下文有关语言。 
　　2型文法产生的语言称为2型语言，也称作上下文无关语言。 
　　3型文法产生的语言称为3型语言，也称作正规语言。

#####@ 产生式 production

产生式是表征程序性知识的最小单位，是指人脑中贮存的一系列 "如果—那么" 形式表示的规则。

#####@ 词法分析 Lexical analysis | Scanning

词法分析阶段是编译过程的第一个阶段。这个阶段的任务是从左到右一个字符一个字符地读入源程序，即对构成源程序的字符流进行扫描然后根据构词规则识别单词(也称单词符号或符号)。

#####@ 词法分析程序 Lexical analyzer | Scanner

#####@ 语法分析 Syntax analysis | Parsing

语法分析是编译过程的一个逻辑阶段。语法分析的任务是在词法分析的基础上将单词序列组合成各类语法短语，如“程序”，“语句”，“表达式”等等。语法分析程序判断源程序在结构上是否正确。源程序的结构由上下文无关文法描述。

#####@ 语法分析程序 Parser

#####@ 语义分析 Syntax analysis

语义分析是编译过程的一个逻辑阶段。语义分析的任务是对结构上正确的源程序进行上下文有关性质的审查。

#####@ 源语言 Source language
#####@ 源程序 Source program

被编译程序翻译的程序称为源程序，书写该程序的语言称为源语言。

#####@ 目标语言 Object language | Target language
#####@ 目标程序 Object program | Target program

编译程序翻译源程序而得到的结果程序称为目标程序, 书写该程序的语言称为目标语言。

#####@ 中间语言 | 中间表示 Intermediate language | representation

在进行了语法分析和语义分析阶段的工作之后，有的编译程序将源程序变成一种内部表示形式，这种内部表示形式叫做中间语言或中间表示或中间代码。所谓“中间代码”是一种结构简单、含义明确的记号系统，这种记号系统复杂性介于源程序语言和机器语言之间，容易将它翻译成目标代码。另外，还可以在中间代码一级进行与机器无关的优化。

#####@ 令牌 token
#####@ 标识符 identifier
#####@ 保留字 ReservedWord
#####@ 关键字 keyword

#####@ 字面量 Literal
#####@ 原始值类型 Primitive Type 
#####@ 数据属性  data property
#####@ 访问器属性 accessor property

#####@ 引用 Reference

#####@ 严格模式 strict mode

#####@ 语法糖 syntactic sugar

它意指那些没有给计算机语言添加新功能，而只是对人类来说更“甜蜜”的语法。语法糖往往给程序员提供了更实用的编码方式，有益于更好的编码风格，更易读。

#####@ 蓝图 blueprint










