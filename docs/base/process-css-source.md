<h1>css处理</h1>

### 将css提取为单独文件
`css`目前通过`css-loader`将导入`js`中的样式一起打包到`js`中,并通过`style-loader`创建`<style>`标签生成样式

但是这可能导致闪屏,需要将样式作为单独的文件,通过`<link>`标签引入样式文件

可以使用`mini-css-extract-plugin`代替`style-loader`进行处理

#### 下载依赖
```bash
npm i -D mini-css-extract-plugin
```

#### 配置
```javascript{5,35-37,49,58,67,76} title="webpack.common.js"
// webpack通用配置
const path = require("node:path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        }),
        // 将css提取成单独的文件并指定名称
        new MiniCssExtractPlugin({
            filename: "static/css/main.css",
        }),
    ],
    // loader加载器
    module: {
        // loader的配置
        rules: [
            {
                test: /\.css$/i, // 匹配.css文件
                // 执行顺序,从后向前
                use: [
                    // "style-loader", // 将js中的css通过创建style标签添加到html中
                    // 使用MiniCssExtractPlugin.loader代替style-loader
                    MiniCssExtractPlugin.loader,
                    "css-loader" // 将css资源编译为commonjs的模块到js中
                ] 
            },
            {
                test: /\.less$/,
                // loader: "", loader只能指定一个loader,而use能使用多个
                use: [
                    // "style-loader", 
                    MiniCssExtractPlugin.loader,
                    "css-loader", 
                    "less-loader" // 将less编译为css文件
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    // "style-loader", 
                    MiniCssExtractPlugin.loader,
                    "css-loader", 
                    "sass-loader" // 将scss编译为css文件
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    // "style-loader",
                    MiniCssExtractPlugin.loader,
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
```
::: tip 提示
需要使用`html-webpack-plugin`插件,才能将`css`文件加载到输出的`html`中;或者自行在创建的文件中使用`<link>`添加生成的`css`
:::

::: tip 提示
此时`devtool`配置需要为`source-map`,`nosources-source-map`,`hidden-nosources-source-map`,`hidden-source-map`之一。
`css`仅支持带有`sourceMappingURL`注释的`source map`,如 `//# sourceMappingURL=style.css.map`。
如果将`devtool`设置为其他值,可以使用`css-loader`中的`sourceMap: true`来提取生成css的`source map`
:::


### 使用postcss对css进行处理

#### 下载依赖
```bash
npm i -D postcss-loader postcss postcss-preset-env
```

#### 配置
```javascript{51-60,72-81,91-100,110-119} title="webpack.common.js"
// webpack通用配置
const path = require("node:path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        }),
        // 将css提取成单独的文件并指定名称
        new MiniCssExtractPlugin({
            filename: "static/css/main.css",
        }),
    ],
    // loader加载器
    module: {
        // loader的配置
        rules: [
            {
                test: /\.css$/i, // 匹配.css文件
                // 执行顺序,从后向前
                use: [
                    // "style-loader", // 将js中的css通过创建style标签添加到html中
                    // 使用MiniCssExtractPlugin.loader代替style-loader
                    MiniCssExtractPlugin.loader,
                    "css-loader", // 将css资源编译为commonjs的模块到js中
                    {
                        loader: "postcss-loader", // 使用postcss-loader处理css
                        options: {
                            // postcss配置选项,也可以使用单独的postcss配置文件
                            postCssOptions: {
                                // postcss预设
                                plugins: ["postcss-preset-env"]
                            }
                        }
                    }
                ] 
            },
            {
                test: /\.less$/,
                // loader: "", loader只能指定一个loader,而use能使用多个
                use: [
                    // "style-loader", 
                    MiniCssExtractPlugin.loader,
                    "css-loader", 
                    // postcss是css后处理器,用于处理css;而less等是预处理器,将less编译为css
                    // 所以postcss需要在放在less前,将less代码转换为css代码后再使用postcss处理
                    {
                        loader: "postcss-loader", // 使用postcss-loader处理css
                        options: {
                            // postcss配置选项,也可以使用单独的postcss配置文件
                            postCssOptions: {
                                // postcss预设
                                plugins: ["postcss-preset-env"]
                            }
                        }
                    },
                    "less-loader" // 将less编译为css文件
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    // "style-loader", 
                    MiniCssExtractPlugin.loader,
                    "css-loader", 
                    {
                        loader: "postcss-loader", // 使用postcss-loader处理css
                        options: {
                            // postcss配置选项,也可以使用单独的postcss配置文件
                            postCssOptions: {
                                // postcss预设
                                plugins: ["postcss-preset-env"]
                            }
                        }
                    },
                    "sass-loader" // 将scss编译为css文件
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    // "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader", // 使用postcss-loader处理css
                        options: {
                            // postcss配置选项,也可以使用单独的postcss配置文件
                            postCssOptions: {
                                // postcss预设
                                plugins: ["postcss-preset-env"]
                            }
                        }
                    },
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
                }
            }
        ],
    }
}
```
#### 合并配置
配置文件的loader中对于样式含有大量相似的内容,可以将其提取成一个函数

```javascript{7-16,57,62,66,70} title="webpack.common.js"
// webpack通用配置
const path = require("node:path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getStyleLoader = () => {
    return [
        MiniCssExtractPlugin.loader,
        "css-loader",
        "postcss-loader", // 使用postcss.config.js配置文件
        ...arguments // 展开剩余参数,每个参数都是一个字符串(如'xxx-laoder'),可能为空
    ].filter(Boolean); // 过滤无效值, Boolean为构造函数,将值转换为布尔值,
    // 等价于filter(item => Boolean(item));
    // filter(fn);  function fn(arg) {return Boolean(arg)}
}

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
        }),
        // 将css提取成单独的文件并指定名称
        new MiniCssExtractPlugin({
            filename: "static/css/main.css",
        }),
    ],
    // loader加载器
    module: {
        // loader的配置
        rules: [
            {
                test: /\.css$/i, // 匹配.css文件
                // 执行顺序,从后向前
                use: getStyleLoader(), 
            },
            {
                test: /\.less$/,
                // loader: "", loader只能指定一个loader,而use能使用多个
                use: getStyleLoader("less-loader")
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoader("sass-loader")
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
                // use可以省略,直接将里面的属性写出来
                use: {
                    loader: "babel-loader",
                }
            }
        ],
    }
}
```

将postcss文件提取到postcss配置文件
```javascript title="postcss.config.js"
module.exports = {
    plugins: ["postcss-preset-env"]
}
```

### 压缩css

webpack在生产环境下默认压缩html和js,但是不会压缩css,需要对css单独处理
#### 下载依赖
```bash
npm i -D css-minimizer-webpack-plugin
```
`css-minimizer-webpack-plugin`使用`cssnano`优化压缩`css`

`postcss`结合`cssnano`也可以压缩css

#### 配置
```javascript title="webpack.common.js"
// webpack通用配置
const path = require("node:path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

const getStyleLoader = () => {
    return [
        MiniCssExtractPlugin.loader,
        "css-loader",
        "postcss-loader", // 使用postcss.config.js配置文件
        ...arguments // 展开剩余参数,每个参数都是一个字符串(如'xxx-laoder'),可能为空
    ].filter(Boolean); // 过滤无效值, Boolean为构造函数,将值转换为布尔值,
    // 等价于filter(item => Boolean(item));
    // filter(fn);  function fn(arg) {return Boolean(arg)}
}

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
        }),
        // 将css提取成单独的文件并指定名称
        new MiniCssExtractPlugin({
            filename: "static/css/main.css",
        }),
        new CssMinimizerWebpackPlugin()
    ],
    // loader加载器
    module: {
        // loader的配置
        rules: [
            {
                test: /\.css$/i, // 匹配.css文件
                // 执行顺序,从后向前
                use: getStyleLoader(), 
            },
            {
                test: /\.less$/,
                // loader: "", loader只能指定一个loader,而use能使用多个
                use: getStyleLoader("less-loader")
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoader("sass-loader")
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
                // use可以省略,直接将里面的属性写出来
                use: {
                    loader: "babel-loader",
                }
            }
        ],
    }
}
```
