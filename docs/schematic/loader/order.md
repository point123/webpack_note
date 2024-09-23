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

### 相同优先级的loader执行顺序

相同优先级的`loader`默认执行顺序(`pitching`返回`undefined`)
![1726724840333](image/1726724840333.png)

相同优先级的`loader`,如果`pitching`中返回了`String`或者`Buffer`的执行顺序
![1726724840334](image/1726724840334.png)

### 不同优先级的执行顺序
```javascript title="webpack.config.js"
module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /.js$/,
                loader: "post-loader",
                enforce: "post"
            },
            {
                test: /.js$/,
                loader: "pre-loader",
                enforce: "pre"
            },
            {
                test: /.js$/,
                loader: "normal-loader",
            }
        ]
    }
}
```

默认情况下,执行顺序为

`post-loader-pitch` > `normal-loader-pitch` > `pre-loader-pitch` > `pre-loader` > `normal-loader` > `post-loader`

### loader处理模块
默认情况下,当导入模块时,如果`webpack`配置文件中针对该模块的`loader`,会使用配置的`loader`处理

可以在导入模块时控制是否使用不同类型的`loader`进行处理

```javascript
// 禁用普通 loaders对file1.js处理
import { a } from '!./file1.js';

// 禁用前置和普通 loaders对file2.js处理
import { b } from '-!./file2.js';

// 禁用所有的 loaders对file3处理
import { c } from '!!./file3.js';
```

### 内联loader
可以在导入模块时显示指定`loader`对导入的模块进行处理

```javascript title="webpack.config.js"
module.exports = {
    module: {
        rules: [
            { use: /\.js$/, loader: "post-loader", enforce: "post" },
            { use: /\.js$/, loader: "pre-loader", enforce: "pre" },
            { use: /\.js$/, loader: "normal-loader" },
        ]
    }
}
```

```javascript title="main.js"
import a from "../loaders/inline-loader!../loaders/xx-loader!./a.js";
```

首先,`loader`对入口文件进行处理

执行顺序为:

`post-loader-pitch` > `normal-loader-pitch` > `pre-loader-pitch` > `pre-loader` > `normal-loader` > `post-loader`

然后,入口文件导入了一个模块并且使用了`inline loader`,`loader`针对该模块进行处理

执行顺序为:

`post-loader-pitch` > `inline-loader-pitch` > `xx-loader-pitch` > `normal-loader-pitch` > `pre-loader-pitch` > `pre-loader` > `normal-loader` > `xx-loader` > `inline-loader` > `post-loader`

`inline loader`也可以结合`!`使用

```javascript
// 处理a模块时忽略normal loader
import a from "!../loaders/inline-loader!../loaders/xx-loader!./a.js";
// 处理b模块时忽略normal loader和pre loader
import b from "-!../loaders/inline-loader!../loaders/xx-loader!./b.js";
// 处理c模块时忽略除了inline loader外所有loader
import c from "!!../loaders/inline-loader!../loaders/xx-loader!./c.js";
```

官方文档中说不应使用`inline loader`和`!`,这是非标准的