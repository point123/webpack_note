<h1>cache</h1>

每次打包`js`时都经过`Eslint`检查和`babel`编译,可以缓存之前的`Eslint`检查和`babel`编译接结果,这样二次打包时对于没有修改的模块可以使用缓存的结果,从而减少编译时间

```javascript{28-30,101-108} title="webpack.common.js"
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
            exclude: path.resolve(__dirname, "../node_modules"), // 排除node_modules,没必要,有上面的配置
            cache: true, // 开启缓存,默认为true
            // 缓存文件名,默认为node_modules/.cache/eslint-webpack-plugin/.eslintcache
            cacheLocation: path.resolve(__dirname, "../node_modules/.cache/eslintcache"),
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
                            options: {
                                // 开启缓存,空值或者true将使用默认的缓存目录"node_modules/.cache/babel-loader"
                                // 值可以为目录,默认为false
                                // 任何根目录下都没找到node_modules目录,会降级退回到操作系统默认的临时文件目录
                                cacheDirectory: true, 
                                // 默认值true 会使用Gzip压缩每个babel transform输出 
                                cacheCompression: false,
                            }
                        }
                    }
                ]
            }
        ],
    }
}
```