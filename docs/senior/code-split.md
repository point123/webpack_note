<h1>code solit</h1>

打包代码时会将所有`js`打包到一个文件中,体积太大;

如果只渲染首页,可以只加载首页的js文件,其他文件不应该加载

代码分割做了两件事:

* 1.分割文件
* 2.按需加载

### 多入口
新增入口文件
```
|- src
|   |-main.js
|   |_app.js
```

修改配置
```javascript title="webpack.config.js"
// ... 省略
module.exports = {
    // entry: "./src/main.js",
    entry: {
        index: "./src/index.js",
        app: "./src/app.js"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        // filename指定输出文件名,使用chunk的name作为输出名称
        // 打包的资源为chunk,输出的叫bundle
        filename: "[name].bundle.js",
        clean: true
    },
    // ... 省略
}
```

#### entry的值
* 一个字符串
    如`./src/app.js`,仅使用`app.js`作为一个入口文件,`chunk`名称为`main`
* 一个字符串数组
    如`["./src/main.js", "./src/app.js"]`,只有一个文件且`chunk`名称为`main`
* 一个对象,则使用每个`key`作为`chunk`名,对象的值可以为
    * 字符串
    * 字符串数组
    * 对象(descriptor)
        使用`import`指定入口文件
        使用`filename`指定输出,如`pages/app.js`将输出到`dist/pages/app.js`

output中的filename是全局配置,entry中的filename可以理解为局部配置,可以覆盖全局配置;支持相同的占位符,output.filename默认值为`[name].js`