<h1>优化配置</h1>

许多`react`写中后台项目会使用`ant-design`

安装`ant-design`
```bash
npm i antd
```

修改
```jsx{3,13} title="App.jsx"
import React, { Suspense, lazy } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Button, ConfigProvider  } from "antd";
// import Home from "./pages/Home";
// import About from "./pages/About";

// react懒加载实现分包
const Home = lazy(() => import(/* webpackChunkName: "home" */"./pages/Home"));
const About = lazy(() => import(/* webpackChunkName: "about" */"./pages/About"));
function App() {
    return (
        // 配置anti-design主题样式
        <ConfigProvider theme={{ token: { colorPrimary: '#00b96b'} }}>
            <div>
                <h1>App</h1>
                <Button type="primary">Button</Button>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </Suspense>
            </div>      
        </ConfigProvider>

    )
}

export default App;
```

此时进行打包后,所有`node_modules`内容(如`react`,`react-dom`,`ant-design`)都打包到同一个`chunk`中,体积太大

通过配置`splitChunks`将部分`node_modules`中的模块提取为单独的模块:

* `react`,`react-dom`,`react-router-dom`抽取为一个包
* `ant-design`抽取为一个包
* 剩余模块抽取为一个包

```javascript{125-144} title="webpack.config.js"
const path = require("node:path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
    entry: "./src/main.js",
    output: {
        path: isProduction ? path.resolve(__dirname, "../dist") : undefined,
        filename: isProduction ? "static/js/[name].[contenthash:10].js" : "static/js/[name].js",
        // 动态导入的chunk
        chunkFilename: isProduction ? "static/js/[name].[contenthash:10].chunk.js" : "static/js/[name].chunk.js", 
        assetModuleFilename: "static/assets/[hash:10][ext][query]",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                    "css-loader",
                    "postcss-loader" // 配合postcss.config.js和browserslist
                ]
            },
            {
                test: /\.less$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.styl/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "stylus-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: "asset",
                generator: {
                    filename: "static/images/[hash:10][ext][query]",
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024
                    }
                }
            },
            {
                test: /\.(woff2|ttf)$/,
                type: "asset/resource",
                generator: {
                    filename: "static/fonts/[hash:10][ext][query]",
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false
                }
            }
        ]
    },
    plugins: [
        new EslintWebpackPlugin({
            configType: "flat",
            context: path.resolve(__dirname, "../src"),
            cache: true,
            cacheLocation: path.resolve(__dirname, "../node_modules/.cache/eslintcache"),
            // webpack官网中关于eslint-webpack-plugin中提到,需要设置eslintPath为eslint/use-at-your-own-risk
            eslintPath: "eslint/use-at-your-own-risk"
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
            // favicon: path.resolve(__dirname, "../public/favicon-32x32.png"),
        }),
        isProduction && new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash:10].css",
            chunkFilename: "static/css/[name].[contenthash:10].chunk.css"
        }),
        isProduction && new CopyWebpackPlugin({
            patterns: [
                { 
                    from: path.resolve(__dirname, "../public"),
                    to: path.resolve(__dirname, "../dist"),
                    globOptions: {
                        ignore: ["**/index.html"]
                    }
                },
            ]
        }),
        !isProduction && new ReactRefreshWebpackPlugin()
    ].filter(Boolean),
    mode: isProduction ? "production" : "development",
    devtool: !isProduction && "source-map",
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                // react react-dom react-router-dom 打包到一起
                react: {
                    test: /[/\\]node_modules[/\\]react(.*)?/,
                    name: "chunk-react",
                    priority: 20
                },
                // antd 单独打包
                antd: {
                    test: /[/\\]node_modules[/\\]antd/,
                    name: "chunk-antd",
                    priority: 20
                },
                // 其他的打包到一起
                libs: {
                    test: /[/\\]node_modules[/\\]/,
                    name: "chunk-libs",
                    priority: 10
                }
            }
        },
        runtimeChunk: {
            name: entryPoint => `runtime~${entryPoint.name}`
        },
        // 通过minimize控制minimizer
        minimize: isProduction,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin(),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options:{
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 5 }],
                            [
                                "svgo",
                                {
                                    plugins: [
                                        {
                                            name: "preset-default",
                                            params: {
                                                overrides: {
                                                    removeViewBox: false,
                                                    addAttributesToSVGElement: {
                                                        params: {
                                                            attributes: [
                                                                { xmlns: "http://www.w3.org/2000/svg" },
                                                            ],
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                }
                            ]
                        ]
                    }
                }
            })
        ]
    },
    resolve: {
        // 尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀。
        extensions: [".jsx", ".js", ".json", ".wasm"]
    },
    // 只有运行webpack serve时才会启动
    devServer: {
        host: "localhost",
        port: "8080",
        open: true,
        hot: true,
        // 当使用了react路由时,当刷新页面时会404,因为没有对应的资源;
        // 开启该功能可以当404时返回index,react会根据路径解析到正确的路由
        historyApiFallback: true
    }
}
```

打包时还会出现警告

表示入口点文件(包括所有的依赖)超过了244kib

可以通过`preformance`来配置它
```javascript title="webpack.config.js"
// ...
module.exports = {
    // ...
    // performance: false, // 直接关闭performance,不检查性能检查
    // performance: {
    //     hints: false, // 只关闭提示
    // },
    performance: {
        maxEntrypointSize: 500 * 1000 // 增大入口点大小限制
    }
}
```

