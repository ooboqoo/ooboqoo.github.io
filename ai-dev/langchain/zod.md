# Zod

Zod 的关键贡献是，用一份声明 schema 同时驱动
* 在运行时验证数据是否合法
* 在编译时自动推导出 TypeScript 类型


Zod 与 TypeScript 的职责划分

| 层面              | 责任主体     | 说明
|------------------|-------------|-------------------
类型推断（静态检查）  | TypeScript  | 在编译期进行类型推断与检查（不影响运行时）。
数据验证（运行时检查）| Zod         | 在运行时根据定义的 schema 对数据进行验证，抛出错误或返回解析结果。


## Defining schemas

https://zod.dev/api

这部分直接跳到官网查看吧。

### Primitives

```ts
import * as z from "zod";

// primitive types
z.string();
z.number();
z.bigint();
z.boolean();
z.symbol();
z.undefined();
z.null();
```

### Literals & Template literals

```ts
z.literal(["red", "green", "blue"]);
const schema = z.templateLiteral([ "hello, ", z.string(), "!" ]); // `hello, ${string}!`
```

### Strings & Common string formats

```ts
// string validation
z.string().max(5);
z.string().min(5);
z.string().length(5);
z.string().regex(/^[a-z]+$/);
z.string().startsWith("aaa");
z.string().endsWith("zzz");
z.string().includes("---");
z.string().uppercase();        // 必须全大写
z.string().lowercase();

// string transform
z.string().trim(); // trim whitespace
z.string().toLowerCase(); // toLowerCase
z.string().toUpperCase(); // toUpperCase
z.string().normalize(); // normalize unicode characters

// common string formats
z.email();
z.uuid();
z.url();
z.httpUrl();       // http or https URLs only
z.hostname();
z.emoji();         // validates a single emoji character
z.base64();
z.base64url();
z.hex();
z.jwt();
z.nanoid();
z.cuid();
z.cuid2();
z.ulid();
z.ipv4();
z.ipv6();
z.cidrv4();        // ipv4 CIDR block
z.cidrv6();        // ipv6 CIDR block
z.hash("sha256");  // or "sha1", "sha384", "sha512", "md5"
z.iso.date();
z.iso.time();
z.iso.datetime();
z.iso.duration();
```

### Numbers

```ts
z.number().gt(5);
z.number().gte(5);                     // alias .min(5)
z.number().lt(5);
z.number().lte(5);                     // alias .max(5)
z.number().positive();       
z.number().nonnegative();    
z.number().negative(); 
z.number().nonpositive(); 
z.number().multipleOf(5);              // alias .step(5)  // 用于验证数字是否为指定值的倍数
```

### Dates

```ts
// z.date() only validate `Date` instances.
z.date().safeParse(new Date()); // success: true
z.date().safeParse("2022-01-12T06:15:00.000Z"); // success: false

// Zod provides a handful of date-specific validations.
z.date().min(new Date("1900-01-01"), { error: "Too old!" });
z.date().max(new Date(), { error: "Too young!" });
```

### Enums

```ts
enum Fish {
  Salmon = 0,
  Tuna = 1
}
 
const FishEnum = z.enum(Fish);
FishEnum.parse(Fish.Salmon); // => ✅
FishEnum.parse(0); // => ✅
```

### Stringbools

```ts
const strbool = z.stringbool();

strbool.parse("true")         // => true
strbool.parse("1")            // => true
strbool.parse("yes")          // => true
strbool.parse("on")           // => true
strbool.parse("y")            // => true
strbool.parse("enabled")      // => true

strbool.parse("false");       // => false
strbool.parse("0");           // => false
strbool.parse("no");          // => false
strbool.parse("off");         // => false
strbool.parse("n");           // => false
strbool.parse("disabled");    // => false

strbool.parse(/* anything else */); // ZodError<[{ code: "invalid_value" }]>
```

### Optionals

```ts
z.optional(z.literal("yoda")); // or z.literal("yoda").optional()
```

### Nullables

```ts
z.nullable(z.literal("yoda")); // or z.literal("yoda").nullable()
```

### Nullish

To make a schema nullish (both optional and nullable):

```ts
const nullishYoda = z.nullish(z.literal("yoda"));
```

### Objects

三者的差异在于对于「未定义属性」的处理上
* `z.object()` - 运行未定义属性存在，但 parse 时会忽略这些属性
* `z.strictObject()` - 不允许未定义的属性存在，存在就报错
* `z.looseObject()` - 允许未定义属性存在，且 parse 时会保留这些属性

```ts
// all properties are required by default
// by default, unrecognized keys are stripped from the parsed result
const Person = z.object({
  name: z.string(),
  age: z.number().optional(),
});

type Person = z.infer<typeof Person>;
// => { name: string; age?: number; }
```

```ts
// strictObject throws an error when unknown keys are found
const StrictDog = z.strictObject({ name: z.string() });
StrictDog.parse({ name: "Yeller", extraKey: true }); // ❌ throws

// looseObject allows unknown keys to pass through
const LooseDog = z.looseObject({ name: z.string() });
looseDog.parse({ name: "Yeller", extraKey: true }); // => { name: "Yeller", extraKey: true }
```

```ts
.catchall()   // To define a catchall schema that will be used to validate any unrecognized keys
.shape        // To access the internal schemas
.keyof()      // To create a ZodEnum schema from the keys of an object schema
.extend()     // To add additional fields to an object schema
.safeExtend() // it won't let you overwrite an existing properly with a non-assignable schema
.pick()       // To pick certain keys
.omit()       // To omit certain keys
.partial()    // 
.required()   // 
```

### Arrays

```ts
z.array(z.string()).min(5); // must contain 5 or more items
z.array(z.string()).max(5); // must contain 5 or fewer items
z.array(z.string()).length(5); // must contain 5 items exactly
```

### Tuples

```ts
const MyTuple = z.tuple([z.string(), z.number(), z.boolean()]);
type MyTuple = z.infer<typeof MyTuple>; // [string, number, boolean]
````

### Unions

```ts
const stringOrNumber = z.union([z.string(), z.number()]); // string | number
```

### Discriminated unions

```ts
const MyResult = z.discriminatedUnion("status", [
  z.object({ status: z.literal("success"), data: z.string() }),
  z.object({ status: z.literal("failed"), error: z.string() }),
]);
```

### Records

```ts
const IdCache = z.record(z.string(), z.string());
type IdCache = z.infer<typeof IdCache>; // Record<string, string>
```

### Maps

```ts
const StringNumberMap = z.map(z.string(), z.number());
type StringNumberMap = z.infer<typeof StringNumberMap>; // Map<string, number>
```

### Sets

```ts
const NumberSet = z.set(z.number());
type NumberSet = z.infer<typeof NumberSet>; // Set<number>
```

### instanceof

```ts
class Test {
  name: string;
}
const TestSchema = z.instanceof(Test);

TestSchema.parse(new Test()); // ✅
TestSchema.parse("whatever"); // ❌
```

### Property

```ts
const blobSchema = z.instanceof(URL).check(
  z.property("protocol", z.literal("https:" as string, "Only HTTPS allowed"))
);

blobSchema.parse(new URL("https://example.com")); // ✅
blobSchema.parse(new URL("http://example.com")); // ❌
```

### Refinements

### Codecs

### Pipes

### Transforms

### Defaults

```ts
const defaultTuna = z.string().default("tuna");
defaultTuna.parse(undefined); // => "tuna"
````

### Prefaults

```ts
const schema = z.string().transform(val => val.length).default(0);
schema.parse(undefined); // => 0

z.string().transform(val => val.length).prefault("tuna");
schema.parse(undefined); // => 4
````

### Catch

### Braned types

### Readonly

### JSON

### Functions

### Custom



## Basic usage

```ts
import * as z from "zod";
 
const User = z.object({
  name: z.string(),
});
 
// some untrusted data...
const input = { /* stuff */ };
 
// the parsed result is validated and type safe!
const data = User.parse(input);
 
// so you can use it with confidence :)
console.log(data.name);
```

### Handling errors

```ts
try {
  Player.parse({ username: 42, xp: "100" });
} catch(error){
  if(error instanceof z.ZodError){
    error.issues; 
    /* [
      {
        expected: 'string',
        code: 'invalid_type',
        path: [ 'username' ],
        message: 'Invalid input: expected string'
      },
      {
        expected: 'number',
        code: 'invalid_type',
        path: [ 'xp' ],
        message: 'Invalid input: expected number'
      }
    ] */
  }
}
```

To avoid a `try/catch` block, you can use the `.safeParse()` method to get back a plain result object containing either the successfully parsed data or a `ZodError`.

```ts
const result = Player.safeParse({ username: 42, xp: "100" });
if (!result.success) {
  result.error;   // ZodError instance
} else {
  result.data;    // { username: string; xp: number }
}
```

```ts
// safeParse 源码
export type ZodSafeParseResult<T> = ZodSafeParseSuccess<T> | ZodSafeParseError<T>;
export type ZodSafeParseSuccess<T> = {
    success: true;
    data: T;
    error?: never;
};
export type ZodSafeParseError<T> = {
    success: false;
    data?: never;
    error: ZodError<T>;
};
```

### Inferring types

Zod infers a *static type* from your schema definitions. You can extract this type with the z.infer<> utility and use it however you like.

```ts
const Player = z.object({ 
  username: z.string(),
  xp: z.number()
});
 
// extract the inferred type
type Player = z.infer<typeof Player>;
 
// use it in your code
const player: Player = { username: "billie", xp: 100 };
```

In some cases, the input & output types of a schema can diverge. For instance, the .transform() API can convert the input from one type to another. In these cases, you can extract the input and output types independently:

```ts
const mySchema = z.string().transform((val) => val.length);
 
type MySchemaIn = z.input<typeof mySchema>;
// => string
 
type MySchemaOut = z.output<typeof mySchema>; // equivalent to z.infer<typeof mySchema>
// number
```

## 核心机制：类型推导 Type Inference

假设我们写：

```ts
import * as z from "zod"

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email().optional(),
})
```

Zod 通过 z.infer 自动推导出 TypeScript 类型：

```ts
type User = z.infer<typeof UserSchema>
```

这个 User 类型等价于：

```ts
type User = {
  id: number
  name: string
  email?: string
}
```

### 为什么能推导

因为每个 Zod schema 都带有一个 泛型参数，描述“该 schema 对应的 TypeScript 类型”。

源码里（简化版）：

```ts
class ZodType<TOutput, TDef = any> {
  _output: TOutput
}
```

比如 z.string() 的定义大致是：

```ts
declare const z: {
  string(): ZodString<string>
}
```

`ZodString` 继承自 `ZodType<string>`，所以 TypeScript 能从实例中“提取出”泛型参数 string。

`z.infer` 实际上就是这样定义的类型辅助工具：

```ts
type infer<T extends ZodType<any>> = T["_output"];
```

所以当你写 `z.infer<typeof schema>` 时，TS 会去取出 schema 的 `_output` 类型参数。

```ts
// V4 源码
export type output<T> = T extends { _zod: { output: any } } ? T["_zod"]["output"] : unknown;
export type { output as infer };

// core.ts
export type $ZodLooseShape = Record<string, any>;
// schemas.ts
export function object<T extends core.$ZodLooseShape = Record<never, SomeType>>(
  shape?: T,
  params?: string | core.$ZodObjectParams
): ZodMiniObject<T, core.$strip> {
  const def: core.$ZodObjectDef = {
    type: "object",
    shape: shape ?? {},
    ...util.normalizeParams(params),
  };
  return new ZodMiniObject(def) as any;
}

// 使用
import * as z from 'zod'
const contextSchema = z.object({ user_name: z.string() })
type TContext = z.infer<typeof contextSchema>; // type TContext = { user_name: string; }
```


## Zod Mini

This more functional API makes it easier for bundlers to tree-shake the APIs you don't use. While *regular Zod is still recommended for the majority of use cases*, any projects with uncommonly strict bundle size constraints should consider Zod Mini.


## JSON Schema

https://json-schema.org/

```ts
const schema = z.object({
  name: z.string(),
  age: z.number(),
});
 
z.toJSONSchema(schema)
// => {
//   type: 'object',
//   properties: { name: { type: 'string' }, age: { type: 'number' } },
//   required: [ 'name', 'age' ],
//   additionalProperties: false,
// }
```


