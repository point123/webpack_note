<h1>webpack内部钩子</h1>

钩子的本质是事件,为了方便直接介入和控制编译过程,`webpack`把编译过程中触发的各类关键事件封装成事件接口暴露出来,这些接口被称为`hooks`

### Tapable
`Tapable`是`webpack`的核心工具,许多对象都扩展自`Tapable`类。

它暴露了许多`Hook`类,可用于为插件创建钩子(钩子的实例),钩子是一个抽象概念,只有通过创建实例才能使用钩子的功能

```javascript{4-13} title="index.js"
"use strict";

exports.__esModule = true;
exports.SyncHook = require("./SyncHook");
exports.SyncBailHook = require("./SyncBailHook");
exports.SyncWaterfallHook = require("./SyncWaterfallHook");
exports.SyncLoopHook = require("./SyncLoopHook");
exports.AsyncParallelHook = require("./AsyncParallelHook");
exports.AsyncParallelBailHook = require("./AsyncParallelBailHook");
exports.AsyncSeriesHook = require("./AsyncSeriesHook");
exports.AsyncSeriesBailHook = require("./AsyncSeriesBailHook");
exports.AsyncSeriesLoopHook = require("./AsyncSeriesLoopHook");
exports.AsyncSeriesWaterfallHook = require("./AsyncSeriesWaterfallHook");
exports.HookMap = require("./HookMap");
exports.MultiHook = require("./MultiHook");
```

每一种类型的`Hook`内都使用了`new Hook()`,而`Hook`类中实现了`tap`,`tapAsync`,`tapPromise`等方法,提供给插件来注入自定义构建步骤(注册事件,回调函数)

当到达特定事件点时,会调用某个类型的钩子,执行所有该类型钩子实例上通过`tap`,`tapAsync`,`AsyncPromise`注册的回调函数

### Hooks类型
#### 按照执行机制分类
* `Basic Hooks`
    名称中不包含`Waterfall`,`Bail`,`Loop`的`Hooks`,它仅仅执行钩子注册的事件,不关心每个被调用的函数的返回值
    ![1727167514997](image/1727167514997.png)
* `Waterfall Hooks`
    瀑布式钩子也执行每个注册的函数,但是它会把返回值传递给下一个函数
    ![1727167810151](image/1727167810151.png)
* `Bail Hooks`
    保险形钩子,当函数返回非`undefined`值时,将停止执行剩余的函数
    ![1727168017090](image/1727168017090.png)
* `Loop Hooks`
    循环钩子,任意一个函数返回非`undefined`值时,会立即从头开始重新执行所有函数,直到所有函数都返回`undefined`
    ![1727168201422](image/1727168201422.png)
#### 按照同步/异步分类
* `Sync`
    同步钩子注册的函数会同步执行,只能通过`tap()`注册函数,通过`call()`触发同步钩子的执行
* `AsyncSeries`
    `AsyncSeries`可以与同步(`tap()`)、基于回调`tapAsync()`、基于`Promise`(`tapPromise()`)的函数配合使用,它们依次调用每个异步方法;对应通过`call`,`callAsync`,`promise`三种方式触发注册的函数
* `AsyncParallel`
    `AsyncParallel`也可以与同步、基于回调、基于`Promise`的函数配合使用,它们并行运行每个异步方法;对应通过`call`,`callAsync`,`promise`三种方式触发注册的函数
![1727168790163](image/1727168790163.png)

### tap类型
* `tap`
* `tapAsync`
* `tapPromise`