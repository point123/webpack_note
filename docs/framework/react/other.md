<h1>其他配置</h1>

* `eslint.config.js`
```javascript title="eslint.config.js"
const globals = require("globals");
const reactPlugin = require("eslint-plugin-react");

module.exports = [
    {
        // 对哪些文件检查
        files: ["src/**/*.js", "src/**/*.jsx"],
        plugins: {
            // 使用eslint-plugin-react插件,react特定规则
            react: reactPlugin
        },
        languageOptions: {
            sourceType: "module",
            parserOptions: {
                // 支持jsx特性
                ecmaFeatures: {
                    jsx: true
                }
            },
            globals: {
                ...globals.node,
                ...globals.browser
            }
        }
    }
]
```

* `babel.config.js`
```javascript title="babel.config.js"
module.exports = {
    // react-app 预设包含了core-js以及@babel/plugin-transform-runtime等插件
    // 包括了create react app使用的babel预设
    // 来自babel-preset-react-app
    presets: ["react-app"],
    // 自动开启js和jsx的HMR,配合@pmmmwh/react-refresh-webpack-plugin使用
    plugins: ["react-refresh/babel"]
}
```

* `postcss.config.js`
```javascript title="postcss.config.js"
module.exports = {
    // postcss 预设
    plugins: ["postcss-preset-env"]
}
```

* `browserslist`
```text title="browserslist"
> 0.5%, not dead
```

* `package.json`
```json title="package.json"
{
    "name": "webpack_react_cli",
    "version": "1.0.0",
    "main": "index.js",
    "scripts": {
        "dev": "cross-env NODE_ENV=development webpack serve --config ./config/webpack.dev.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "description": "",
    "devDependencies": {
        "@babel/core": "^7.25.2",
        // 由于create react app 停止更新, babel-preset-react-app依赖的@babel/plugin-proposal-private-property-in-object不再更新,出现未声明依赖错误
        // 需要手动更新该依赖
        "@babel/plugin-proposal-private-property-in-object": "^7.21.11",
        // 自动开启js的hmr,配合react-refresh使用
        "@pmmmwh/react-refresh-webpack-plugin": "^0.5.15",
        "babel-loader": "^9.1.3",
        // babel的react预设
        "babel-preset-react-app": "^10.0.1",
        // 设置NODE_ENV,否则报错
        "cross-env": "^7.0.3",
        "css-loader": "^7.1.2",
        "eslint": "^8.57.0",
        // eslint的react预设插件
        "eslint-plugin-react": "^7.35.2",
        "eslint-webpack-plugin": "^4.2.0",
        "globals": "^15.9.0",
        "html-webpack-plugin": "^5.6.0",
        "less-loader": "^12.2.0",
        "postcss-loader": "^8.1.1",
        "postcss-preset-env": "^10.0.2",
        // 自动开启js的hmr
        "react-refresh": "^0.14.2",
        "sass": "^1.78.0",
        "sass-loader": "^16.0.1",
        "style-loader": "^4.0.0",
        "stylus-loader": "^8.1.0",
        "webpack": "^5.94.0",
        "webpack-cli": "^5.1.4",
        "webpack-dev-server": "^5.1.0"
    },
    "dependencies": {
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        // react路由
        "react-router-dom": "^6.26.1"
    }
}
```