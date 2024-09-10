<h1>生产模式配置</h1>

```javascript title="webpack.prod.js"
const path = require("node:path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "static/js/[name].[contenthash:10].js",
        chunkFilename: "static/js/[name].[contenthash:10].chunk.js", // 动态导入的chunk
        assetModuleFilename: "static/assets/[hash:10][ext][query]",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader" // 配合postcss.config.js和browserslist
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.styl/,
                use: [
                    MiniCssExtractPlugin.loader,
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
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash:10].css",
            chunkFilename: "static/css/[name].[contenthash:10].chunk.css"
        }),
        new CopyWebpackPlugin({
            patterns: [
                { 
                    from: path.resolve(__dirname, "../public"),
                    to: path.resolve(__dirname, "../dist"),
                    globOptions: {
                        ignore: ["**/index.html"]
                    }
                },
            ]
        })
    ],
    mode: "production",
    devtool: false,
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        runtimeChunk: {
            name: entryPoint => `runtime~${entryPoint.name}`
        },
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
    }
}
```

对于区别于开发模式配置,生产模式配置删除了以下内容
* `devServer`配置
* `plugins`中的`react-refresh-webpack-plugin`

新增了以下内容
* `optimization.minimizer`中
  * `css-minimizer-webpack-plugin`
  * `terser-webpack-plugin`
  * `image-minimizer-webpack-plugin`
* `plugins中`
  * `mini-css-extract-plugin`
  * `copy-webpack-plugin`

修改了以下内容
* `devtool`
* `mode`

::: tip
在使用`copy-webpack-plugin`时,需要在`copy-webpack-plugin.patterns`中配置`globOptions.ignore`来忽略和`index.html`,否则会因为`html-webpack-plugin`而报错

如果同时使用了`html-webpack-plugin`指定`favicon`,还需要在`copy-webpack-plugin`中忽略`favicon`文件,或者不通过`html-webpack-plugin`配置`favicon`
:::