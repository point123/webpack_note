<h1>clean-webpack-plugin</h1>

将上次的内容清除

```javascript
module.exports = class CleanWebpackPlugin {
    
    constructor() {}

    // 在输出前清空输出目录
    // 通过compiler获取打包目录
    // 通过compiler.outputFileSystem操作文件
    apply(compiler) {
        compiler.hooks.emit.tapAsync("1", (compilation,callback) => {
            const outputPath = compiler.outputPath || compiler.options.output.path;
            this.removeFiles(compiler.outputFileSystem, outputPath);
        })
    }

    removeFiles(fs, path) {
        // 删除一个目录,需要将目录下所有文件删除
        // 1.读取当前目录下所有资源
        fs.readdirSync(path).forEach(file => {
            const filePath = `${path}/${file}`;
            // 2. 遍历所有文件,判断是文件还是文件夹
            const isDir = fs.statSync(filePath).isDirectory();
            // 是文件夹
            if (isDir) {
                this.removeFiles(fs, filePath);
                // TODO: 删除空目录
            }
            else {
                fs.unlinkSync(filePath);
            }
        })
    }
}
```