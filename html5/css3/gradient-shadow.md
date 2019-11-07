

#### CSS3 Gradients 渐变

注意：渐变创建的是 image 而非 color

##### linear-gradient / repeating-linear-gradient

```
background / background-image: linear-gradient([<direction>,]? <color-stop> [, <color-stop>]+ );  
repeating-linear-gradient([<angle>|to <side-or-corner>,]? <color-stop> [, <color-stop>]+ )
```

`color-stop`: This value is comprised of a `color` value, followed by an optional stop position (either a percentage between 0% and 100% or a `length` along the gradient axis).

```less
background: linear-gradient(to bottom right, red, yellow);  // 向右下线性渐变
background-image: linear-gradient(-90deg, red, yellow);  // 角度线性渐变
background: linear-gradient(red, yellow, green);  // 多色线性渐变
background: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));  // 透明色线性渐变
background: repeating-linear-gradient(red, yellow 10%, green 20%);  // 重复线性渐变
```

##### radial-gradient / repeating-radial-gradient
```
radial-gradient([circle || <extent-keyword>]? [at <position>,]? <color-stop> [,<color-stop>]+ )
repeating-radial-gradient
```

`<extent-keyword>`: closest-side / closest-corner / farthest-side / farthest-corner

```less
background: radial-gradient(red, yellow, green);
background-image: radial-gradient(red 5%, yellow 15%, green 60%);
background: radial-gradient(farthest-corner at 45px 75%, red, rgba(0, 0, 255, 0) 50%, black);
background: repeating-radial-gradient(red, yellow 10%, green 15%);  // 重复放射渐变
```

#### CSS3 Shadow Effects 阴影

##### box-shadow

```less
/* offset-x | offset-y | blur-radius | spread-radius | color */
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
/* inset | offset-x | offset-y | color */
box-shadow: inset 5em 1em gold;
/* Any number of shadows, separated by commas */
box-shadow: 3px 3px red, -1em 0 0.4em olive;
```

##### text-shadow

```less
/* offset-x | offset-y | blur-radius | color */
text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
/* color | offset-x | offset-y | blur-radius */
text-shadow: #CCC 1px 0 10px;
```