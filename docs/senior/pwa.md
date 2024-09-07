<h1>PWA</h1>

`Web App`一旦处于网络离线状态,就无法访问

可以使用`PWA`(Progressive Web Application): 可提供类似`native app`体验的`Web App`技术

它内部通过`Service Workers`实现在离线时能继续访问的功能

### 创建一个服务器
在`webpack`中,可以使用`webpack-dev-server`,它与`webpack`一起使用,可以快速创建一个服务器

这里使用一个新的服务器`http-server`,也可以使用`serve`

安装
```bash
npm i -D http-server
```

修改`package.json`,添加启动命令并将`dist`目录作为服务器提供资源的目录
```json
// ...
"scripts": {
    "serve": "http-server dist"
}
```

当设置网络为离线时,无法访问

### webpack中使用PWA
安装依赖
```bash
npm i -D workbox-webpack-plugin
```

修改配置
```javascript title="webpack.common.js"
// ...
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = {
    // ...
    plugins: [
        //...
        new WorkboxWebpackPlugin.GenerateSW({
            // 这些选项帮助快速启用 ServiceWorkers
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true
        })
    ]
}
```

此时执行打包命令,可以看到生成了额外的文件

#### 注册Service Worker

```javascript{15-23} title="src/index.js"
import "./css/main.css";
import { cube, fetchData } from "./js/math";
import { Pixel } from "./js/log";

console.log('hello world');

// console.log(a.filter());
const arr = ["张三", "李四"]
console.log(cube(3));
Pixel();
await fetchData();
console.log(...arr);
arr.includes("zyw")

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
```

这时候将网络设置为离线,也能够正常访问了

#### 注册失败
如果使用`live server`插件运行打包后的`index`,会发现控制台输出注册失败

我们访问的页面路径为`http://127.0.0.1:5500/dist/index.html`

页面加载`service-worker.js`,请求路径为`http://127.0.0.1:5500/service-worker.js`,因此找不到

实际上`service-worker.js`的请求路径应该为`http://127.0.0.1:5500/dist/service-worker.js`

可以使用`http-server`,`server`,`webpack-dev-server`进行访问

#### 删除缓存
当恢复网络,并且结束该服务,开启另一个项目并监听相同端口再次访问

返现浏览器仍显示的是`Service Worker`的内容

或使用`http-server`开启服务后结束服务,再使用`webpack-dev-server`开启服务,控制台能看见`webpack-dev-server`的错误信息

可以在浏览器的应用程序选项中,`Service workers`中注销`Service Worker`

也可以在共享存储中删除`workbox`相关的缓存