<h1>Thread</h1>

当项目越来越庞大,打包速度也越来越慢,而项目中最多的就是`js`文件

针对`js`处理的主要就是`eslint`,`babel`,`terser`三个工具

一般情况下,执行顺序为先使用`eslint`检查代码,再使用`babel`转换处理`js`,最后使用`terser`压缩`js`

使用多进程同时处理,可以提高打包构建速度

### terser-webpack-plugin
`terser-webpack-plugin`是`webpack`内置的默认压缩插件,该插件使用`terser`来压缩`javascript`

它在优化阶段对最终的打包文件进行压缩混淆

默认情况下,webpack已经开启了多进程压缩,且默认的压缩进程数为`os.cpus().length - 1`

也可以修改压缩进程数

类似`css-minimizer-webpack-plugin`,`terser-webpack-plugin`虽然可以配置在plugins中,但是最好也配置在`optimization`中

```Javascript{14-29} title="webpack.common.js"
// webpack通用配置
const path = require("node:path");
const os = require("node:os");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const theads = os.cpus().length - 1;

module.exports = {
    // ...
    optimization: {
        // 在这里配置,则进会在生产模式下压缩,而不在开发模式下压缩
        minimizer: [
            // 压缩css,内部使用cssnano,
            new CssMinimizerWebpackPlugin(),
            // webpack v5自带的压缩插件,也是webpack默认的优化工具打包代码
            // 在优化阶段对最终的打包文件压缩,全局压缩混淆js代码
            new TerserWebpackPlugin({
                // 使用多进程并发运行以提高构建速度
                // 默认值为true, 并发运行的默认数量为os.cpu().length - 1;也可以指定
                parallel: theads
            }),
        ],
        // 控制是否压缩,如果为false,则无论在什么模式下都不会压缩,如果为true,则在任何模式下都会压缩,不写则只在生产模式下压缩
        // minimize: false
    },
}
```

### thread-loader
`thread-loader`将耗时任务分发到多个进程中执行,适用于处理时间长的`loader`,如`babel-loader`,`ts-loader`

`thread-loader`将这些任务分配到多个`worker`线程,每个`worker`都是一个独立的`node.js`进程

每个线程独立执行自己的任务最终将结果汇总返回给`webpack`主线程

每个线程的开销约为600ms左右,因此当内容很少时,打包时间反而会增加,所以仅在耗时任务中使用

```javascript{103-109} title="webpack.common.js"
//...
// loader加载器
module: {
    // loader的配置
    rules: [
        {
            oneOf: [
                {
                    test: /\.css$/i, // 匹配.css文件
                    // 执行顺序,从后向前
                    // use: [
                    //     //"style-loader", // 将js中的css通过创建style标签添加到html中
                    //     MiniCssExtractPlugin.loader, // 将css提取为单独的文件
                    //     "css-loader", // 将css资源编译为commonjs的模块到js中
                    //     {
                    //         loader: "postcss-loader",
                    //         options: {
                    //             postcssOptions: {
                    //                 plugins: ["postcss-preset-env"]
                    //             }
                    //         }
                    //     },
                    // ] 
                    use: getStyleLoader(),
                },
                {
                    test: /\.less$/,
                    // loader: "", loader只能指定一个loader,而use能使用多个
                    // use: [
                    //     // "style-loader", 
                    //     MiniCssExtractPlugin.loader,
                    //     "css-loader", 
                    //     // "postcss-loader",
                    //     "less-loader" // 将less编译为css文件
                    // ]
                    use: getStyleLoader("less-loader"),
                },
                {
                    test: /\.s[ac]ss$/,
                    // use: [
                    //     // "style-loader", 
                    //     MiniCssExtractPlugin.loader,
                    //     "css-loader", 
                    //     // "postcss-loader",
                    //     "sass-loader" // 将scss编译为css文件
                    // ]
                    use: getStyleLoader("sass-loader"),
                },
                {
                    test: /\.styl$/,
                    // use: [
                    //     // "style-loader",
                    //     MiniCssExtractPlugin.loader,
                    //     "css-loader",
                    //     // "postcss-loader",
                    //     "stylus-loader"
                    // ]
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
                    use: [
                        // 将耗时任务分发到多个线程中执行,适用于处理时间长的加载器,如babel-loader,ts-loader
                        // thread-loader能够并行处理模块从而加快构建速度
                        // thread-loader将这些任务分配到多个worker线程
                        // 每个线程独立执行自己的任务,最终将结果汇总返回给webpack主线程
                        // 每个worker都是一个独立的node.js进程,其开销大约为600ms左右同时会限制跨进程的数据交换,因此在耗时的任务中使用
                        {
                            loader: "thread-loader",
                            options: {
                                // 产生的worker数量,默认为os.cpu().length - 1;
                                workers: theads
                            }
                        },
                        {
                            loader: "babel-loader",
                            // 配置对象,也可以在项目中使用babel配置文件
                            options: {
                                // presets: ["@babel/preset-env"]
                                // 开启缓存,空值或者true将使用默认的缓存目录"node_modules/.cache/babel-loader"
                                // 值可以为目录,默认为false
                                // 任何根目录下都没找到node_modules目录,会降级退回到操作系统默认的临时文件目录
                                cacheDirectory: path.resolve(__dirname, "../node_modules/.cache/babel-loader"), // 开启babel缓存
                                // 默认值true 会使用Gzip压缩每个babel transform输出 
                                cacheCompression: false, // 关闭缓存压缩
                            }
                        }
                    ]
                }
            ]
        }
    ],
}
```

### eslint-webpack-plugin

`eslint-webpack-plugin`检查`eslint`文件时,也可以使用多线程

```javascript{14} title="webpack.common.js"
// ...
// 插件
plugins: [
    // eslint插件
    new EslintWebpackPlugin({
        // https://github.com/webpack-contrib/eslint-webpack-plugin/tree/master
        configType: "flat", // 默认值为eslintrc,需要修改为flat扁平化配置,否则会报错无法找到配置文件
        context: path.resolve(__dirname, "../src"), // 只检查src目录
        exclude: path.resolve(__dirname, "../node_modules"), // 排除node_modules,没必要,有上面的配置
        cache: true, // 默认为true
        // 缓存文件名,默认为node_modules/.cache/eslint-webpack-plugin/.eslintcache
        cacheLocation: path.resolve(__dirname, "../node_modules/.cache/eslint-webpack-plugin/.eslintcache"),
        // 以线程池方式运行lint,线程池大小是自动的(设置为true),也可以指定大小
        threads: theads
    }),
    // htmlWebpackPlugin插件,能在输出目录中创建一个html文件
    // 如果有多个入口文件,都会在生成的html文件中引入
    // 如果将css提取成单独的文件,则也会在html文件中通过link引入
    new HtmlWebpackPlugin({
        // 模板路径,使用指定目录中的html作为输出html的模板
        template: path.resolve(__dirname, "../public/index.html"),
    }),
    // 将css提取为单独的文件
    new MiniCssExtractPlugin({
        // 指定输出文件名
        filename: "static/css/main.css",
    }), 
    // 压缩css,内部使用cssnano,如果直接写在这里,则无论什么模式,都会压缩css
    // new CssMinimizerWebpackPlugin()
],
```