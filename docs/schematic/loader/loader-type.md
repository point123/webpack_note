<h1>loader的分类</h1>

`loader`本质上就是导出为函数的`javascript`模块,`loader runner`会调用此函数,将上一个`loader`产生的结果或资源文件传入

函数中的`this`作为上下文会被`webpack`填充,并且`loader runner`中包含一些实用方法,如使`loader`的调用变成异步

启始的`loader`只有一个入参: 资源文件的内容。`compiler`预取得到最后一个`loader`产生的处理结果,这个结果应该未`String`或`Buffer`(能够被转换为`String`类型),代表模块的`js`源码

1. 同步loader
```javascript
module.exports = function(content, map, meta) {
    return content;
}
```
使用`callback`替换`return`更好,它允许传递多个参数而不仅仅是`content`

`callback`接收四个参数

第一个参数表示错误,如果没有错误则传递`null`,必须为`Error`或`null`

第二个参数是一个`String`或`Buffer`

第三个参数是可选的,如果传递,则必须为一个可以被解析的`source map`

第四个参数是可选的,它会被`webpack`忽略,可以是任何值,如元数据

使用`callback`则不能返回其他值(即`return;`或`return undefined`函数默认返回值)
```javascript
module.exports = function(content, map, meta) {
    this.callback(null, content, map, meta);
}
```
2. 异步loader
```javascript
module.exports = function(content, map, meta) {
    const callback = this.async();
    setTimeout(() => {
        callback(null, content, map, meta);
    }, 1000); 
}
```
对于异步`loader`,必须使用`this.async()`获取`callback`,并在异步操作的处理函数中使用`callback`

必须在异步操作前使用`this.async()`获取`callback`,它告诉`loader-runner`这个`loader`将会异步地回调
3. Raw loader
```javascript
module.exports = function(content, map, meta) {
    console.log(content);
    this.callback(null, content, map, meta);
}

module.exports.raw = true;
```
默认情况下,资源文件会被转化为`UTF-8`字符串,然后传递给`loader`

设置`raw`为`true`,`loader`可以接收原始的`buffer`

在每个`loader`之间都可以用`string`或`buffer`的形式传递处理结果,`compiler`会相互转换

也可以写成如下格式
```javascript
function rawLoader(content, map, meta) {
    return content;
}

rawLoader.raw = true;

module.exports = rawLoader;
```
因为`function`也是一个对象,能够添加属性并且通过属性名访问
```javascript
function a () {
    return 1;
}

a.test = 2;

console.log(a.test); // 输出2
```
而`module.exports`默认导出一个空对象,使用`module.exports = [value]`会将覆盖导出的空对象

也可以使用`module.exports.[name] = [value]`给导出的空对象添加属性

`exports`则是一个简写,可以理解为`const exports = module.exports`,所以使用`exports.[name] = [value]`相当于给默认导出的空对象赋值,前提是没有改变`module.exports`指向原本的空对象

也不能使用`exports = [value]`,这相当于将`[value]`赋值给`exports`而使`exports`不再指向`module.exports`指向得空对象,实际导出的还是`module.exports`的空对象

总体而言,`commonjs`的模块化类似如下格式,真正导出的是`module.exports`指向的内容
```javascript
const module = {
    exports: {}
}

let exports = module.exports;
```
4. Pitching loader

`loader`总是从右到左被调用,在实际执行`loader`之前,会先从左到右调用`loader`上的`pitching`方法

```javascript
module.exports = function(content, map, meta) {
    return content;
}

module.exports.pitch = function(remainingRequest, previousRequest, data) {
    console.log("pitching")
    if (remianingRequest.includes("xxx-loader")) {
        return;
    }
    return content;
}
```
或
```javascript
function loader(content, map, meta) {
    this.callback(content, map, meta)
}
loader.pitch = function(remainingRequest, precedingRequest, data) {
    console.log("pitching")
}
module.exports = loader;
```

`pitching`方法接受三个参数
* `remainingRequest`
    包含当前`loader`之后的所有`loader`和资源文件的请求字符串(文件绝对路径),如:
    ```
    D:\code\front-end\node\webpack\webpack_souce\loaders\raw-loader.js!D:\code\front-end\node\webpack\webpack_souce\loaders\pitching-loader.js!D:\code\front-end\node\webpack\webpack_souce\src\main.js
    ```
* `previousRequest`
    当前`loader`之前所有`loader`的请求字符串(文件绝对路径),如:
    ```
    D:\code\front-end\node\webpack\webpack_souce\loaders\async-loader.js
    ```
* `data`
    可以在同一个`loader`中`pitching`阶段和普通执行阶段之间共享的对象,可以在`pitching`阶段向这个对象添加数据

当一个`loader`的`pitching`函数返回`undefined`时,会继续正常执行

如果返回了一个`string`或者`buffer`,那么会中断后续`loader`的`pitching`和`normal`函数的执行,直接从前一个的`nromal`函数开始执行

[执行顺序](./order.md#相同优先级的loader执行顺序)

