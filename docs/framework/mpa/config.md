<h1>配置文件</h1>

* `package.json`

```json title="package.json"
{
  "name": "webpack_mpa",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack server",
    "build": "cross-env NODE_ENV=development webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "cross-env": "^7.0.3",
    "css-loader": "^7.1.2",
    "css-minimizer-webpack-plugin": "^7.0.0",
    "html-webpack-plugin": "^5.6.0",
    "less-loader": "^12.2.0",
    "mini-css-extract-plugin": "^2.9.1",
    "style-loader": "^4.0.0",
    "webpack": "^5.94.0",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^5.1.0"
  }
}

```

* `webpack.config.js`

```javascript title="webpack.config.js"
const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        index: "./src/js/index/index.js",
        pageTwo: "./src/js/pageTwo/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: isProduction ? "static/js/[name].[contentHash:4].js" : "static/js/[name].js",
        chunkFilename: isProduction ? "static/js/[name].[contentHash:4].chunk.js" : "static/js/[name].chunk.js",
        assetModuleFilename: "static/assets/[name].[hash:4].[ext][query]",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                ]
            },
            {
                test: /\.less$/,
                use: [
                    // isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "首页",
            template: path.resolve(__dirname, "./public/index.html"),
            filename: "index.html",
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            title: "page two",
            filename: "pageTwo.html",
            template: path.resolve(__dirname, "./public/pages/pageTwo.html"),
            chunks: ["pageTwo"]
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].css"
        })
    ],
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        runtimeChunk: "single",
        minimize: isProduction,
        minimizer: [
            new CssMinimizerPlugin()
        ]
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
    devtool: isProduction ? false : 'source-map',
    devServer: {
        host: "localhost",
        port: "8080",
        hot: true,
        open: true
    },
    mode: isProduction ? "production" : "development"
}
```

* 有多少个页面,至少需要配置响应个数的入口点

    该项目中有两个页面,`index.html`使用`index`入口点, `pageTwo.html`使用`pageTwo`入口点

* 输出目录的文件名称不能重复
* 有多少页面,就创建几个`html-webpack-plugin`实例
    该项目中有两个页面,需要创建两个实例,使用`template`指定页面模板

    使用`filename`指定输出文件名,不能相同

    使用`chunks`指定该页面使用的入口模块

    本项目中,`index.html`的入口点为`entry`中的`index`

    文件名称为`index.html`,最终输出位置为`dist/index.html`

    也就算说最后的输出的文件为`dist/index.html`和`dist/pageTwo.html`

    所以在写页面模板中的`<a>`标签跳转时,路径需要写成`./xxx.html`,否则无法加载样式、`js`等资源