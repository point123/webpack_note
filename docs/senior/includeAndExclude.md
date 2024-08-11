<h1>include/exclude</h1>

## 概念

当使用第三方库或插件时,文件下载到`node_modules`中,这些文件已经被处理过了,不需要再重新处理

所以在处理`js`文件时,可以排除`node_modules`中的文件

## 使用

* `include`:

只处理xxx文件

* `exclude`:

排除xxx文件处理其他文件

```javascript{26,27,92,93} title="webpack.common.js"
// webpack通用配置
const path = require("node:path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

// 不能使用箭头函数,因为箭头函数没有arguments
function getStyleLoader() {
    return [
        MiniCssExtractPlugin.loader,
        "css-loader",
        "postcss-loader",
        ...arguments,
    ].filter(Boolean);
}

module.exports = {
    // ...
    // 插件
    plugins: [
        // eslint插件
        new EslintWebpackPlugin({
            // https://github.com/webpack-contrib/eslint-webpack-plugin/tree/master
            configType: "flat", // 默认值为eslintrc,需要修改为flat扁平化配置,否则会报错无法找到配置文件
            context: path.resolve(__dirname, "../src"), // 只检查src目录
            exclude: path.resolve(__dirname, "../node_modules") // 排除node_modules,没必要,有上面的配置
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/main.css",
        }), 
    ],
    // loader加载器
    module: {
        // loader的配置
        rules: [
            {
                oneOf: [
                    {
                        test: /\.css$/i, // 匹配.css文件
                        use: getStyleLoader(),
                    },
                    {
                        test: /\.less$/,
                        use: getStyleLoader("less-loader"),
                    },
                    {
                        test: /\.s[ac]ss$/,
                        use: getStyleLoader("sass-loader"),
                    },
                    {
                        test: /\.styl$/,
                        use: getStyleLoader("stylus-loader")
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
                    },
                    /* babel-loader处理js文件 */
                    {
                        test: /\.js$/,
                        exclude: /node_modules/, // 排除node_modules目录
                        include: path.resolve(__dirname, "../src"), // 只包含src
                        // use可以省略,直接将里面的属性写出来 loader只能指定一个loader,而use能使用多个
                        use: {
                            loader: "babel-loader",
                            // 配置对象,也可以在项目中使用babel配置文件
                        }
                    }
                ]
            }
        ],
    }
}
```