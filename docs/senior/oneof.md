<h1>OneOf</h1>

## 概念
打包时每个文件都会经过每一个`loader`的处理,虽然因为`test`正则表达式的匹配没有实际处理,但是都要经过一遍处理

使用OneOf即当匹配上一个`loader`,剩下的就不匹配

类似于多个`if`和`if...else if`的区别

## 使用
```javascript{24-83} title="webpack.common.js"
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
    //...
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
                        // use可以省略,直接将里面的属性写出来 loader只能指定一个loader,而use能使用多个
                        use: {
                            loader: "babel-loader",
                        }
                    }
                ]
            }
        ],
    }
}
```