<h1>banner-webpack-plugin</h1>

通过配置文件可以给插件传递一个配置对象,这个对象会作为插件构造函数的参数

1. 获取即将输出的资源

2. 过滤只保留js和css

3. 遍历剩余资源添加注释

`compilation.assets`可以获取到资源对象,`key`为文件名称,`value`为具体内容,具体内容的原型对象上存在`source()`,可以访问到资源内容;同时存在`size()`,表示资源大小。

* webpack.config.js
```javascript
// ...
module.exports = {
    // ...
    plugins: [
        // ...
        new BannerWebpackPlugin({
            author: "xxx"
        })
    ]
}
```

* banner-webpack-plugin.js
```javascript
module.exports = class BannerWebpackPlugin {
    constructor(options = {}) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync("1", (compilation, callback) => {
            Object.keys(compilation.assets).filter(item => /\.(?:js|css)$/.test(item)).forEach(item => {
                
                const content = `/**\n* Author: ${this.options.author}\n*/\n` + compilation.assets[item].source();
                
                compilation.assets[item] = {
                    source() {
                        return content;
                    },

                    size() {
                        return content.length;
                    }
                }
            })
            callback();
        });
    }
}
```