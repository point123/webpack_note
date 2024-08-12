<h1>HotModuleReplacement</h1>

### 概念

~~开发时修改了一个模块代码,`Webpack`默认会将所有模块全部重新打包编译,速度很慢~~

~~当修改某个模块代码,只对这个模块重新打包编译,其他模块不变,能提升打包速度~~

当修改了某个模块代码,浏览器会重新刷新页面

`HotModuleReplacement`(`HMR`/热模块替换): 在程序运行中, 替换、添加、删除模块而无需重载整个页面

### 使用

1. 配置文件
```javascript{11} title="webpack.dev.js"
// webpack开发模式配置
const { merge } = require('webpack-merge');
const WebpackCommonConfig = require("./webpack.common");

module.exports = merge(WebpackCommonConfig, {
    mode: 'development',
    devtool: "eval-cheap-module-source-map",
    devServer: {
        host: "0.0.0.0",
        port: "auto",
        hot: true // 开启HMR,默认就是开启的
    },
});
```

此时,`style-loader`或`min-css-extract-plugin`以自动支持HMR,无需手动配置;但是`js`还不行

2. 使js支持HMR

```javascript{13-18} title="main.js"
import { sum } from "./js/sum";
import { count } from "./js/count";
import "./css/style.css";
import "./less/style.less";
import "./scss/style.scss"
import "./scss/style.sass";
import "./stylus/style.styl";
import "./css/iconfont.css";

console.log(sum(2, 3));
console.log(count(3, 2));

if (module.hot) {
    module.hot.accept("./js/sum.js");
    module.hot.accept("./js/count.js", function () {
        log("热更新后执行的函数");
    });
}
```

许多框架的`loader`实现了`HMR`,可以减少手动配置
* [Vue-Loader](https://github.com/vuejs/vue-loader): 实时调整`react`组件
* [React-hot-loader](https://github.com/gaearon/react-hot-loader): 支持`vue`组件的 HMR
