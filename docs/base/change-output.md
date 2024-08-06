<h1>修改输出资源的名称和路径</h1>

### 配置
```javascript{7,35-42} title="webpack.config.js"
const path = require("node:path");
module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        // js文件输出目录
        filename: "static/js/main.js",
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
                },
                generator: {
                    // 指定图片输出目录并指定输出名
                    // [hash]: 哈希值
                    // [hash:10]: 取哈希值前10位
                    // [ext]: 文件扩展名
                    // [query]: query参数
                    filename: "static/images/[hash][ext][query]"
                }
            }
        ]
    },
    plugins: [],
    mode: "development"
}
```
::: tip 提示
注意修改index目录中引用的js文件路径
:::

dist输出目录
```
dist
|——static
|   |——js
|   |   |——main.js
|   |——images
|___|___|——7023ac25b3.png
```