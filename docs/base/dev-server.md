<h1>自动化与开发服务器</h1>

### 监听文件变化
监听文件变化,当文件发生改变时,可以自动重新打包编译,不需要重新执行命令
#### 使用
```bash
npx webpack --watch
```
或者在配置文件中新增`watch`配置
```javascript{3-13} title="webpack.config.js"
module.exports = {
    // ...
    watch: true,
    // 可选的定制watch配置的选项
    watchOptions: {
        // 当第一个文件发生更改时,在重构前增加延迟时间,这段时间内的所有更改聚合到一次重构
        aggregateTimeout: 20, // ms
        // 忽略监听文件
        ignored: /node_modules/,
        // ignored: ["**/node_modules", "**/files/**/*.js"],
        // 间隔监听时间,每隔1s检测一次变更
        poll: 1000 // ms
    }
}
```

### 开发服务器
#### 安装依赖
```bash
npm i -D webpack-dev-server
```
#### 配置文件
```javascript title="webpack.config.js"
module.exports = {
    // ...
    devServer: {
        // 静态文件目录,默认为public文件夹,服务器能访问该目录中的文件,设置false禁用
        static: './dist', 
        // 启动后自动打开浏览器,也可以在启动命令中添加--open
        open: true,

        // 命令行用多个--open 如npx webpack serve --open /page --open /page1
        // open: ['/page','/page1'] // 打开指定页面
        
        // open: {
        //     app: {
        //         // 命令行中使用 --open-app-name xxx
        //         // 指定使用哪个浏览器打开
        //         name: "chrome", // 不同平台的名称不同,windows中名为chrome
        //         arguments: ['--incognito', '--new-window'] // 打开浏览器的参数
        //     },
        //     target: ['/page', 'page1']
        // }
        
        // 命令行使用 npx webpack serve --host 0.0.0.0
        // npx webpack serve --host local-ip 使用本地ipv4地址作为host,如果ipv4不可用,则使用ipv6
        // 指定使用的host
        host: "0.0.0.0", // 让服务器可以被外部访问: 0.0.0.0

        // 命令行使用 npx webpack serve --port 8080
        port: 8080, // 指定监听请求的端口,自动使用可以填写auto

        // 配置代理
        proxy: {
            // 对/api/user的请求会代理到http://localhost:3000/api/user
            '/api': 'http://localhost:3000'
            // 配置多个代理并重写路径
            // 对/dev/user的请求会代理到http://localhost:3001/user
            '/dev': {
                target: 'http://localhost:3001',
                pathRewrite: {'^/dev': ''}, // 不传递/dev
                secure: false, // 如果https没有证书,则需要设置为false
                // 自定义代理内容
                // 对于浏览器请求提供html,对于api请求,代理它
                bypass: function (req, res, proxyOptions) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        console.log('Skipping proxy for browser request.');
                        return '/index.html'; // 返回页面
                    }
                    return null; // 返回null或undefined,使用代理处理请求
                    // 返回false,为请求返回404
                },
            }
        }
    }
}
```
#### 运行
```bash
npx webpacl serve
```
可以在`package.json`中添加`scripts`配置

使用开发服务器,将不会产生输出,代码在内存中打包编译