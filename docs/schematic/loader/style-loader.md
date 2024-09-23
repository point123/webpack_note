<h1>style-loader</h1>

`style-loader`生成一个`style`标签插入到页面中实现样式的加载

* `webpack.config.js`
```javascript
// ...
module.exports = {
    // ...
    module: {
        rules: [
            // ...
            {
                test: /\.css$/,
                use: ["./loaders/style-loader", "css-loader"]
            }
        ]
    }
}
```

`style-loader`的核心代码为:
```javascript
module.exports = function(content) {
    return `const ele = document.createElement("style");
        ele.innerHTML = ${content};
        document.head.appendChild(ele)`;
}
```
将整个创建标签并插入的代码作为字符串,当`bundle`在浏览器中执行时通过`eval`执行这段代码

但是如果样式中引入了其他资源路径(图片等),会原封不动的输出,导致找不到这些资源

而`css-loader`能够处理这些资源,并将它们作为`js`代码的字符串返回

* `style-loader.js`
```javascript
module.exports = function(content) {}
module.exports.pitch = function(remainingRequest, precedingRequest, data) {
    // 创建一个inline loader
    // ..\node_modules\css-loader\dist\cjs.js!.\style.css
    const path = remainingRequest.split("!").map(path => 
        this.utils.contextify(this.context, path)
    ).join("!");

    const script = `
        import style from "!!${path}";
    
        const ele = document.createElement("style");
        ele.innerHTML = style;
        document.head.appendChild(ele);
    `
    return script;
}
```