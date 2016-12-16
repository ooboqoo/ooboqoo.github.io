# ANGULAR 模块 NGMODULE

## 用 forRoot 配置核心服务

Generally `forRoot` is used to add application/singleton services.

We should structure our modules this way: App-wide services in forRoot, and everything else in the NgModule.

```ts
@NgModule({
  providers: [ /* DONT ADD HERE */ ]
})
class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [ AuthService ]
    }
  }
}
```

The reasoning is that if you add the `AuthService` to the `providers` in the `@NgModule`, it's possible for more than one to be created if you import the `SharedModule` into other modules.

I'm not 100% clear on whether the service would be created when the `SharedModule` is imported into an eagerly loaded module, but the explanation that the docs mentioned was in regards to lazily loaded modules. When you lazily load a module, all the providers will get created.

For this reason, we add a (by convention) `forRoot` method to signify that the method should only be called for the root (app) module, while for other module it should just be imported normally.

```ts
@NgModule({
  imports: [SharedModule]
})
class FeatureModule {}

@NgModule({
  imports: [SharedModule.forRoot()]
})
class AppModule {}
```

