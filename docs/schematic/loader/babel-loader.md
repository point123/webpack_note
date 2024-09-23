<h1>babel-loader</h1>

```javaScript
const babel = require("@babel/core");

module.exports = function(content, map, meta) {
    // 异步loader
    const callback = this.async();
    
    const schema = {
        type: "object",
        properties: {
            presets: {
                type: "array"
            }
        },
        // 允许添加其他配置项
        additionalProperties: true
    }
    // 获取babel的配置项
    const options = this.getOptions(schema);
    // 使用@Babel/core的transform对js进行编译
    babel.transform(content, options, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result.code, map, meta);
        }
    });
    
}
```

```javascript title="webpack.config.js"
module.exports = {
    // ...
    module: {
        rules: [
            // ...
            {
                test: /\.js$/,
                use: ["./loaders/babel-loader"],
                options: {
                    presets: ["@babel/preset-env"]
                }
            }
        ]
    }
}
```

通过`@babel/core`对`js`进行处理