<h1>tree-shaking</h1>

当引用了第三方工具函数库或组件库或者定义了一些工具库

实际上可能只使用上了一小部分的功能

`Tree-shaking`:

是一个术语,用于描述移除`javascript`中没有使用的代码,这依赖于`ES Module`的静态结构特性,因为模块的引入和导出在编译时已经可以确定,`Webpack`可以在构建时通过静态分析来识别未使用的代码,在`webpack`中,默认启用`Tree-shaking`,在开发模式下,会找出所有未使用的代码;在生产模式下,会找出所有未使用的代码,并移除它们并启用更多优化

`usedExports`:

是`Tree-shaking`的具体实现方式之一,为每个模块导出的每个成员标记一个标志,指示该成员是否被使用,在模块情况下,它是开启的,可以通过设置`optimization.useExports`为`true`或者`false`来控制它,如果设置为`false`,在开发模式下,能够看到没有标记;但是在生产模式下,仍然会移除未使用的代码
:::: code-group
::: code-group-item useEffecet-false-dev-bundle.js
```javascript{}
// 格式化后
((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

})
```
:::
::: code-group-item useEffect-true-dev-bundle.js
```javascript
// 格式化后

```
:::
:::: code-group

