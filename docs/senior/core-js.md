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

            // 如果是entry,则需要在入口文件完整的引入core-js/stable
            /* 使用usage必须指定core.js版本
                如果使用async函数和generator函数,则还要安装regenerator-runtime/runtime
                已经废弃的@babel/polyfill就是core-js和regenerator-runtime的集合
                所以这里要手动安装core-js,否则babel只能转换代码,直接运行会报错
                如果babel和 transform-regenerator版本都大于7.18;在usage情况下
                    则不用在入口文件导入core-js/stable和regenerator-runtime/runtime
                    否则仍需要导入regenerator-runtime/runtime
             */