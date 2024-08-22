<h1>image minimize</h1>

当项目本地中引入了大量的图片,会使体积增大,影响请求速度

可以对图片进行压缩,减小图片体积

可以使用`image-minimizer-webpack-plugin`插件对图片进行压缩

这个插件支持使用两种工具来压缩图片

* `imagemin`: 默认情况下优化图片,稳定且支持所有类型的图片
* `squoosh`: 实验模式下支持`.jpg`,`.jpeg`,`.png`,`.webp`,`.avif`类型的图片

`imagemin`依赖扩展插件压缩图片
* `imagemin-pngquant`

    有损压缩,基于`pngquant`

    通过减少颜色数量,如从24位色(可以包含2^24^种颜色)减少到8位色(只能包含2^8^种颜色)来压缩图像

    压缩率高,可能引起图像质量损失

* `imagemin-optipng`

    无损压缩,基于`optipng`

    优化`png`图像的参数,如色彩深度(当图像仅使用256种或更少种颜色时,将24位色优化为8位色)、压缩等级等

    不能像`pngquant`那样显著减小文件大小,但能保证图像质量

* `imagemin-jpegtran`

    无损压缩,基于`jpegtran`

    进行无损优化,重排`JPEG`图像数据,去除不必要的元数据,并优化`JPEG`的编码方式

    不会对图像质量造成任何影响,它不会改变图像的实际内容或色彩信息

* `imagemin-mozjpeg`

    可以有损压缩也可以无损压缩,主要进行有损压缩

    `mozjpeg`是`Mozilla`开发的高级`JPEG`压缩工具,在标准的`JPEG`压缩基础上引入额外优化,如`trellis quantization`和`progressive encoding`

    能够在保持较高的视觉质量的前提下实现更高的压缩比,可能图像在视觉上几乎无损但实际丢失一些数据
* `imagemin-gifsicle`

    可以有损压缩也可以无损压缩,基于`gifsicle`

    与其他格式的图像不同,`GIF`通常用于简单的动画和静态图像,并且具有有限的色彩深度(通常256种颜色)

    减少颜色数量(可能影响图像质量)、删除不必要的元数据(注释和应用程序扩展块)、移除冗余帧、优化动画顺序、优化每一帧的存储方式、优化编码方式和去除冗余数据进行无损压缩
* `imagemin-svgo`

    无损压缩,基于`svgo`

    删除冗余数据: 移除不必要的XML元素,注释,空格,换行和未使用的定义等减少体积

    简化路径数组: 优化和压缩路径数据,减少控制点和简化路径减少体积

    删除无用属性: 去除与显示无关的属性,如`id`,`class`,`data-*`,在某些情况下它们可能是多余的

    合并和优化形状: 可以将合并的路径或形状组合在一起,减少文件复杂度和大小

    精简颜色和样式: 优化颜色值,移除多余的`fill`和`stroke`属性

    去除未使用的定义: 删除未使用的`defs`、`clipPath`、`mask`等元素

### 安装插件
```bash
npm i -D image-minimizer-webpack-plugin
```

### 使用imagemin进行压缩

安装无损压缩的插件
```bash
npm i -D imagemin-optipng imagemin-jpegtran imagemin-gifsicle imagemin-svgo
```

配置
```javascript title="webpack.common.js"
// ... 省略
const ImageMinimizerWebpackPlugin = require("image-minimizer-webpack-plugin");
module.exports = {
    // ... 省略
    optimization: {
        minimizer: [
            // ... 省略
            new ImageMinimizerWebpackPlugin({
                minimizerOptions: {
                    plugins: [
                        ["gifsicle", { interlaced: true }],
                        ["jpegtran", { progressive: true }],
                        ["optipng", { optimizationLevel: 5 }],
                        [
                            "svgo",
                            {
                                plugins: extendDefaultPlugins([
                                    {
                                        name: "removeViewBox",
                                        active: false
                                    },
                                    {
                                        name: "addAttributesToSVGElement",
                                        params: {
                                            attributes: [{ xmlns: "http://www.w3.org/2000/svg" }]
                                        }
                                    }
                                ])
                            }
                        ]
                    ]
                }
            })
        ]
    }
}
```

### 使用squoosh进行压缩