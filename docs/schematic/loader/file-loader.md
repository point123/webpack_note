<h1>file-loader</h1>

安装依赖
```bash
npm i -D loader-utils
```

```javascript
const loaderUtils = require('loader-utils');

function fileLoader(content, map, meta) {
    // 生成hash值文件名, 如28sad921fa2.jpg
    // 可以修改生成的位置, 如images/28sad921fa2.jpg
    const interpolateName = loaderUtils.interpolateName(
        this,
        "[hash].[ext][query]",
        {
            content
        }
    )
    // 将文件输出
    this.emitFile(interpolateName, content);
    // 返回"module.exports = 文件路径"
    this.callback(null, `module.exports = "${interpolateName}"`)
}

fileLoader.raw = true;

module.exports = fileLoader;
```

默认情况下,`webpack`也会对图片处理,导致生成了重复的图片,可以使用`type: "javascript/auto"`阻止`webpack`的处理

```javascript title="webpack.config.js"
module.exports = {
    // ...
    module: {
        rules: [
            // ...
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: ["./loaders/file-loader"],
                type: "javascript/auto"
            }
        ]
    }
}
```