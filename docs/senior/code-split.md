<h1>code solit</h1>

打包代码时会将所有`js`打包到一个文件中,体积太大;

如果只渲染首页,可以只加载首页的js文件,其他文件不应该加载

代码分割做了两件事:

* 1.分割文件
* 2.按需加载

### 多入口
新增入口文件
```
|- src
|   |-main.js
|   |_app.js
```

修改配置
```javascript title="webpack.config.js"
// ... 省略
module.exports = {
    // entry: "./src/main.js",
    entry: {
        index: "./src/index.js",
        app: "./src/app.js"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        // filename指定输出文件名,使用chunk的name作为输出名称
        // 打包的资源为chunk,输出的叫bundle
        filename: "[name].bundle.js",
        clean: true
    },
    // ... 省略
}
```

#### entry的值
* 一个字符串
    如`./src/app.js`,仅使用`app.js`作为一个入口文件,`chunk`名称为`main`
* 一个字符串数组
    如`["./src/main.js", "./src/app.js"]`,只有一个文件且`chunk`名称为`main`
* 一个对象,则使用每个`key`作为`chunk`名,对象的值可以为
    * 字符串
    * 字符串数组
    * 对象(descriptor)
        使用`import`指定入口文件
        使用`filename`指定输出,如`pages/app.js`将输出到`dist/pages/app.js`



### 提取重复代码

#### runtimeChunk
`runtimeChunk`控制`webpack`生成的运行时代码的处理方式

运行时代码包括`webpack`用来管理加载模块,模块间交互的代码,如处理模块依赖关系、执行模块加载、动态加载模块、处理异步加载

通常包括

1. 模块加载逻辑: 管理模块加载顺序,确保依赖关系处理正确
2. 模块缓存机制: 通过缓存机制,确保模块在首次加载后不会被重复加载
3. 模块执行上下文: 维护模块的执行环境,确保模块在正确的上下文中执行

`runtimeChunk`有几种不同的值

* `false`: 默认值,运行时代码会内联到入口文件,运行时代码和业务逻辑代码打包在同一个文件中
* `single`: 所有入口点共享一个运行时文件,这会生成一个单独的`runtime`文件,包含所有运行时代码
* `multiple`: 每个入口点都有自己独立的运行时`chunk`

对于多入口引用来说,配置为`single`是极为有用的

1. 它可以将运行时代码单独分离为一个`chunk`,其他`chunk`内容发送变化时,运行时代码不一定会改变,浏览器可以更好的缓存不变的运行时代码
2. 在多入口点的场景中,有可能每个入口文件依赖于同一个模块,如果运行时代码没有被正确管理,可能导致每个入口文件都有独立的运行时代码,这些代码会独立的加载和执行模块,模块可能会在每个入口点被实例化一次,意味着被加载和执行多次,导致多个独立的模块实例引发状态不同步问题

### 入口依赖

#### dependOn
当多个入口文件使用了相同的依赖时,可以使用`dependOn`将依赖提取到单独的`bundle`中共享

在以下示例中

入口`index.js`依赖了`log.js`和`math.js`

入口`app.js`依赖了`log.js`和`moduleB.js`

模块`logs.js`依赖了`util.js`

模块`util.js`依赖了`moduleA.js`

模块`math.js`依赖了`util.js`,`moduleA.js`,`moduleB.js`
![1724839244384](image/code-split/1724839244384.png)
:::: code-group
::: code-group-item index.js
```javascript
import { cube } from "./math.js"
import { Pixel } from "./log.js"

cube(3);
Pixel();
```
:::
::: code-group-item app.js
```javascript
import { Pixel } from "./js/log";
import { moduleBfuncA } from "./js/moduleB";

moduleBfuncA();
console.log("这是新增的入口");
Pixel();
```
::: 
::: code-group-item log.js
```javascript
import { commonFunc } from "./util";

console.log("这是一个副作用");
export function Pixel() {
    commonFunc();
    return "Pixel";
}

```
:::
::: code-group-item math.js
```javascript
import { commonFunc } from "./util";
import { moduleAFuncA } from "./moduleA";
import { moduleBfuncA } from "./moduleB";

export function cube(x) {
    return x ** 3;
}
commonFunc();
moduleAFuncA();
moduleBfuncA();
```
:::
::: code-group-item util.js
```javascript
import { moduleAFuncA } from "./moduleA";
moduleAFuncA();
export function commonFunc() {
    console.log("通用公共代码");
    
}
```
:::
::: code-group-item moduleA.js
```javascript
export function moduleAFuncA() {
    return "模块A方法A";
}
```
:::
::: code-group-item moduleB.js
```javascript
export function moduleBfuncA() {
    return "模块B方法A";
}
```
:::
::::
当没有配置`dependOn`时,每个`bundle`都会包含依赖的模块已经模块依赖的模块,存在重复

如: `index.js`和`app.js`都会打包进`log.js`

当配置`deppendOn`后
```javascript title="webpack.config.js"
module.exports = {
    // ...
    entry: {
        index: {
            path: "./src/index.js",
            dependOn: "common"
        },
        main: {
            path: "./src/app.js",
            dependOn: "common"
        },
        common: "./src/log.js"
    }
}
```
可以发现`log.js`的内容被单独打包到`common.bundle.js`中,而`index.bundle.js`和`app.bundle.js`中则引用`common.bindle.js`中的`log.js`

同时,`common.bundle.js`还包含了`util.js`和`moduleA.js`,其他模块也同样引用这些模块而不是在多个模块中重复生成

`webpack`会递归解析模块依赖链,如果某个模块被提取到共享`bundle`,该模块的所有依赖也都会被提取到同一个共享的`bundle`中
#### splitChunks

output中的filename是全局配置,entry中的filename可以理解为局部配置,可以覆盖全局配置;支持相同的占位符,output.filename默认值为`[name].js`