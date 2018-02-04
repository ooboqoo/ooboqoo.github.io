# JUnit 4

## 命令行演练

https://github.com/junit-team/junit4/wiki/Getting-started

```bash
$ mkdir junitDemo; cd junitDemo
$ wget http://search.maven.org/remotecontent?filepath=org/hamcrest/hamcrest-core/1.3/hamcrest-core-1.3.jar hamcrest-core-1.3.jar
$ wget https://github.com/junit-team/junit4/releases/download/r4.12/junit-4.12.jar
$ vim Calculator.java  # 内容参见下文，后同
$ javac Calculator.java
$ vim CalculatorTest.java  # Create a test
$ javac -cp .:junit-4.12.jar:hamcrest-core-1.3.jar CalculatorTest.java  # Compile the test
$ java -cp .:junit-4.12.jar:hamcrest-core-1.3.jar org.junit.runner.JUnitCore CalculatorTest  # Run test
```

Calculator.java

```java
public class Calculator {
  public int evaluate(String expression) {
    int sum = 0;
    for (String summand: expression.split("\\+"))
      sum += Integer.valueOf(summand);
    return sum;
  }
}
```

CalculatorTest.java

```java
import static org.junit.Assert.assertEquals;
import org.junit.Test;

public class CalculatorTest {
  @Test
  public void evaluatesExpression() {
    Calculator calculator = new Calculator();
    int sum = calculator.evaluate("1+2+3");
    assertEquals(6, sum);
  }
}
```


## 测试套件


```java
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
  TestFeatureLogin.class,
  TestFeatureLogout.class,
  TestFeatureNavigate.class,
  TestFeatureUpdate.class
})

public class FeatureTestSuite {
  // the class remains empty,
  // used only as a holder for the above annotations
}
```


## 声明周期

JunitFlowTest.java

```java
public class JunitFlowTest {
  @BeforeClass
  public static void setUpBeforeClass() throws Exception {
    System.out.println("this is beforeClass...");
  }
  @AfterClass
  public static void tearDownAfterClass() throws Exception {
    System.out.println("this is afterClass...");
  }
  @Before
  public void setUp() throws Exception {
    System.out.println("this is before...");
  }
  @After
  public void tearDown() throws Exception {
    System.out.println("this is after");
  }
  @Test
  public void test1() {
    System.out.println("this is test1...");
  }
  @Test
  public void test2() {
    System.out.println("this is test2...");
  }
}
```

@BeforeClass-->@Before-->@Test1-->@After-->@Before-->@Test2-->@After-->@AfterClass


## @Test 参数


```java
public class AnotationTest {
  @Test(expected=ArithmeticException.class)
  public void testDivide() {
    assertEquals(3, new Calculate().divide(6, 0));
  }
  @Ignore("跳过此测试")
  @Test(timeout=2000)
  public void testWhile() {
    while(true) { System.out.println("run forever..."); }
  }
  @Test(timeout=3000)
  public void testReadFile() {
    try { Thread.sleep(2000); }
    catch (InterruptedException e) { e.printStackTrace(); }
  }
}
```

