<h1>tree-shaking</h1>

当引用了第三方工具函数库或组件库或者定义了一些工具库

实际上可能只使用上了一小部分的功能

`Tree-shaking`:

是一个术语,用于描述移除`javascript`中没有使用的代码,这依赖于`ES Module`的静态结构特性,因为模块的引入和导出在编译时已经可以确定,`Webpack`可以在构建时通过静态分析来识别未使用的代码,在`webpack`中,默认启用`Tree-shaking`,在开发模式下,会找出所有未使用的代码;在生产模式下,会找出所有未使用的代码,并移除它们并启用更多优化

### 配置项默认值
```javascript title="webpack/lib/config/default.js"
// ...
const development = mode === "development";
const production = mode === "production" || !mode;
// ...
D(optimization, "providedExports", true);
// 依赖于providedExports
D(optimization, "usedExports", production);
// ...
// 依赖于usedExports和providedExports
D(optimization, "concatenateModules", production);
// ...
D(optimization, "minimize", production);
```
即:

`providedExports`默认值为`true`

`usedExports`在生产模式下默认值为`true`,在开发模式下默认值为`false`

`minimize`在生产模式下默认值为`true`,在开发模式下默认值为`false`

`usedExports`仅负责标记,删除代码的功能是依赖`terser-webpack-plugin`完成的,它可以通过`minimize`来配置

### usedExports:

是`Tree-shaking`的具体实现方式之一,为每个模块导出的每个成员标记一个标志,指示该成员是否被使用

如果该成员没有被使用,那么打包结果就会添加标记`/* unused harmony export xxx */`

可以通过设置`optimization.useExports`为`true`或者`false`来控制它

在开发模式下:

如果设置为不设置或设置为`false`,由于`minimize`默认为`false`,所以打包结果不会添加未使用标记

:::: code-group
::: code-group-item math.js
```javascript
export function cube(x) {
    return x ** 3;
}

export function square(x) {
    return x * x;
}
```
:::
::: code-group-item index.js
```javascript
import { cube } from "./js/math";
console.log(cube(3));
```
:::
::: code-group-item webpack.config.js
```javascript
// ...
mode: "development",
```
:::
::: code-group-item index.bundle.js
```javascript{7}
// ...
 ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cube: () => (/* binding */ cube),
/* harmony export */   square: () => (/* binding */ square)
/* harmony export */ });
function cube(x) {
    return x ** 3;
}

function square(x) {
    return x * x;
}

})
```
:::
::::

如果设置为`true`,由于`minimize`默认为`false`,所以打包结果会添加未使用标记,但不会删除代码

:::: code-group
::: code-group-item math.js
```javascript
export function cube(x) {
    return x ** 3;
}

export function square(x) {
    return x * x;
}
```
:::
::: code-group-item index.js
```javascript
import { cube } from "./js/math";
console.log(cube(3));
```
:::
::: code-group-item webpack.config.js
```javascript{4}
// ...
mode: "development",
optimization: {
    usedExports: true
}
```
:::
::: code-group-item index.bundle.js
```javascript{7}
// ...
((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cube: () => (/* binding */ cube)
/* harmony export */ });
/* unused harmony export square */
function cube(x) {
    return x ** 3;
}

function square(x) {
    return x * x;
}

})
```
:::
::::

而将`usedExports`设置为`true`,且当`minimize`为`true`,那么打包结果中将会删除未使用的代码,而`minimize`为`false`时,虽然代码被压缩,但是未使用的代码仍然存在于打包结果中
:::: code-group
::: code-group-item webpack.config.js
```javascript
// ...
mode: "development",
optimization: {
    usedExports: true,
    minimize: true
}
```
:::
::: code-group-item index.bundle.js
```javascript
// 原版是压缩过的,方便阅读格式化并删除部分内容
(self.webpackChunkwebpack_test=self.webpackChunkwebpack_test||[])
.push([
    ["index"],
    {
        "./src/css/main.css":()=>{},
        "./src/index.js":(s,c,e)=>{
            e("./src/css/main.css");
            var o=e("./src/js/math.js");
            e("./src/js/log.js"),
            console.log("hello world"),
            console.log(a.filter()),
            console.log((0,o.cube)(3))
        },
        "./src/js/log.js":(s,c,e)=>{console.log("这是一个副作用")},
        "./src/js/math.js":(s,c,e)=>{
            function o(s){return s**3}
            e.d(c,{cube:()=>o})
        }
    },
    s=>{s(s.s="./src/index.js")}
]);
```
:::
::::
