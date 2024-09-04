<h1>network cache</h1>

浏览器能够缓存静态资源来优化,当二次请求时,能很快的读取

如果文件的名称始终一致,如果更新,因为文件名没有变化,浏览器会直接读取缓存不会加载新资源

可以使用`webpack`(内部的`TemplatedPathPlugin`)提供的可替换模板字符串(substitution)中的`hash`

* fullhash
    在编译层面进行替换

    每修改任何一个文件,所有文件名的`hash`值都会改变,一旦修改了任何一个文件,整个项目的文件缓存都会失效
* chunkhash
    在`chunk`层面进行替换

    根据不同的入口文件进行依赖文件解析,构建对应的`chunk`,生成对应的`hash`值。如果`js`和`css`是同一个引入,则共享同一个哈希值
* contenthash
    在`chunk`层面进行替换

    根据文件内容生成哈希值,只有文件内容变化了,`hash`值才会变化,所有`hash`值是不同的

当使用`contenthash`时,如果修改了某个文件,那么它的哈希值发生了变化

但是引用这个文件的模块的哈希值也发生了变化,导致它的缓存也失效

因为引用模块时包含了模块的名称,所有当修改了文件,引入的文件名也会改变,从而也改变了自身内容,导致缓存失效

可以将`hash`值单独保存在一个`runtime`文件中

当模块变化时,模块和`runtime`的`hash`值会变化,而引入它的模块不会改变`hash`值

`runtime`只保存文件的`hash`值和它们与文件的关系,文件体积较小

```javascript title="webpack.common.js"
// ...
module.exports = {
    // ...
    optimization: {
        minimizer: [
            // ...
        ],
        splitChunks: {
            chunks: "all"
        },
        runtimeChunk: {
            name: entrypoint => `runtimechunk~${entrypoint.name}`
        }
    }
}
```
或者使用`runtimeChunk:"single"`,对于单入口,它们没有差别