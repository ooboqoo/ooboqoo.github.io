# Jest

https://zhuanlan.zhihu.com/p/28247899  
https://trends.google.com/trends/explore?date=today%2012-m,today%2012-m,today%2012-m&geo=,,&q=Mocha,Jest,Jasmine

Jest 是 Facebook 出品的一个测试框架，相对其他测试框架，其一大特点就是就是内置了常用的测试工具，比如自带断言、测试覆盖率工具，实现了开箱即用。

而作为一个面向前端的测试框架，Jest 可以利用其特有的快照测试功能，通过比对 UI 代码生成的快照文件，实现对 React 等常见框架的自动测试。

此外， Jest 的测试用例是并行执行的，而且只执行发生改变的文件所对应的测试，提升了测试速度。


## API

### Globals

```text
beforeAll(fn, timeout)
afterAll(fn, timeout)
beforeEach(fn, timeout)
afterEach(fn, timeout)

describe(name, fn)
describe.each(table)(name, fn, timeout)
describe.only(name, fn)
describe.only.each(table)(name, fn)
describe.skip(name, fn)
describe.skip.each(table)(name, fn)

test(name, fn, timeout)
test.each(table)(name, fn, timeout)
test.only(name, fn, timeout)
test.only.each(table)(name, fn)
test.skip(name, fn)
test.skip.each(table)(name, fn)
test.todo(name)
```

### Except

```text
expect.assertions(number)
expect.hasAssertions()

expect.anything()
expect.any(constructor)

expect.not.arrayContaining(array)
expect.not.objectContaining(object)
expect.not.stringContaining(string)
expect.not.stringMatching(string | regexp)

expect.extend(matchers)
expect.addSnapshotSerializer(serializer)
```

```text
expect(value)
  .not
  .resolves
  .rejects
    .toXxxXxx()

.toBe(value)           `Object.is`
.toEqual(value)        `Object.is` + 对象深比较
.toStrictEqual(value)  深比较时会考虑：属性值为undefined与不带属性不等；会比较Class类型 obj.constructor.name

.toBeUndefined()
.toBeDefined()
.toBeNull()
.toBeTruthy()   `Boolean(value)`
.toBeFalsy()    `Boolean(value)`

.toContain(item)       用于数组或字符串(不过字符串用 toMatch 更合适)
.toContainEqual(item)  当数组成员是对象时，会对对象进行深比较
.toMatch(regexpOrString)  适用于字符串
.toMatchObject(object)    适用于对象
.toHaveLength(number)
.toHaveProperty(keyPath, value?)
.toBeInstanceOf(Class)  即`instanceof()`

.toBeGreaterThan(number)
.toBeGreaterThanOrEqual(number)
.toBeLessThan(number)
.toBeLessThanOrEqual(number)
.toBeCloseTo(number, numDigits?)
.toBeNaN()

.toMatchSnapshot(propertyMatchers?, hint?)
.toMatchInlineSnapshot(propertyMatchers?, inlineSnapshot)

.toThrow(error?) / .toThrowError(error?)
.toThrowErrorMatchingSnapshot(hint?)
.toThrowErrorMatchingInlineSnapshot(inlineSnapshot)

.toHaveBeenCalled()
.toHaveBeenCalledTimes(number)
.toHaveBeenCalledWith(arg1, arg2, ...)
.toHaveBeenLastCalledWith(arg1, arg2, ...)
.toHaveBeenNthCalledWith(nthCall, arg1, arg2, ....)

.toHaveReturned()
.toHaveReturnedTimes(number)
.toHaveReturnedWith(value)
.toHaveLastReturnedWith(value)
.toHaveNthReturnedWith(nthCall, value)
```

```js
describe('The difference of `toBe` `toEqual` and `toStrictEqual`', () => {
  const obj1 = { name: 'object' }
  const obj2 = { name: 'object' }
  const obj3 = { name: 'object', age: undefined }

  test('toBe: almost the same with `Object.is`', () => {
    expect(obj1).not.toBe(obj2)
  })

  test('toEqual: `Object.is` plus deep equality', () => {
    expect(obj1).toEqual(obj3)
  })

  test('toStrictEqual: a more strict `toEqual`', () => {
    expect(obj1).toStrictEqual(obj2)
    expect(obj1).not.toStrictEqual(obj3)
  })
});
```

```js
test('understand `toContain` and `toContainEqual`', () => {
  const obj = { key: 'value' }
  const arr = [obj]
  expect(arr).toContain(obj)
  expect(arr).not.toContain({ key: 'value' })
  expect(arr).toContainEqual({ key: 'value' })

  expect('123').toContain(2)
  expect('123').toContain('2')
  expect('123').not.toContainEqual(2)
  expect('123').toContainEqual('2')
});
```

### Mock Functions

```text
mockFn.mock.calls
mockFn.mock.results
mockFn.mock.instances
mockFn.mockClear()
mockFn.mockReset()
mockFn.mockRestore()

mockFn.mockImplementation(fn)
mockFn.mockImplementationOnce(fn)

mockFn.getMockName()
mockFn.mockName(value)

mockFn.mockReturnThis()
mockFn.mockReturnValue(value)
mockFn.mockReturnValueOnce(value)
mockFn.mockResolvedValue(value)
mockFn.mockResolvedValueOnce(value)
mockFn.mockRejectedValue(value)
mockFn.mockRejectedValueOnce(value)
```

### Jest Object

```text
jest.fn(implementation)
jest.spyOn(object, methodName)
jest.spyOn(object, methodName, accessType?)

jest.disableAutomock()
jest.enableAutomock()

jest.genMockFromModule(moduleName)
jest.mock(moduleName, factory, options)
jest.unmock(moduleName)
jest.doMock(moduleName, factory, options)
jest.dontMock(moduleName)
jest.setMock(moduleName, moduleExports)
jest.requireActual(moduleName)
jest.requireMock(moduleName)
jest.resetModules()
jest.isolateModules(fn)

jest.isMockFunction(fn)

jest.clearAllMocks()
jest.resetAllMocks()
jest.restoreAllMocks()

jest.useFakeTimers()
jest.useRealTimers()
jest.runAllTicks()
jest.runAllTimers()
jest.runAllImmediates()
jest.advanceTimersByTime(msToRun)
jest.runOnlyPendingTimers()
jest.advanceTimersToNextTimer(steps)
jest.clearAllTimers()
jest.getTimerCount()
jest.setTimeout(timeout)
jest.retryTimes()
```


## Introduction

### Setup and Teardown

```js
beforeAll(() => console.log('1 - beforeAll'))
afterAll(() => console.log('1 - afterAll'))
beforeEach(() => console.log('1 - beforeEach'))
afterEach(() => console.log('1 - afterEach'))
test('', () => console.log('1 - test'))
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'))
  afterAll(() => console.log('2 - afterAll'))
  beforeEach(() => console.log('2 - beforeEach'))
  afterEach(() => console.log('2 - afterEach'))
  test('', () => console.log('2 - test'))
})
;
// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
```

#### describe 和 test 块内代码的执行顺序

**describe 内的代码会先执行，然后再 test 内代码依次执行。**

```js
describe('outer', () => {
  console.log('describe outer-a')

  describe('describe inner 1', () => {
    console.log('describe inner 1')
    test('test 1', () => {
      console.log('test for describe inner 1')
      expect(true).toEqual(true)
    })
  })

  console.log('describe outer-b')

  test('test 1', () => {
    console.log('test for describe outer')
    expect(true).toEqual(true)
  })

  describe('describe inner 2', () => {
    console.log('describe inner 2')
    test('test for describe inner 2', () => {
      console.log('test for describe inner 2')
      expect(false).toEqual(false)
    })
  })

  console.log('describe outer-c')
})
;
// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test for describe inner 1
// test for describe outer
// test for describe inner 2
```

### test.only

```js
test.only('this will be the only test that runs', () => {
  expect(true).toBe(false);
});

test('this test will not run', () => {
  expect('A').toBe('A');
});
```
