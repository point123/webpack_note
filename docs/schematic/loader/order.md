<h1>loader执行顺序</h1>

`loader`帮助`webpack`将不同类型的文件转换为`webpack`可以识别的模块

1. 分类

* `pre`: 前置`loader`,
* `normal`: 普通`loader`,
* `inline`: 内联`loader`,
* `post`: 后置`loader`

2. 执行顺序所有`loader`都有两个阶段
* `pitch`阶段
`loader`上的`pitch`方法,按照 后置 -> 行内 -> 普通 -> 前置 的顺序调用
* `Normal`阶段
`loader`上的常规方法,按照 前置 -> 普通 -> 行内 -> 后置 的优先级调用,模块源码的转换发生在该阶段

相同优先级的`loader`执行顺序为 从下到上 从后往前(从右到左)

```javascript title="webpack.config.js"
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "loader1"
            },
            {
                test: /\.js$/,
                loader: "loader2"
            },
            {
                test: /\.js$/,
                loader: "loader3"
            }
        ]
    }
}
```
上述loader的执行顺序为`loader3` -> `loader2` -> `loader1`
```javascript title="webpack.config.js"
module.exports = {
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "loader1"
            },
            {
                test: /\.js$/,
                loader: "loader2"
            },
            {
                enforce: "post",
                test: /\.js$/,
                loader: "loader3"
            }
        ]
    }
}
```
使用`enforce`指定`loader`的执行顺序,此时顺序为`loader1` -> `loader2` -> `loader3`

3. 使用`loader`的方式
对于前置,普通,后置`loader`,可以在`webpack`配置文件中指定
对于内联`loader`,在`import`语句中显示指定`loader`

4. `inline loader`的使用

`import style from "style-loader!css-loader?modules!./style.css"`

使用`css-loader`和`style-loader`(参数为`modules`)处理`style.css`文件

通过`!`将资源中的`loader`分割

所有普通`loader`可以在请求中加上`!`前缀来忽略(覆盖)

所有普通和前置`loader`可以在请求中加上`-!`前缀来忽略(覆盖)

所有普通,前置和后置`loader`可以在请求中加上`!!`前缀来忽略(覆盖)

```javascript title="main.js"
// 禁用普通loaders
import a from '!./a.js';
// 禁用前置和普通loaders
import b from '-!./b.js';
// 禁用前置,普通和后置loaders
import c from '!!./c.js';
```
对于`inline loader`(不推荐使用,是非标准的)
```javascript
// 跳过配置文件中对该文件使用普通loader的处理
import style from "!style-loader!css-loader?modules!./style.css"
// 跳过配置文件中对该文件使用前置和普通loader的处理
import style from "-!style-loader!css-loader?modules!./style.css"
// 跳过配置文件中对该文件使用前置,普通和后置loader的处理
import style from "!!style-loader!css-loader?modules!./style.css"
```