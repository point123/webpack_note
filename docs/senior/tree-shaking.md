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

### usedExports

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

`usedExports`设置为`true`,且当`minimize`为`true`,那么打包结果中将会删除未使用的代码
:::: code-group
::: code-group-item webpack.config.js
```javascript{4,5}
// ...
mode: "development",
optimization: {
    usedExports: true,
    minimize: true
}
```
:::
::: code-group-item index.bundle.js
```javascript{17-18}
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
而`usedExports`不设置或设置为`false`,`minimize`为`true`时,虽然代码被压缩,但是未使用的代码仍然存在于打包结果中
:::: code-group
::: code-group-item webpack.config.js
```javascript{4,5}
// ...
mode: "development",
optimization: {
    usedExports: false,
    minimize: true
}
```
:::
::: code-group-item index.bundle.js
```javascript{21-24}
// 原版是压缩过的,方便阅读格式化并删除部分内容
(self.webpackChunkwebpack_test=self.webpackChunkwebpack_test||[])
.push([
    ["index"],
    {
        "./src/css/main.css":(s,c,e)=>{e.r(c)},
        "./src/index.js":(s,c,e)=>{
            e.r(c),e("./src/css/main.css");
            var r=e("./src/js/math.js");
            e("./src/js/log.js"),
            console.log("hello world"),
            console.log(a.filter()),
            console.log((0,r.cube)(3))
        },
        "./src/js/log.js":(s,c,e)=>{
            function r(){return"Pixel"}
            e.r(c),e.d(c,{Pixel:()=>r}),
            console.log("这是一个副作用")
        },
        "./src/js/math.js":(s,c,e)=>{
            function r(s){return s**3}
            function n(s){return s*s}
            e.r(c),
            e.d(c,{cube:()=>r,square:()=>n})
        }
    },
    s=>{s(s.s="./src/index.js")}
]);
```
:::
::::

生产模式什么都不配置
```javascript{9}
(self.webpackChunkwebpack_test=self.webpackChunkwebpack_test||[])
.push([
    [57],
    {
        540:()=>{
            console.log("这是一个副作用"),
            console.log("hello world"),
            console.log(a.filter()),
            console.log(27)
        }
    },
    e=>{e(e.s=540)}
]);
```
生产模式 `usedExports`:`false`
```javascript
(self.webpackChunkwebpack_test=self.webpackChunkwebpack_test||[])
.push([
    [57],
    {
        540:(e,l,o)=>{
            o.r(l),
            console.log("这是一个副作用"),
            console.log("hello world"),
            console.log(a.filter()),
            console.log(27)
        }
    },
    e=>{e(e.s=540)}
]);
```
这里不符合预期,没有使用`usedExports`,但是仍然删除了,下面有解释

生产模式 `usedExports`:`false`, `minimize`: `false`
```javascript{13-15}
(self["webpackChunkwebpack_test"] = self["webpackChunkwebpack_test"] || [])
.push([
    [57],
    {
        540:((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            // ESM COMPAT FLAG
            __webpack_require__.r(__webpack_exports__);
            ;// CONCATENATED MODULE: ./src/js/math.js
            function cube(x) {
                return x ** 3;
            }

            function square(x) {
                return x * x;
            }
            ;// CONCATENATED MODULE: ./src/js/log.js
            console.log("这是一个副作用");

            function Pixel() {
                return "Pixel";
            }

            ;// CONCATENATED MODULE: ./src/index.js

            console.log('hello world');

            console.log(a.filter());

            console.log(cube(3));
        })

    },
    __webpack_require__ => { // webpackRuntimeModules
        var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
        var __webpack_exports__ = (__webpack_exec__(540));
    }
]);
```

生产模式 `minimize`: `false`

```javascript{11-13}
(self["webpackChunkwebpack_test"] = self["webpackChunkwebpack_test"] || [])
.push([
    [57],
    {
        540:(() => {
            ;// CONCATENATED MODULE: ./src/js/math.js
            function cube(x) {
                return x ** 3;
            }

            function square(x) {
                return x * x;
            }
            ;// CONCATENATED MODULE: ./src/js/log.js
            console.log("这是一个副作用");

            function Pixel() {
                return "Pixel";
            }

            ;// CONCATENATED MODULE: ./src/index.js

            console.log('hello world');

            console.log(a.filter());

            console.log(cube(3));
        })
    },
    __webpack_require__ => { // webpackRuntimeModules
        var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
        var __webpack_exports__ = (__webpack_exec__(540));
    }
]);
```

`usedExports`用于给未使用的模块成员做标记

删除压缩代码是通过`terser-webpack-plugin`来完成的,它由`minimize`控制,`minimize`在生产模式下,默认值为`true`

而`terser-webpack-plugin`通过`terser`来压缩删除代码

`terser`则使用配置项`unused`来删除未使用的代码,默认值为`true`即默认开启删除;

在多数情况下,配置之间的结合使用都是符合预期的

但是在生产模式下,当`usedExports`设置为`false`,`minimize`为`true`,且`minimizer`中`terser-webpack-plugin`中的配置项`unused`为true时进行打包,未使用的代码,上述为`square`函数,仍然被删除了

这是因为在生产模式下,`optimization.concatenateModules`默认值为`true`,它会将打包结果中每个模块都是一个函数变为尽量将多个模块合并输出到一个函数中,所以即使没有被`usedExports`标记为未使用的模块成员,但是被合并到一起,也会被`terser`删除

### sideEffects

`sideEffects`用于告诉`webpack`文件是否存在副作用或者哪些模块存在副作用

副作用: 模块导入或执行时会执行特殊行为不直接返回值的代码,如影响全局变量,IO操作的代码等

当`webpack`遇到没有副作用且没有被使用的模块时,会跳过该文件,即`sideEffects`是针对整个文件的,它不依赖于`terser`

`sideEffects`可以在`package.json`中配置,也可以在`webpack`配置文件中配置,默认情况下,`webpack`会假设模块是存在副作用的

`sideEffects`也可以在`webpack`配置文件中的`module.rule.sideEffects`中配置

新增一个`log.js`
:::: code-group
::: code-group-item log.js
```javascript
// 用这行代码模拟副作用
console.log("这是一个副作用");

export function Pixel() {
    return "Pixel";
}

```
:::
::: code-group-item index.js
```javascript
import "./css/main.css";
import { cube } from "./js/math";
import { Pixel } from "./js/log";

console.log('hello world');
console.log(a.filter());
console.log(cube(3));
```
:::
::::

当`package.json`中将`sideEffects`设置为`false`时,会默认所有模块都没有副作用,此时会删除未使用
的模块,包括`css`
```
dist
  |- index.bundle.js
  |- index.bundle.js.map
  |_ index.html
```
可以看到,`css`也被当做没有副作用而删除

且输出结果中不包含`log.js`的内容,无法搜索到`Pixel`函数
```javascript title="index.bundle.js"
"use strict";
(self["webpackChunkwebpack_test"] = self["webpackChunkwebpack_test"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _js_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/math */ "./src/js/math.js");




console.log('hello world');

console.log(a.filter());

console.log((0,_js_math__WEBPACK_IMPORTED_MODULE_0__.cube)(3));

/***/ }),

/***/ "./src/js/math.js":
/*!************************!*\
  !*** ./src/js/math.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
```

如果模块是有副作用的,那么可以将`sideEffects`设置为`flag`值,用以匹配含有副作用的模块

```json title="package.json"
"sideEffects": ["*.{css,less,scss,sass,styl}"],
```
再进行打包,样式文件就不会被删除了,如果想要让`log.js`不被删除,则只要添加到`sideEffects`中即可

在`module.rule.sideEffects`中配置
```javascript{7} title="webpack.common.js"
module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.css$/i,
                sideEffects: true,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            }
            // ...
        ]
    }
}
```
这样,这些样式文件也不会被删除
