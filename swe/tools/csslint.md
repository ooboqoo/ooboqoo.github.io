# CSSLint &amp; SassLint


## Sass Lint

```bash
$ npm install -g sass-lint
```

_.sass-lint.yml_

```yaml
rules:
  indentation:
    - 2
    -
      size: 2
  # https://github.com/sasstools/sass-lint/blob/master/docs/rules/property-sort-order.md
  property-sort-order:
    - 1
    -
      order: 'smacss'
```

注：属性顺序清单 https://github.com/sasstools/sass-lint/blob/develop/lib/config/property-sort-orders/smacss.yml


## CSSLint

https://github.com/CSSLint/csslint/wiki/Rules

## Ignoring parts of CSS during linting

### Ignoring whole sections of CSS
Sometimes you don't want to lint all parts of your CSS, for example imported normalize stuff which often does some magic to make browsers behave.
For this you can use inline comments `/* csslint ignore:start */` and `/* csslint ignore:end */` to mark parts of the stylesheet to be ignored.

Here's an example (which would need some processing to actually inline the normalize.css):
```css
/* csslint ignore:start */
@import('normalize.css');
/* csslint ignore:end */

body {
  background: #333;
  color: #eee;
}
```

### Ignoring rules per line
Maybe you want to use a certain rule in your project, but just not for a specific part of it; or you temporarily need a hack to pass the code quality check. The "csslint allow" directive allows you to ignore pre-specified errors on a per-line basis:
```css
.foo.bar { /* csslint allow: adjoining-classes */
    margin: 0;
}
.baz.qux {
    fill: none !important; /* csslint allow: known-properties, important */
}
```

