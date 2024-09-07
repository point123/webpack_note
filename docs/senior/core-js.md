<h1>core-js</h1>

`babel`能将`ES6`的语法进行转换,但是无法处理`async`等内容

需要使用`core-js`

安装
```bash
npm i core-js
```

全部引入
```javascript index.js
import "core-js";
// ...
```
直接在入口文件引入完整的`core-js`,但是会导致打包后的文件变大,且许多代码并没有使用

按需引入
```javascript
import "core-js/stable/promise"
```
需要使用什么,就手动引入什么,但是这样太麻烦

使用`babel`按需引入
```javascript title="babel.config.js"
module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "usage",
                corejs: "3"
            }
        ],
    ]
}
```
对`@babel/preset-env`进行配置,将自动按需引入


对于`useBuiltIns`的值

* 如果是`entry`,则需要在入口文件完整的引入`core-js/stable`

* 如果是`usage`必须指定`core.js`版本(推荐)
    使用`usage`,则需要配置`webpack`在使用`babel`对`js`进行处理时,排除`node_modules`
    否则打包时会报错
    ```bash
    ERROR in ./node_modules/core-js/modules/web.dom-collections.iterator.js 3:0
    Module parse failed: 'import' and 'export' may app
    File was processed with these loaders:
    ./node_modules/babel-loader/lib/index.js
    ```

如果使用异步函数和生成器,且使用的`@babel/core`或者`@babel/plugin-transform-regenerator`版本早于`7.18.0`,则还必须加载[`regenerato-runtime/runtime`](https://github.com/facebook/regenerator/tree/main)

当使用`@babel/preset-env`并配置`useBuiltIns`为`usage`或者使用[`@babel/plugin-transform-regenerator`](./babel.md#使用)时,会自动加载`regenerator-runtime/runtime`

已经废弃的`@babel/polyfill`就是`core-js`和`regenerator-runtime`的集合

只有当`@babel/core`或者`@babel/plugin-transform-regenerator`版本早于`7.18.0`且未使用`@babel/plugin-transform-regenerator`且没有配置`useBuiltIns: "usage"`时,需要手动导入`regenerato-runtime/runtime`

下标来源`gpt`,未验证
| `@babel/core`版本 | `@babel/plugin-transform-regenerator`版本 | 使用`builtIns:"usage"` | 使用`@babel/plugin-transform-regenerator` | 需要手动导入 |
| --- | --- | --- | --- | --- |
| `< 7.18.0`  | `< 7.18.0`  | 否 | 否 | 是 |
| `< 7.18.0`  | `< 7.18.0`  | 是 | 否 | 否 |
| `< 7.18.0`  | `< 7.18.0`  | 否 | 是 | 否 |
| `< 7.18.0`  | `< 7.18.0`  | 是 | 是 | 否 |
| `< 7.18.0`  | `>= 7.18.0` | 否 | 否 | 否 |
| `< 7.18.0`  | `>= 7.18.0` | 是 | 否 | 否 |
| `< 7.18.0`  | `>= 7.18.0` | 否 | 是 | 否 |
| `< 7.18.0`  | `>= 7.18.0` | 是 | 是 | 否 |
| `>= 7.18.0` | `< 7.18.0`  | 否 | 否 | 否 |
| `>= 7.18.0` | `< 7.18.0`  | 是 | 否 | 否 |
| `>= 7.18.0` | `< 7.18.0`  | 否 | 是 | 否 |
| `>= 7.18.0` | `< 7.18.0`  | 是 | 是 | 否 |
| `>= 7.18.0` | `>= 7.18.0` | 否 | 否 | 否 |
| `>= 7.18.0` | `>= 7.18.0` | 是 | 否 | 否 |
| `>= 7.18.0` | `>= 7.18.0` | 否 | 是 | 否 |
| `>= 7.18.0` | `>= 7.18.0` | 是 | 是 | 否 |