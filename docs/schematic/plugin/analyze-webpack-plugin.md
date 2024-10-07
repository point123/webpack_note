<h1>analyze-webpack-plugin</h1>

分析`webpack`打包资源大小,并输出分析文件

```javascript
module.exports = class AnalyzeWebpackPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap("1", compilation => {
            const content = "| 资源名称 | 资源大小 |\n| --- | --- |\n";
            // 遍历所有即将输出的文件,得到文件大小
            Object.entries(compilation.assets).forEach(([filename, file]) => {
                content += `| ${filename} | ${file.size()} |\n`
            });

            compilation.assets["analyze.md"] = {
                source() {
                    return content;
                },

                size() {
                    return content.length;
                }
            }
        });
    }
}
```