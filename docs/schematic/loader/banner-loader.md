<h1>banner-loader</h1>

给`js`文件开头添加注释

```javascript
module.exports = function(content, map, meta) {
    // json-schema
    const schema = {
        // option需要为一个对象
        type: "object",
        // 对象的属性值
        properties: {
            // 属性author
            "author": {
                // 类型可以为对象或者字符串
                type: ["object", "string"],
                // 类型为对象时的属性值
                properties: {
                    name: {
                        type: "string"
                    },
                    email: {
                        type: "string"
                    }
                }
            }
        },
        // 是否支持额外属性(未在上面定义的)
        additionalProperties: false
        // additionalProperties: {
        //     type: "string"
        // }
    }
    // 获取options
    const options = this.getOptions(schema);
    // 获取options中的值
    const author = options.author ?? name;
    // 如果已经有注释或则没有设置作者,则直接返回
    if (content.startsWith("/**") || !author) {
        this.callback(null, content, map, meta);
    }
    // 否则添加注释
    const result = `/**\n* author: ${author}\n* /\n${content}`;
    console.log(result);
    return result
    
}
```

::: warning
该`loader`会在文件顶部生成注释, 导入的样式文件,资源文件等内容会失效
:::

关于`schema`的更多内容查看[文档](https://json-schema.org/overview/what-is-jsonschema),[中文文档](https://json-schema.apifox.cn/)