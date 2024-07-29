<h1>处理样式资源</h1>

本章节学习使用`Webpack`处理`css`,`Less`,`Sass`,`Scss`,`Stylus`样式资源
### 介绍
`Webpack`本身是不能识别样式资源的,所以需要借助`Loader`来帮助`Webpack`解析样式资源
### 处理CSS资源
#### 1.下载依赖
```bash
npm install -D css-loader style-loader
```
#### 2.功能介绍
* `css-loader`: 负责将`css`文件编译为`Webpack`能识别的模块
* `style-loader`: 动态创建一个`style`标签,标签内为`Webpack`中`css`模块内容
#### 3.配置
```javascript{10-15} title="webpack.config.js"
const path = require("node:path");
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    module: {
        rules: [
            {
                // 匹配.css结尾的文件
                test: /\.css$/i,
                // Loader执行顺序从后向前
                use: ["style-loader", "css-loader"],
            }
        ]
    },
    plugins: [],
    mode: "development"
}
```
### 处理Less资源
#### 1.下载依赖
```bash
npm install -D less-loader less
```
#### 2.功能介绍
* `less-loader`: 负责将`less`文件编译为`css`文件
#### 3.配置
```javascript{14-17} title="webpack.config.js"
const path = require("node:path");
module.export = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"],
            }
        ]
    },
    plugins: [],
    mode: "development"
}
```
### 处理Sass和Scss资源
#### 1.下载依赖
```bash
npm install -D sass-loader node-sass sass
```
#### 2.功能介绍
* `sass-loader`: 负责将`sass`/`scss`文件编译为`css`文件
* `sass`: `sass-loader`依赖`sass`进行编译
#### 3.配置
```javascript{18-21} title="webpack.config.js"
const path = require("node:path");
module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.s[ac]ss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [],
    mode: "development"
}
```
### 处理stylus资源
#### 1.下载依赖
```bash
npm install -D stylus stylus-loader
```
#### 2.功能介绍
* `stylus-loader`: 负责将`styl`文件编译成`css`文件
#### 3.配置
```javascript{22-25} webpack.config.js
const path = require("node:path");
module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.s[ac]ss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.styl$/,
                use: ["style-loader", "css-loader", "stylus-loader"]
            }
        ]
    },
    plugins: [],
    mode: "development"
}
```

