<h1>基本配置</h1>

在使用`Webpack`前,需要对`Webpack`的配置有一定的认识
### 5大核心概念
#### 1.entry(入口)
指示`Webpack`从哪个文件开始打包
#### 2.output(输出)
指示`Webpack`打包完的文件输出到哪里,如何命名等
#### 3.loader(加载器)
`Webpack`本身只能处理`js`,`json`等资源,其他资源需要借助`loader`,`Webpack`才能够解析
#### 4.plugin(插件)
扩展`Webpack`的功能
#### 5.mode(模式)
主要有两种模式:
* 开发模式: `development`
* 生产模式: `production`
### 准备Webpack配置文件
在项目根目录下新建文件:`webpack.config.js`
```javascript title="webpack.config.js"
const path = require("node:path");
module.exports = {
  // 入口
  entry: "./src/main.js",
  // 输出
  output: {
    // 输出路径
    path: path.resolve(__dirname, "dist"),
    // 输出名称
    filename: "main.js",
  },
  // 加载器
  module: {
    rules: [],
  },
  // 插件
  plugins: [],
  // 模式
  mode: "development",
}
```
### 修改配置文件
1.配置文件
```javascript title="webpack.config.js"
const path = require("node:path");
module.exports = {
  // 入口
  entry: "./src/main.js",
  // 输出
  output: {
    // 输出目录,绝对目录
    path: path.resolve(__dirname, "dist"),
    // 输出文件名
    filename: "main.js",
  },
  // 加载器loader
  module: {
    rules: []
  },
  plugins: [], // 插件
  mode: "development" // 开发模式
}
```
2.运行指令
```bash
npx webpack
```
### 小结
`Webpack`通过`webpack.config.js`文件进行配置,来增强`Webpack`的功能
