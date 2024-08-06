<h1>处理图片资源</h1>

过去在`Webpack4`中,处理图片资源通过`file-loader`和`url-loader`进行处理

* `file-loader`: 将文件资源编译为`Webpack`能识别的资源原封不动的输出
* `uel-loader`: 将小于指定大小的图片转换为`base64`编码

现在`Webpack5`已经将两个`loader`功能内置到`Webpack`中了,只需要简单配置就能处理图片资源

### 1.配置
```javascript{26-29} title="webpack.config.js"
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
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                type: "asset",
            }
        ]
    },
    plugins: [],
    mode: "development"
}
```

### 2.使用图片资源
可以通过在样式文件中引入图片资源或在js文件直接import

### 3.输出资源
此时查看dist目录,会发现多了三张图片

`Webpack`将打包好的资源输出到dist目录下

* 为什么样式资源没有输出的文件
样式资源经过`style-loader`的处理,被打包到dist目录的主文件中

### 4.对资源进行优化
将小于指定大小的资源转换为`dataURI`形式(`base64`)
```javascript{29-33} title="webpack.config.js"
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
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 103 * 1024 // 小于103kb的图片将会被base64处理
                    }
                }
            }
        ]
    },
    plugins: [],
    mode: "development"
}
```
* 优点: 减少请求数量
* 缺点: 资源体积将变大

此时转换为base64的图片不会输出,它将以dataURI形式内置到js中

::: tip
默认情况下,每次打包时,dist目录不会被清空,需要先清楚上次打包的内容再重新打包
:::
