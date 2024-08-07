<h1>处理HTML资源</h1>

### 下载依赖
```bash
npm i -D html-webpack-plugin
```

### 配置webpack
```javascript{3,25-27} title="webpack.config.js"
const path = require("node:path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // 入口
    entry: "./src/main.js", // 相对路径
    // 输出
    output: {
        // 输出路径,所有文件的输出目录
        path: path.resolve(__dirname, "dist"), // 绝对路径
        // js打包输出文件名
        filename: "static/js/bundle.js",
        // 自定清空上次打包的内容,在打包前将path整个目录清空再进行打包
        clean: true
    },
    // 插件
    plugins: [
        new EslintWebpackPlugin({
            // 默认值为eslintrc,需要修改为flat扁平化配置,否则会报错无法找到配置文件
            configType: "flat", 
            // 只检查src目录
            context: path.resolve(__dirname, "src"), 
        }),
        new HtmlWebpackPlugin({
            tempalte: path.resolve(__dirname, "public/index.html"),
        }),
    ],
    // loader加载器
    module: {
        // loader的配置
        rules: [
            /// ... 省略
        ],
    },
    // 模式
    mode: "development"
}
```
使用`html-webpack-plugin`插件可以自动在输出目录中生成`HTML`文件,并且可以自动引入打包后的`js`

如果有多个入口,也会创建多个`<script></script>`标签引入这些`js`

如果输出了单独的`css`文件(如使用`MiniCssExtractPlugin`插件提取的`css`文件),这些资源也会在`HTML`的`<head>`元素中通过`<link>`引入

配置项中可以使用`template`指定生成`html`的模板
::: tip 提示
不要在html模板中引入`js`或`css`文件,生成后的html会路径错误
:::
