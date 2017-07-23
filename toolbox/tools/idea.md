# IntelliJ IDEA

IDEA 的几大特性：
  * Intelligent coding assistance（智能编码辅助）
  * Smart code navigation（智能代码导航）
  * Built-in tools and integrations（内置的工具和集成）
  * Smart code completion（智能代码补全）
  * Framework-specific assistance（特定于框架的辅助）
  * Productivity boosters（生产力的助推器）
  * More than just code editor（不仅仅只是代码编辑器）
  * Smart in every way（高智能）

## 功能和使用技巧

### Live Templates

通过 `Ctrl+J` 调出，也可以先输入相应简写再 `Tab` 展开。以下是比较常用的模板：

| Abbreviation | Generated Code |
|--------     -|--------------------------------
| psvm  | `public static void main(String[] args) {}`
| psfs  | `public static final String`
| psf   | `public static final`
| sout  | `System.out.println();`
| soutv | `System.out.println("var = " + $var);`
| St    | `String`
| ifn   | `if ($var == null) {}`
| inn   | `if ($var != null) {}`


### Postfix Completion

具体在 Settings -> Editor -> General -> Postfix Completion

`5.var` 会自动生成 `int i = 5;`

### Documentation

Quick Documentation - 弹窗查看 JavaDoc 文档注释
  * 使用：`Ctrl+Q`

External Documentation - 浏览器查看完整的外部文档
  * 设置：项目名 -> 右键选 Open Module Settings -> SDKs -> Documentation Paths -> 选择离线zip包或填写在线文档地址
  * 使用：`Shift+F1`



















