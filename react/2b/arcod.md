# arco.design

https://arco.design/  

ArcoDesign 使用过程中的高频代码以及常见的坑点。

## hooks

### `useArcoTable`

```js
const { tableProps, refresh } = useArcoTable(
  async ({ current, pageSize }) => {
    const res = await backToOriginService.GetDomainList({
      page_num: current,
      page_size: pageSize,
      ...search,
    });
    return { list: res.content.detail, total: res.content.total };
  },
  {
    auto: true,
    refreshDeps: [search], // refreshDeps 变化，会重置 current 到第一页，并重新发起请求
    debounceInterval: 500,
    cacheKey: 'dispatch_l2_domain_list'  // 跳转到其他页面再调回来，会保留页面状态，刷新会重置状态
  },
);
```

### `run`

坑点：`run` 始终执行成功

```js
const { run } = useRequest(() => {
  return Promise.reject('foo')
})
run().then(console.log)  // foo
```



## Form

### `form` 嵌套

【问题】W3C 规范不允许 `<form>` 元素嵌套，所以出现嵌套的场景 React 会出警告(但不影响正常使用)
【方案】借助 `ReactDOM.createPortal(child, container)` 规避报错，或直接忽略错误

```txt
Warning: validateDOMNesting(...): <form> cannot appear as a descendant of <form>.
```

### 复杂表单项

【问题】`Form.Item` 只能有一个 Child，否则不会绑定 `value` 和 `onChange`
【方案1】多套几层 `Form.Item` 就是，在需要绑定的 `Form.Item` 上配 `field` 就好
【方案2】

```tsx
// 这个输入项的特点
// 1. 需要自定义提示
// 2. 这里实际输入内容 和 最终提交到 form 的值是经过转换的
//
// 优势
// 1. 提示只在 `Domains` 字段变更时更新，不需要添加 `shouldUpdate={true}`
// 2. `rules` 按照常规写法写就行，不需要特别处理
<Form.Item label="域名" field="Domains" rules={rules}>
  {(values: any) => (
    <Fragment>
      <Input.TextArea
        onChange={value => {
          // 这里无法直接用 API 的 `normalize` 和 `formatter`
          form.setFieldValue(
            'Domains',
            value ? value.split(/[\s\n]/).filter(Boolean) : [],
          );
        }}
      />
      <div className="text-gray-400">
        单次提交 {values.Domains?.length ?? 0}/10
      </div>
    </Fragment>
  )}
</Form.Item>
```

### 取值

```ts
class Store {
  // 异步函数，校验并返回表单值，如果不提供 fields 则只返回配了 <Form.Item field="xxx"> 的项目
  validate: FormValidateFn<FormData, FieldValue, FieldKey>;

  // 同步函数，返回配了 <Form.Item field="xxx"> 的项目的值
  getFieldsValue: () => Partial<FormData>;
  // 同步函数，具体返回哪些值根据配置定，可以返回「未配置」<Form.Item field="xxx"> 的项目的值
  getFieldsValue:(fields?: FieldKey[]) => Partial<FormData>;

  // 获取全部表单项的值，包括被创建后销毁的表单项
  getFields: () => Partial<FormData>;
}
```

注：如果某个表单项不需要展示，但又需要在 `form.validate()` 中取到值，可以通过 `<Form.Item filed="xxx" hidden />` 来实现。

### initialValues

```tsx
<Form initialValues={...}>
  <Form.Item>{(values, form) => {
    // 首次加载时
    // 这里 values 能取到 initialValues 的值
    // form.getFieldsValue() 取不到值
    // 所以还是在 useEffect 里 setFieldsValue 更靠谱
  }}</Form.Item>
</Form>
```

```tsx
// form.validate() 可以正常拿到 `initialValues` 和 `initialValue` 的值，且 `initialValue` 的优先级更高
<Form form={form} initialValues={{ name: 'aaa' }}>
  <Form.Item label="姓名" field="name" initialValue="bbb">
    <Input />
  </Form.Item>
</Form>
```

### `shouldUpdate` 不生效

```tsx
// 这样不生效
<Form.Item shouldUpdate={true}>
  {form.getFieldValue('type') === 'a' ? <CompA /> : <CompB />}
</Form.Item>

// 这样才行
<Form.Item shouldUpdate={true}>
  {(values, form) => form.getFieldValue('type') === 'a' ? <CompA /> : <CompB />}
</Form.Item>
```

### 表单校验

提供自定义校验时，要单独写 `validator`

```tsx
<Form.Item rules={[{
  required: true, // 写在一起，这里的校验会被 validator 的逻辑覆盖。即，这里，不输入也能过校验
  validator(value, callback) {
    if (value?.length > 10) {
      callback('最多输入10个字符');
    }
  }
}]}></Form.Item>
```

### 后端 `optional` 字段

```tsx
<Form form={form}>
  <Form.Item label="姓名" field="name">
    <Input />
  </Form.Item>
</Form>

// optional 的字段在后端有几种体现形式 需要默认值、非默认值、nil三种情况
// 后端要求 optional string 的字段不要给 空字符串
// 前端只要没有动过输入框(只 focus 不算) 是不会给 空字符串的，值为 undefined（即后端的 nil）
// 但用户输入过，再清空，就会是 空字符串，需要后端适配
```

### 纯展示

```tsx
// 错误，展示样式会有问题
<Form.Item>纯文本</Form.Item>
// 正确，会添加几层 div，样式正常展示
<Form.Item><span>纯文本</span></Form.Item>
```

### `Form.List`

`Form.List` 下的 `<Form.Item noStyle={true}>` 对调行内样式非常有帮助

```tsx
<Form.Item label="异常状态码" field="statusCodeCacheRule" rules={rules}>
  <Form.List field="statusCodeCacheRule">
    {(fields, { add, remove }) => (
      <Card>
        <Form.Item>
          <Button type="primary" onClick={() => add()}>新增状态码缓存规则</Button>
        </Form.Item>
        {fields.map((item, index) => (
          <Grid.Row key={item.key} className="mb-4">
            <Space>
              <span>状态码：</span>
              <Form.Item field={`${item.field}.code`} rules={rules} noStyle={true}>
                {/** 上面这个 noStyle 对调样式有非常大的帮助 */}
                <InputNumber min={400} max={599} />
              </Form.Item>
              <span className="ml-4">缓存时间：</span>
              <Form.Item field={`${item.field}.validTime`} rules={rules} noStyle={true}>
                <InputNumber min={1} suffix="秒" />
              </Form.Item>
              <Button icon={<IconDelete />} type="text"status="danger"onClick={() => remove(index)} />
            </Space>
          </Grid.Row>
        ))}
      </Card>
    )}
  </Form.List>
</Form.Item>
```

### Select

弹出框会被内容撑大，而默认情况下跟输入框等宽。

```tsx
<Select options={[/* ... */]} triggerProps={{ autoAlignPopupWidth: false, autoAlignPopupMinWidth: true }} />
```



## Table





## 数据输入

`Radio` `Switch` `Checkbox` 等跟 `Form.Item` 配合使用时要配置 `<Form.Item triggerPropName="checked">`


## 数据展示

### 气泡卡片 Popover

```tsx
// Popover 没反应
<Popover {...}>
  <Badge {...}></Badge>
</Popover>

// 中间加一层 div 就可以
<Popover {...}>
  <div><Badge {...}></Badge></div>
</Popover>
```




