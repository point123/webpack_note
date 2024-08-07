<h1>处理js资源</h1>

`Webpack`对js的处理是有限的,只能编译`js`中的`ES模块化`语法,不能编译其他语法,可能导致js无法在旧的浏览器中运行,需要进行兼容性处理

其次, 团队开发需要代码规范

* 针对js兼容性处理,可以使用`babel`完成
* 针对代码格式,可以使用Eslint完成

### Eslint
可组装的`javascript`和`jsx`检测工具
可以用来检测js和jsx的语法,可以配置各项功能

#### 配置文件
配置文件有多种写法:
* 可以单独创建一个eslint配置文件
* 可以在`package.json`中的`eslintConfig`属性中配置
`Eslint`会自动查找和自动读取它们

#### 配置(旧版配置)
```javascript title="eslint.config.js"
module.exports = {
    // 解析选项
    parserOptions: {
        ecmaVersion: 6, // ES语法版本
        sourceType: "module", // ES模块化
        ecmaFeatures: { // ES 其他特性
            jsx: true // 如果使用react项目,需要开启jsx语法
        }
    },
    // 检测规则
    rules: {},
    // 继承规则
    extends: [],
}
```
#### 新版扁平化配置
```javascript title="eslint.config.js"
import js from "@eslint/js";
module.exports = [
    js.config.recommended,
    {
        // 解析选项
        languageOptions: {
            ecmaVersion: 6, // ES语法版本
            sourceType: "module", // ES模块化
            parserOptions: {
                ecmaFeatures: { // ES 其他特性
                    jsx: true // 如果使用react项目,需要开启jsx语法
                }
            }
        },
        // 检测规则
        rules: {},
    }
]
```
#### 新旧版本配置文件区别
* 新版:
  新版使用扁平风格配置,导出为一个数组;

  使用推荐规则,它需要下载`@eslint/js`包并且在配置文件中使用`import js from "@eslint/js"`,

  并且在配置文件中第一个元素使用`js.config.recommended`或者`js.config.all`

  `js.config.recommended`或`js.config.all`包含了eslint:recommended,~~同时包含了其他配置(gpt的回答)~~,实际查看源码仅仅导出了rules

  ~~也就是说,数组中可以仅包含`js.config.recommended`或`js.config.all`即可直接使用~~

  同时,使用新的推荐配置,废弃了`extends`选项, 想要覆盖推荐配置,在数组的第二个元素中使用一个对象,并在该对象中写入覆盖规则

  许多规则的名称和位置也发生了改变


* 旧版:
旧版通常导出为一个对象,使用`eslint:recommended`作为属性`extends`的值
##### rules规则
* `off`或`0` - 关闭规则
* `warn`或`1` - 开启规则,使用警告级别的错误: `warn`,不会导致程序退出
* `error`或`2` - 开启规则,使用错误级别的错误: `error`,会导致程序退出
```javascript title="eslint.config.js"
rules: {
    semi: "error", // 必须使用分号
    "array-callback-return": "warn", // 数组方法的回调函数中必须有return语句
    "default-case": [
        "warn", // 要求switch语句中有default分支,否则警告
        { commentPattern: "^no default$" } // 允许在最后注释no default,这样就不会产生警告
    ],
    eqeqeq: [
        'warn', // 要求使用===和!==,否则警告
        'smart' // 在特点情况下不会警告
    ]
}
```
##### extends继承
一条条写`rules`太繁琐,所以可以继承现有规则
* [Eslint官方推荐规则](https://eslint.org/docs/latest/rules/): `Eslint:recommended`(旧版) `js.configs.recommended`(新版)
* [Vue-cli官方规则](https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-eslint): `plugin:vue/essential`
* [React Cli官方规则](https://github.com/facebook/create-react-app/tree/main/packages/eslint-config-react-app): `react-app`

`react`中可以这么写配置
```javascript title="eslint.config.js"
module.exports = [
    extends: ["react-app"],
    rules: {
        // 覆盖react规则
        eqeqeq: ["warn", "smart"]
    }
]
```
#### 在Webpack中使用新版Eslint(扁平化)

1. 安装依赖
```bash
npm i -D eslint eslint-webpack-plugin @eslint/js globals @eslint/compat
```
* `eslint`: `eslint`核心,必须安装
* `@eslint/js`: 包含了`eslint`推荐规则和全部规则,推荐安装
* `globals`: 替代旧版的`env`,包含`globals.node`和`globals.browser`等,推荐安装
* `@eslint/compat`: `compat`中的`includeIgnoreFile`函数可以使用`.gitignore`文件来忽略检查文件,选择性安装
* `eslint-webpack-plugin`: `webpack`调用`eslint`插件,必须安装

2. 创建并配置eslint文件
```javascript title="eslint.config.js"
// eslint预设,包含recommended和all,recommended中包含了eslint:recommended,该包需要单独下载
const js = require('@eslint/js'); 
// globals取代了env配置,不使用globals.node,会导致配置文件中由于commonjs而引发eslint警告,该包需要单独下载
const globals = require("globals");
// compat中的includeIgnoreFile将.gitignore中的文件忽略校验,需要单独安装
const compat = require("@eslint/compat"); 
const path = require("node:path");

module.exports = [
    js.configs.recommended,
    compat.includeIgnoreFile(path.resolve(__dirname, ".gitignore")),
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node,
                ...globals.browser
            }
        }
    }
]
```

3. 配置webpack文件
```javascript{18-23} title="webpack.config.js"
const path = require("node:path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");

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
    plugins: [
        new EslintWebpackPlugin({
            // 默认值为eslintrc,需要修改为flat扁平化配置,否则会报错无法找到配置文件
            configType: "flat", 
            // 只检查src目录
            context: path.resolve(__dirname, "src"), 
        })
    ],
    // loader加载器
    module: {
        // loader的配置
        rules: [
            /// ... 省略
        ],
    },
    // 模式
    mode: "development"
}
```


#### 在Webpack中使用旧版Eslint
1. 安装依赖
```bash
npm i -D eslint eslint-webpack-plugin
```

2. 创建并配置eslint文件
```javascript title="eslint.config.js"
module.exports = {
    // 继承 Eslint 规则
    extends: ["eslint:recommended"],
    env: {
      node: true, // 启用node中全局变量
      browser: true, // 启用浏览器中全局变量
    },
    parserOptions: {
      ecmaVersion: 6,
      sourceType: "module",
    },
    rules: {
      "no-var": 2, // 不能使用 var 定义变量
    },
};
```
3. 配置webpack文件
```javascript{18-21} title="webpack.config.js"
const path = require("node:path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");

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
    plugins: [
        new EslintWebpackPlugin({
            // 只检查src目录
            context: path.resolve(__dirname, "src"), 
        })
    ],
    // loader加载器
    module: {
        // loader的配置
        rules: [
            /// ... 省略
        ],
    },
    // 模式
    mode: "development"
}
```

#### vscode中的eslint插件
`vscode`扩展中安装`eslint`扩展,它能读取项目中的`eslint`配置文件,并且能实时的校验代码


### Babel

用于将`ES2015`+的语法转换为向下兼容的语法,以便在多数浏览器重能够运行

#### 配置文件
```javascript title="babel.config.js"
module.exports = {
    presets: ["@babel/preset-env"]
}
```

#### 在Webpack中使用
1. 安装依赖
```bash
npm i -D babel-loader @babel/core @babel/preset-env
```
* `@babel/core`: `babel`的核心库
* `@babel/preset-env`: `babel`的官方预设
* `@babel-loader`: `Webpack`中使用`babel`所依赖的`loader`

2. 配置webpack文件
```javascript{87-97} title="webpack.config.js"
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
    plugins: [
        // 省略
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
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除node_modules中的js文件/
                use: {
                    loader: "babel-loader",
                    // babel的配置项
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ],
    },
    // 模式
    mode: "development"
}
```
对于`babel-loader`这一rules,也可以写成,省略外层的use
```javascript title="webpack.config.js"
{
    test: /\.js$/,
    exclude: /node_modules/, // 排除node_modules中的js文件/
    loader: "babel-loader",
    options: {
        presets: ["@babel/preset-env"]
    }
}
```

同时,也可以将配置单独写为babel配置文件,webpack会读取配置文件

#### 使用babel配置文件
:::: code-group
::: code-group-item babel.config.js

```javascript title="babel.config.js"
module.exports = {
    presets: ["@babel/preset-env"]
}
```
:::
::: code-group-item webpack.config.js
```javascript title="webpack.config.js"
{
    test: /\.js$/,
    exclude: /node_modules/, // 排除node_modules中的js文件/
    loader: "babel-loader",
}
```
:::
::::

### 使用browserslist
按照上面的配置如果直接运行,可能会发现输出的语法没有变化,为了展示效果,可以设置需要兼容的浏览器版本

可以直接在`package.json`中添加`browserslist`属性
```json{15-19} title="package.json"
{
    "name": "webpack_note",
    "version": "1.0.0",
    "main": "index.js",
    "scripts": {
        // 省略
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "description": "",
    "devDependencies": {
        // 省略
    },
    "browserslist": [
        ">1%",
        "not dead",
        "ie>=8"
    ]
}
```
也可以创建单独的`browserslist`或`.browserslistrc`配置文件,webpack会读取配置文件
```plaintext title="browserslist"
> 1%
not dead
ie >=8
```

