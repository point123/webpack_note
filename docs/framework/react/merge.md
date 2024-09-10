<h1>合并配置</h1>

* 通过`webpack-merge`插件合并配置,详见[生产模式介绍](../../base/production-mode.md#使用多个配置文件)
* 通过`cross-env`设置的`process.env.NODE_ENV`进行判断
```javascript title="webpack.config.js"
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
            chunks: "all"
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
