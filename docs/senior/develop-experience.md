<h1>提升开发体验</h1>

## SourceMap
### 概念
实际运行的代码是经过`webpack`编译的,例如
```javascript
"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkwebpack_test"] = self["webpackChunkwebpack_test"] || []).push([["index"],{

/***/ "./src/css/main.css":
/*!**************************!*\
  !*** ./src/css/main.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://webpack_test/./src/css/main.css?");

/***/ }),
}]);
```
所有`css`和`js`合并成了一个文件,并且多了很多代码。如果代码运行出错,提示代码错误位置很不友好,随着代码量增多,很难发现错误出现在哪里
### 原因
`SourceMap`(源代码映射)是一个用来生成源码与构建后代码映射的文件的方案

它会生成`.map`文件,里面包含源码与构建后代码每行每列的映射关系。当构建后的代码出错时,通过`map`文件从构建后的代码的错误位置找到映射的源码出错位置,从而让浏览器提示源码文件错误位置,帮助更快找到错误根源

### 使用
在`webpack`配置文件中通过`devtool`来配置`SourceMap`,它有许多值,这里介绍几种

`eval`
描述: 每个模块被包装在`eval()`中,且都有`//# sourceURL`。生成的数据包含模块名称
优点: 构建速度非常快
缺点: 不支持真实的`sourceMap`,映射到转换后代码而非真实代码,不能正确显示行数

`cheap-module-source-map`

优点: 打包编译速度快

缺点: 只包含行映射,不包含列映射

`source-map`

优点: 包含行和列映射

缺点: 打包编译速度慢