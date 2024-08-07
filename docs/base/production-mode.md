<h1>生产模式介绍</h1>

### 1.
将配置文件导出为函数,函数的参数有env, argv;
argv.mode必须在命令行中使用--mode="xxx"指定,在配置文件中指定的无效(undefined)

const path = require("node:path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
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
        // eslint插件
        new EslintWebpackPlugin({
            // https://github.com/webpack-contrib/eslint-webpack-plugin/tree/master
            configType: "flat", // 默认值为eslintrc,需要修改为flat扁平化配置,否则会报错无法找到配置文件
            context: path.resolve(__dirname, "src"), // 只检查src目录
        }),
        // htmlWebpackPlugin插件,能在输出目录中创建一个html文件
        // 如果有多个入口文件,都会在生成的html文件中引入
        // 如果将css提取成单独的文件,则也会在html文件中通过link引入
        new HtmlWebpackPlugin({
            // 模板路径,使用指定目录中的html作为输出html的模板
            template: path.resolve(__dirname, "public/index.html"),
        })
    ],
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
            },
            /* babel-loader处理js文件 */
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除node_modules目录
                // use可以省略,直接将里面的属性写出来
                use: {
                    loader: "babel-loader",
                    // 配置对象,也可以在项目中使用babel配置文件
                    // options: {
                    //     presets: ["@babel/preset-env"]
                    // }
                }
            }
        ],
    },
    devServer: {
        host: "0.0.0.0",
        port: "auto",
    },
    // 模式
    mode: "development"
}

module.exports = (env, argv) => {
    console.log(argv.mode);
    if (argv.mode === "development") {
        config.output.path = path.resolve(__dirname, "dist-dev");
    } else if (argv.mode === "production") {
        config.output.path = path.resolve(__dirname, "dist-prod");
    }
    return config;
}

### 2.
安装webpack-merge
创建webpack.common.js, webpack.dev.js, webpack.prod.js

// webpack通用配置
const path = require("node:path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // 入口
    entry: "./src/main.js", // 相对路径
    // 输出
    output: {
        // 输出路径,所有文件的输出目录
        path: path.resolve(__dirname, "../dist"), // 绝对路径
        // js打包输出文件名
        filename: "static/js/bundle.js",
        // 自定清空上次打包的内容,在打包前将path整个目录清空再进行打包
        clean: true
    },
    // 插件
    plugins: [
        // eslint插件
        new EslintWebpackPlugin({
            // https://github.com/webpack-contrib/eslint-webpack-plugin/tree/master
            configType: "flat", // 默认值为eslintrc,需要修改为flat扁平化配置,否则会报错无法找到配置文件
            context: path.resolve(__dirname, "../src"), // 只检查src目录
        }),
        // htmlWebpackPlugin插件,能在输出目录中创建一个html文件
        // 如果有多个入口文件,都会在生成的html文件中引入
        // 如果将css提取成单独的文件,则也会在html文件中通过link引入
        new HtmlWebpackPlugin({
            // 模板路径,使用指定目录中的html作为输出html的模板
            template: path.resolve(__dirname, "../public/index.html"),
        })
    ],
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
            },
            /* babel-loader处理js文件 */
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除node_modules目录
                // use可以省略,直接将里面的属性写出来
                use: {
                    loader: "babel-loader",
                    // 配置对象,也可以在项目中使用babel配置文件
                    // options: {
                    //     presets: ["@babel/preset-env"]
                    // }
                }
            }
        ],
    }
}


// webpack生产模式配置
const WebpackMerge = require('webpack-merge');
const WebpackCommonConfig = require("./webpack.common");

module.exports = WebpackMerge.merge(WebpackCommonConfig, {
    mode: 'production',
});


// webpack开发模式配置
const { merge } = require('webpack-merge');
const WebpackCommonConfig = require("./webpack.common");

module.exports = merge(WebpackCommonConfig, {
    mode: 'development',
    devServer: {
        host: "0.0.0.0",
        port: "auto",
    },
});


package.json

  "scripts": {
    "serve": "webpack serve --config ./config/webpack.dev.js",
    "default": "webpack serve",
    "dev": "webpack --mode=development",
    "watch": "webpack watch",
    "build": "webpack --mode=production",
    "prod": "webpack --config ./config/webpack.prod.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
