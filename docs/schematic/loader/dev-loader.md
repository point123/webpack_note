<h1>开发一个loader</h1>

### 最简单的loader
在根目录创建一个`loaders`目录用于存放自定义`loader`
```javascript title="first-loader.js"
module.exports = function(content, map, meta) {
    console.log(content);
    return content;
}
```

`loader`就是一个函数,当`webpack`解析资源时调用相同的loader处理

`loader`接收文件内容作为参数,返回处理后的文件内容

### loader的参数
* `content`: 文件内容
* `map`: 文件的`SourceMap`,
* `meta`: 其他`loader`传递的数据