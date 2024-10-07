<h1>inline-chunk-wbepack-plugin</h1>

`webpack`打包生成的`runtime`文件太小了将其内联到`js`中,从而减少请求数量

需要借助`html-webpack-plugin`来实现

在`html-webpack-plugin`输出`index.html`前将内联`runtime`注入进去

删除多余的`runtime`文件

(html-webpack-plugin文档)[https://github.com/jantimon/html-webpack-plugin/#afteremit-hook]

* webpack.config.js
```javascript
const InlineChunkWebpackPlugin = require("./plugins/inline-chunk-webpack-plugin");
// ...
module.exports = {
    // ...
    plugins: [
        // ...
        new InlineChunkWebpackPlugin([/runtime(.*?)\.js$/g])
    ]
}
```

* inline-chunk-webpack-plugin.js
```javascript
// safe-require也需要安装
const HtmlWebpackPlugin = require("safe-require")("html-webpack-plugin");

module.exports = class InlineChunkWebpackPlugin {
    constructor(regex) {
        this.regex = regex;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap("1", (compilation) => {
            // 1获取html-webpack-plugin的hooks
            // 2注册html-webpack-plugin的alterAssetTagGroups这一hooks
            // 3将script的runtime文件,变为inline script
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tap("2", (assets) => {
                assets.headTags = this.getInlineChunk(assets.headTags, compilation.assets);
                assets.bodyTags = this.getInlineChunk(assets.bodyTags, compilation.assets);
            })

            // 删除runtime文件
            HtmlWebpackPlugin.getHooks(compilation).afterEmit.tap("1", () => {
                Object.keys(compilation.assets).forEach(filepath => {
                    if (this.regex.some(reg => reg.test(filepath))) {
                        delete compilation.assets[filepath];
                    }
                })
            })
        })
    }

    getInlineChunk(tags, assets) {
        return tags.map(tag => {
            if (tag.tagName !== "script") {
                return tag;
            }
            const filepath = tag.attributes.src;
            if (!filepath) {
                return tag;
            }
            if (!this.regex.some(reg => reg.test(filepath))) {
                return tag;
            }
            return {
                tagName: "script",
                closeTag: true,
                innerHtml: assets[filepath].source()
            }
        })
    }
}
```