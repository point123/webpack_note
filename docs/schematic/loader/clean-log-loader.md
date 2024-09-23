<h1>clean-log-loader</h1>

清除`js`代码中的`console.log`

```javascript
module.exports = function(content, map, meta) {
    // 关键为 /console\.log\(.*?\);?/g, 这里把换行符也去除了
    const regex = /(?:\n)?console\.log\(.*?\);?(?:\n)?/g
    return content.replaceAll(regex, '');
}
```