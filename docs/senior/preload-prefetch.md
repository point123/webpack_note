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
使用插件`@vue/preload-webpack-plugin`

rel
as
include
fileBlacklist
type: "asyncChunks"
chunks: 
entry: 

rel: "prefetch",
include: {
    type: "asyncChunks",
    entries: ["app"]
}

rel: "preload",
as: "script" // 不使用as,则插件会根据文件后缀名使用不同的as值

对as进行更精细的控制
rel: "preload",
as(entry) {
    if (/\.css$/.test(entry)) return "style";
    if (/\.woff$/.test(entry)) return "font";
    if (/\.png$/.test(entry)) return "image";
    return "script";
}

// 默认情况下,插件配置值相当于
rel: "preload",
include: "asyncChunks"

include的值有initial,asyncChunks,all
或者使用命名块
include: ["home"]
将只注入以下内容
<link rel="preload" as="script" href="home.31132ae6680e598f8879.js">

过滤块


