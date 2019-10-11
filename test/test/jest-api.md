# Jest API


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
