# 表单


受控模式和非受控模式的适用场景

| feature                                   | uncontrolled | controlled
|-------------------------------------------|:------------:|:---------:
| one-time value retrieval (e.g. on submit) |  ✅ | ✅
| validating on submit                      |  ✅ | ✅
| instant field validation                  |  ❌ | ✅
| conditionally disabling submit button     |  ❌ | ✅
| enforcing input format                    |  ❌ | ✅
| several inputs for one piece of data      |  ❌ | ✅
| dynamic inputs                            |  ❌ | ✅


Element                     | Value property         | Change callback | New value in the callback
----------------------------|------------------------|------------|--------------------------------
`<input type="text" />`     | `value="string"`       | `onChange` | `event.target.value`
`<input type="checkbox" />` | `checked={boolean}`    | `onChange` | `event.target.checked`
`<input type="radio" />`    | `checked={boolean}`    | `onChange` | `event.target.checked`
`<textarea />`              | `value="string"`       | `onChange` | `event.target.value`
`<select />`                | `value="option value"` | `onChange` | `event.target.value`


## 受控模式

> 表单数据由 React 组件来管理，用户输入的值会先改变组件的 state 再 push 到 DOM 显示。

在 HTML 中，表单元素（如 `<input>` `<textarea>` 和 `<select>`）通常自己维护 state，并根据用户输入进行更新。而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 `setState()` 来更新。

我们可以把两者结合起来，使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

### 特殊表单项

#### `textarea`

```html
<textarea>
  你好， 这是在 text area 里的文本
</textarea>
```

```jsx
const [text, setText] = useState('');
<textarea value={text} onChange={setText} />
```

#### `select`

```html
<select>
  <option selected value="coconut">椰子</option>
  <option value="mango">芒果</option>
</select>
```

```jsx
const [value, setValue] = useState();
<select value={value} onChange={setValue}>
  <option value="coconut">椰子</option>
  <option value="mango">芒果</option>
</select>

// 多选的用法
<select multiple={true} value={['B', 'C']}> ... </select>
```

#### `input type="file"`

在 React 中，`<input type="file" />` 始终是一个非受控组件，因为它的值只能由用户设置，而不能通过代码控制。

### 处理多个输入

当需要处理多个 `input` 元素时，我们可以给每个元素添加 `name` 属性，并让处理函数根据 `event.target.name` 的值选择要执行的操作。

```jsx
export const Demo = () => {
  const [formData, setFormData] = useState({foo: true, bar: 1});
  const handleInputChange = ({target}) => {
    const name = target.name;
    const value = name === 'foo' ? target.checked : target.value;
    setFormData({...formData, [name]: value});
  };
  return (
    <form>
      <label>
        参与:
        <input name="foo" type="checkbox" checked={formData.foo} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        来宾人数:
        <input name="bar" type="number" value={formData.bar} onChange={handleInputChange} />
      </label>
    </form>
  );
}
```

### 受控输入空值

在受控组件上指定 value 的 prop 会阻止用户更改输入。如果你指定了 value，但输入仍可编辑，则可能是你意外地将 value 设置为 `undefined` 或 `null`。

下面的代码演示了这一点。（输入最初被锁定，但在短时间延迟后变为可编辑。）

```jsx
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 2000);
```


## 非受控模式

> 表单数据交由原生 DOM 处理，React 只在需要时去 DOM 表单中 pull 数据。

因为非受控组件将真实数据储存在 DOM 节点中，所以在使用非受控组件时，有时候反而更容易同时集成 React 和非 React 代码。如果你不介意代码美观性，并且希望快速编写代码，使用非受控组件往往可以减少你的代码量。否则，你应该使用受控组件。

有时使用受控组件会很麻烦，因为你需要为数据变化的每种方式都编写事件处理函数，并通过一个 React 组件传递所有的输入 state。当你将之前的代码库转换为 React 或将 React 应用程序与非 React 库集成时，这可能会令人厌烦。在这些情况下，你可能希望使用非受控组件, 这是实现输入表单的另一种方式。

### 默认值

使用 `defaultValue` 而非 `value`

```html
<input type="text" defaultValue="Bob" ref={this.input} />  <!-- defaultValue -->
<input type="checkbox" defaultChecked />                   <!-- defaultChecked -->
<input type="radio" defaultChecked />
<select defaultValue="hello">...</select>
<textarea defaultValue="world" />
```

## AntD V3

### 在函数组件中使用

Form 相关 API 可直接通过在 `FormComponentProps` 上 F12 进入 antd/lib/form/Form.d.ts 查看。

```tsx
import Form, { FormComponentProps } from 'antd/lib/form/Form';

interface NoticeFormProps extends FormComponentProps {
  notice?: Notice;
}

// 定义
const NoticeForm = Form.create<NoticeFormProps>()(
  forwardRef<any, NoticeFormProps>(({form, notice}, ref) => {
    const { getFieldDecorator } = form;
    useImperativehandle(ref, () => ({ form }));
    return (
      <Form layout="inline">
        <Form.Item label="标题" required>
          {
            getFieldDecorator('title', {
              rules: [{required: true, message: '标题为必填项'}],
              initialValue: notice?.title || '更新公告'
            })(
              <Input placeholder="请输入标题" />
            )
          }
        </Form.Item>
      </Form>
    );
  })
);

// 在元素中使用
<NoticeForm wrappedComponentRef={formRef} notice={current} />

// 在函数中调用
const form = formRef.current.form;
form.validateFields();  // ...
```

### 自定义表单控件

自定义或第三方的表单控件，也可以与 Form 组件一起使用，只要该组件遵循以下的约定：

* 提供受控属性 `value` 或其它的 `valuePropName` 的值相同名的属性
* 提供 `onChange` 事件或 `trigger` 的值同名的事件
* 支持 ref

### 自行处理表单数据

使用 `Form.create` 处理后的表单具有自动收集数据并校验的功能，但如果您不需要这个功能，可以选择不使用 `Form.create` 并自行处理数据。

我们提供了 `validateStatus` `help` `hasFeedback` 等属性，你可以不需要使用 `Form.create` 和 `getFieldDecorator`，自己定义校验的时机和内容。

* `validateStatus` 校验状态，可选 'success' 'warning' 'error' 'validating'
* `hasFeedback` 用于给输入框添加反馈图标
* `help` 设置校验文案

```jsx
<Form>
  <Form.Item label="Warning" validateStatus="warning">
    <Input placeholder="Warning" id="warning" />
  </Form.Item>
  <Form.Item label="Validating" validateStatus="validating" help="being validated ...">
    <Input placeholder="being validated" id="validating" />
  </Form.Item>
</Form>
```

### 表单联动

使用 `setFieldsValue` 来动态设置其它控件的值。



## ByteD

### 受控模式

不再推荐直接使用 `Form.Control` 来包裹组件，可以在 `Form.Item` 传入 `field` 属性，即可使控件变为受控组件。

* 受控模式会接管表单控件，会自动给表单控件添加相应的 `trigger` (默认是 onChange)，并且会自动收集表单数据并进行表单验证
* 如果表单内部控件存在联动关系，建议通过 `initialValues` 设置表单字段初始值

```jsx
function Demo() {
  const [form] = Form.useForm();
  return (
    <Form form={form} initialValues={{ name: '测试' }}>
      <Form.Item label="姓名" field="name" rules={[{ required: true }]}>
        <Input placeholder="please enter..." />
      </Form.Item>
    </Form>
  );
}
```

```html
// 低版本的用法，不要再使用
import { Form, Input } from '...';
<Form ref={ ref => this.form = ref }>
  <Form.Item label="姓名" required extra="请输入长度在 1～10 的名字">
    <Form.Control
      field="name"
      rules={[
        { required: true },
        { maxLength: 10, message: '最多可以输入十个字' }
      ]}>
      <Input placeholder="请输入姓名" />
    </Form.Control>
  </Form.Item>
</Form>
```

### 动态增减表单项

```jsx
<Form
  initialValues={{
    users: [{ name: 'Jhon', age: 20 }, { name: 'Joe', age: 23 }],
  }}
>
  <Form.List filed="users">
    {
      (fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <Grid.Row flex key={field.key}>
                <Form.Item noStyle key={field.key + '.name'} field={field.field + '.name'}>
                  <Input placeholder="姓名">
                </Form.Item>
                <Form.Item noStyle key={field.key + '.age'} field={field.field + '.age'}>
                  <Input placeholder="年龄">
                </Form.Item>
                <Button type="danger" onClick={() => remove(index)}>删除</Button>
              <Grid.Row>
            ))}
            <Grid.Row>
              <Button onClick={add}>添加用户</Button>
            </Grid.Row>
          </div>
        );
      }
    }
  </Form.List>
</Form>
```


### 表单联动

可以通过 `shouldUpdate` 实现控件间的联动






