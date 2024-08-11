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

其中,适合表示该值对生产模式下的构建是否有意义,当对用户体验产生负面影响时(如性能问题,文件大小,安全隐患如暴露源码),通常为不适合

* `none` | false

    **适合生产模式**

    **描述**: 不生成`sourceMap`,推荐在生产环境需要最好性能的情况下使用

    **优点**: 构建速度非常快

    **缺点**: 不生成`sourceMap`,调试困难

* `eval` 

    **不适合生产模式**

    **描述**: 每个模块被包装在`eval()`中,且都有`//# sourceURL`。生成的数据包含模块名称,推荐在开发环境需要最好性能的情况下使用

    **优点**: 构建速度非常快

    **缺点**: 不支持真实的`sourceMap`,映射到转换后代码而非真实代码,不能正确显示行数

* `eval-source-map`

    **不适合生产模式**

    **描述**: 每个模块被包装在`eval()`中,生成完整的`sourceMap`,并将`sourceMap`作为`DATA URL`附加在`eval()`中,推荐在开发环境需要高质量的`sourceMap`情况下使用

    **优点**: 生成完整的`sourceMap`,可以正确显示行数和列数

    **缺点**: 构建速度慢

* `eval-cheap-source-map`

  **不适合生产模式**

  **描述**: 类似`eval-source-map`,每个模块使用`eval()`执行,不包含列映射,忽略源自`loader`的`source map`,仅显示转译后代码,在开发模式下权衡选择

  **优点**: 速度较快

  **缺点**: 不包含列信息,无法正确显示行数

* `eval-cheap-module-source-map`

  **不适合生产模式**

  **描述**: 类似`eval-cheap-source-map`,会包含`loader`的`source map`,但是`loader`的`source map`会简化为每行一个映射

  **优点**: 速度适中,调试体验良好

  **缺点**: 生成的`source map`体积较大

* `source-map`
 
  **适合生产模式** (应该将服务器配置为禁止普通用户访问`source map`)

  **描述**: 整个`souce map`作为一个单独的文件生成。为`bundle`添加了一个引用注释,方便开发工具找到,推荐在生产环境中需要高质量`source map`情况下使用

  **优点**: 生成完整的`source map`,可以正确显示行数和列数

  **缺点**: 构建速度慢,调试加载时间长,需要谨慎使用

* `hidden-source-map`

  **适合生产模式** (不应将`source map`文件部署到web服务器 而是只将其用于错误报告工具)
  
  **描述**: 与`source-map`相同，但不会为`bundle`添加引用注释,只想`source map`映射那些源自错误报告的错误堆栈跟踪信息,但不想为浏览器开发工具暴露`source map`情况下  很有用
  
  **优点**: 出现错误时仍能通过`source map`定位问题
  
  **缺点**: 调试时无法直接看到源代码,调试体验较差,构建速度非常慢

* `nosources-source-map`

  **适合生产模式**

  **描述**: 创建的`source map`不包含`sourcesContent`(源代码内容),可以用来映射客户端上的堆栈跟踪而无须暴露所有的源代码

  **优点**: 提供调试信息的同时保护源代码隐私,仍然会暴露反编译后的文件名和结构,但它不会暴露原始代码

  **缺点**: 构建速度非常慢,调试时无法直接看到源代码,只能看到错误定位

<br/>

以下选项对于开发模式和生产模式并不理想,在特定场景下需要,如第三方工具
* `inline-source-map` 

  **描述**: 生成完整的`source map`文件，并将`source map`的URL附加到编译后的代码文件中(`source map`转换为`DataUrl`后添加到`bundle`中)

  **优点**: 提供完整的`source map`

  **缺点**: 构建速度慢,调试加载时间较长

* `cheap-source-map`

  **描述**: 生成没有列映射(column mapping)的`source map`,并且忽略`loader`的`source map`

  **优点**: 比`source map`更快,适合需要调试但不需要精确列信息的场景

  **缺点**: 调试时无法看到精确的列信息,复杂代码调试体验不如`source-map`

* `inline-cheap-source-map`

  **描述**: 类似`cheap-source-map`,但是`source map`转换为`DataUrl`后添加到`bundle`中

* `cheap-module-source-map`

  **描述**: 类似于`cheap-source-map`,但会包含`loader`的`source map`,将`loader`的`source map`简化为每行一个映射(mapping)

  **优点**: 提供更精确的调试信息,适合需要调试复杂代码的场景

  **缺点**: 构建速度略慢于`cheap-source-map`,只包含行映射,不包含列映射

* `inline-cheap-module-source-map`

  **描述**: 类似`cheap-module-source-map`,但是`source map`转换为`DataUrl`后添加到`bundle`中
