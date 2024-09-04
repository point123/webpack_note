<h1>preload/prefetch</h1>

### preload
提前加载当前页面渲染所需的资源

浏览器尽快加载资源,优先级较高

#### 与普通的资源加载区别

以样式文件为例,浏览器在加载普通资源完成前,会阻塞渲染

而`preload`加载的资源不会立刻使用,而是存储在浏览器缓存中,供后续使用,不会阻塞页面渲染


### prefetch

预加载将来可能会使用的资源

浏览器在空闲时加载资源,优先级较低,不会阻塞关键资源的加载

适用于预先获取在将来时刻可能会用到的资源,如用户可能会访问的下一页的资源

### 说明
有如下`html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="prefetch" href="./help.js" as="script">
    <link rel="stylesheet" href="./main.css">
    <script src="./main.js"></script>
    <link rel="preload" href="./style.css" as="style">
<body>
    <div class="wrapper">
        <div class="image"></div>
        <button title="按钮" id="dynamic">动态执行</button>
    </div>
</body>
</html>
```

浏览器从顶部开始解析`html`
1. 遇到`<link rel="prefetch" href="./help.js" as="script">`
    `prefetch`不会阻塞解析,浏览器将它标记为在空闲时加载
2. 遇到`<link rel="stylesheet" href="./main.css">`
    这是普通的`css`资源,浏览器会立即开始下载`main.css`并且应用它,`css是阻塞渲染的资源`,页面渲染会等待它加载并应用完毕
3. 遇到`<script src="./main.js"></script>`
   由于没有使用`defer`和`async`,所以浏览器会在下载`main.js`时暂停`html`解析,等待它加载完成并执行后,再继续解析
4. 遇到`<link rel="preload" href="./style.css" as="style">`
    会立即下载`style.css`并缓存起来,`preload`不会阻塞`html`的解析

`defer`和`async`区别
`defer`:
    会延迟脚本的执行,直到整个`html`文档解析完成,且会按照顺序执行
`async`:
    脚本会在下载完成后立即执行,不会等到`html`文档全部解析完成,可能在`html`文档解析的任何时候执行,不会按照顺序执行

`<link rel="preload" href="./main.js" as="script"></link>`或`<link rel="prefetch" href="./main.js" as="script"></link>`仅仅是加载资源,要执行脚本还需要使用`<script src="./main.js"></script>`标记来引入

### 使用
* 方式一
可以直接在需要预加载、预获取的资源添加注释,如
```javascript title="app.js"
import { Pixel } from "./js/log";
import { moduleBfuncA } from "./js/moduleB";

moduleBfuncA();
console.log("这是新增的入口");
Pixel();

const btn = document.querySelector("#dynamic");
btn.addEventListener("click", () => {
    import(/* webpackChunkName: "moduleCZ",webpackPrefetch: true */"./js/moduleC").then(res => res.dynamicFunction());
});
```
* 方式二
使用插件如`@vue/preload-webpack-plugin`

`@vue/preload-webpack-plugin`是一个`html-webpack-plugin`的 ==扩展插件== 

插件的使用如下
```javascript{15-18} title="webpack.common.js"
// ...
const preloadWebpackPlugin = require("@vue/preload-webpack-plugin");
module.exports = {
    // ...
    plugins: [
        new htmlWebpaclPlugin({
            title: "webpack-dev-server",
            template: path.resolve(__dirname, "public/index.html"),
            // filename: "html/[name].html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:4].css",
            chunkFilename: "css/[name].chunk.[contenthash:4].css"
        }),
        new preloadWebpackPlugin({
            rel: "preload",
            as: "script"
        })
    ],
    // ...
}
```

默认情况下,插件的行为为相当于
```javascript
new preloadWebpackPlugin({
    rel: "preload",
    include: "asyncChunks"
})
```

也可以将`include`配置为`all`来预加载所有模块(vendor,async,normal chunks)

或设置为`initial`来仅加载初始块

`include`也可以使用命名块来明确指定哪些块使用预加载
```javascript
new preloadWebpackPlugin({
    rel: "preload",
    include: ["home"]
})
```

这将只针对名称为`home`的块
```html
<link rel="preload" as="script" href="home.31132ae6680e598f8879.js">
```

配置项`include`可以为`{entrys?,chunks?,type?}`形式的对象
如为指定的入口点预获取异步`chunks`
```javascript
{
    rel: "prefetch",
    include: {
        type: "asyncChunks",
        entries: ["app"]
    }
}
```

插件将根据不同的文件类型使用不同的`as`属性,如对于`.css`文件,将使用`as="style"`,对于`.woff2`的文件,将使用`as="font"`

也可以指定`as`属性来明确指定

还可以将`as`配置为一个函数来更精细的控制
```javascript
new preloadWebpackPlugin({
    rel: "preload",
    as(entry) {
        if (/\.css$/.test(entry)) return 'style';
        if (/\.woff$/.test(entry)) return 'font';
        if (/\.png$/.test(entry)) return 'image';
        return 'script';
    }
})
```
还可以使用`fileBlackList`来配置不想使用预加载的块,如`sourcemap`

在添加预加载前,插件会检查文件是否与`fileBlackList`选项中的正则表达式不匹配

`fileBlackList`默认为`[/\.map$/]`,即不会预加载任何源映射
