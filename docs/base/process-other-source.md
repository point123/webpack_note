<h1>处理其他资源</h1>

### 配置
```javascript{78-84} title="webpack.config.js"
const path = require("node:path");

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
    plugins: [],
    // loader加载器
    module: {
        // loader的配置
        rules: [
            {
                test: /\.css$/i, // 匹配.css文件
                // 执行顺序,从后向前
                use: [
                    "style-loader", // 将js中的css通过创建style标签添加到html中
                    "css-loader" // 将css资源编译为commonjs的模块到js中
                ] 
            },
            {
                test: /\.less$/,
                // loader: "", loader只能指定一个loader,而use能使用多个
                use: [
                    "style-loader", 
                    "css-loader", 
                    "less-loader" // 将less编译为css文件
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    "style-loader", 
                    "css-loader", 
                    "sass-loader" // 将scss编译为css文件
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "stylus-loader"
                ]
            },
            {
                test: /\.(jpe?g|png|gif|avif|svg|webp)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        // 将小于103kb的资源转换为base64
                        // 优点: 减少请求数 缺点: 转换为base64URI大小会大于原始文件
                      maxSize: 103 * 1024 // 103kb
                    }
                },
                generator: {
                    // 图片输出名称, hash:哈希值(:数字 可以截取前几位) ext:扩展名 query:查询参数,如果url包含?xxx
                    filename: "static/images/[hash][ext][query]"
                }
            },
            /* 单独处理字体文件,输出到指定文件夹 */
            {
                test: /\.(ttf|woff2?)$/,
                type: "asset/resource",
                generator: {
                    filename: "static/fonts/[hash][ext][query]"
                }
            },
            /* 其他资源全部输出到assets目录中 */
            {
                test: /\.(mp4|avi|flac)$/,
                type: "asset/resource",
                generator: {
                    filename: "static/assets/[hash][ext][query]"
                }
            }
        ],
    },
    // 模式
    mode: "development"
}
```

当需要对特定类型的资源单独输出到指定目录时,只要额外增加一个配置项即可