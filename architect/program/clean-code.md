# 代码整洁之道

## 1. 整洁代码

要有代码

稍后等于永不 Later equals never


糟糕的代码


1.3 混乱的代价

有些团队在项目初期进展迅速，但有那么一两年的时间却慢如蜗牛，对代码的每次修改都影响到其他两三处代码。随着混乱的增加，团队生产力也持续下降，趋向于零。此时管理层会增加更多的人手到项目中，可是新人并不熟悉系统的设计，于是他们制造更多的混乱。

1.3.1 华丽的新设计

老系统玩不下去了，于是组建了新的团队另起炉灶。新团队必须搭建一套新系统，要能实现旧系统的所有功能，另外，还得跟上对旧系统的持续改动。在新系统功能足以抗衡旧系统之前，管理层不会替换掉旧系统。

1.3.2 态度

程序员遵从不了解混乱风险的经理的意愿，也是不专业的做法。


1.6 童子军军规

**让营地比你来时更干净。**

如果每次签入时，代码都比签出时干净，那么代码就不会腐坏。




布尔值的命名

isSet, isVisible, isFinished, isFound, isOpen

`hasLicense()` `canEvaluate()` `shouldAbort`

```java
void setFound(boolean isFound)
```

```java
private boolean current;

public boolean isCurrent(){
    return current;
}

public void setCurrent(final boolean current){
    this.current = current;
}
```

















