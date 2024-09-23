<h1>loader api</h1>

常用的`loader api`
| 方法名 | 说明 | 用法 |
| ----- | ----- | ----- |
| `this.async` | 异步调用`loader`,返回`this.callback` | `const callback = this.async();`|
| `this.callback` | 可以同步或异步调用,可返回多个结果 | `this.callback(err,content,map?,meta?)`|
| `this.getOptions(schema)` | 获取`loader`的`options`配置项 | `this.getOptions(schema)` |
| `this.emitFile` | 生成一个文件 | `this.emitFile(name,content,sourceMap?)` |
| `this.utils.contextify` | 返回一个相对路径 | `this.utils.contextify(context, request)` |
| `this.utils.absolutify` | 返回一个绝对路径 | `this.utils.absolutify(context, request)` |

[完整API](https://www.webpackjs.com/api/loaders/#the-loader-context)

* `this.context`:

    返回`loader`匹配的当前模块的绝对路径
    
    如该`loader`处理的模块路径为`D:\code\front-end\node\webpack\webpack_souce\src\main.css`
    
    返回`D:\code\front-end\node\webpack\webpack_souce\src`

* `this.utils.contextify(path1,path2)`:

    以`path1`为参照,得到`path2`相对于`path1`的相对路径

    如`this.utils.contextify("D:\\code\\src", "D:\\code\\src\\style.js")`返回`./style.js`

* `this.utils.absolutify(path1,path2)`:

    以`path1`为参照,得到`path2`相对于`path1`的绝对路径

    如`this.utils.absolutify("D:\\code\\src", "./style.js")`返回`D:\\code\\src\\style.js`
