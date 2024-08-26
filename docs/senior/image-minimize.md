<h1>image minimize</h1>

当项目本地中引入了大量的图片,会使体积增大,影响请求速度

可以对图片进行压缩,减小图片体积

可以使用`image-minimizer-webpack-plugin`插件对图片进行压缩

这个插件支持使用以下工具来压缩图片

* `imagemin`: 默认情况下优化图片,稳定且支持所有类型的图片
* `squoosh`(已弃用): 实验模式下支持`.jpg`,`.jpeg`,`.png`,`.webp`,`.avif`类型的图片
* `sharp`: 高性能`Noje.js`图像处理,是调整和压缩`JPEG`,`PNG`,`WebP`,`AVIF`,`TIFF`图像的最快模块,它使用`libvips`库
* `svgo`: 用于优化`svg`的工具,仅支持`.svg`,`imagemin`中也存在`imagemin-svgo`插件

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
安装压缩生成工具
```bash
npm i -D imagemin
```

安装`imagemin`进行无损压缩所需要的插件
```bash
npm i -D imagemin-optipng imagemin-jpegtran imagemin-gifsicle imagemin-svgo
```

::: tip
在安装这些插件的过程中,可能会出现因为无法解析`raw.githubusercontent.com`安装失败

需要解析`raw.githubusercontent.com`的`ip`(如`ip138`)并添加到`hosts`文件中

修改`windows/system32/drivers/etc/hosts`文件并设置`185.199.111.133 raw.githubusercontent.com`
:::

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
                // 旧的写法,已经失效(docschina中仍然使用这种方式)
                // minimizerOptions: {
                //     plugins: []
                // }
                // 新写法
                minimizer: {
                    implementation: ImageMinimizerWebpackPlugin.imageminMinify,
                    options: {
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
                }
            })
        ]
    }
}
```

::: tip 
运行时有可能出现如下错误
```bash
Error: Error with 'src\images\1.jpeg': '"C:\Users\86176\Desktop\webpack\webpack_code\node_modules\jpegtran-bin\vendor\jpegtran.exe"'
Error with 'src\images\3.gif': spawn C:\Users\86176\Desktop\webpack\webpack_code\node_modules\optipng-bin\vendor\optipng.exe ENOENT
```
这是安装插件时没有成功把`.exe`下载来导致的

可以去官方网站下载并手动移动到指定位置

[jpegtran.exe](https://jpegclub.org/jpegtran/)

放置到`node_modules/jpegtran-bin/vendor`中

[optipng.exe](https://optipng.sourceforge.net/)

放置到`node_modules/optipng-bin/vendor`中
:::

### 使用squoosh进行压缩(已弃用)

英文官网已经弃用

安装依赖
```bash
npm i -D @squoosh/lib
```
推荐使用`@squoosh/lib`并使用默认选项进行有损压缩
```javascript title="webpack.common.js"
// ... 省略
const ImageMinimizerWebpackPlugin = require("image-minimizer-webpack-plugin");
module.exports = {
    // ... 省略
    optimization: {
        minimizer: [
            // ... 省略
            new ImageMinimizerWebpackPlugin({
                // 以前的写法
                // minify: ImageMinimizerWebpackPlugin.squooshMinify
                // 现在的写法: squoosh 依赖于 node 14,16版本
                minimizer: {
                    implementation: ImageMinimizerWebpackPlugin.squooshMinify,
                }
            })
        ]
    }
}
```

推荐使用`squoosh`选项和`minimizerOptions.encodeOptions`进行无损压缩
```javascript title="webpack.common.js"
// ... 省略
const ImageMinimizerWebpackPlugin = require("image-minimizer-webpack-plugin");
module.exports = {
    // ... 省略
    optimization: {
        // ... 省略
        new ImageMinimizerWebpackPlugin({
            minify: ImageMinimizerWebpackPlugin.squooshMinify,
            minimizerOptions: {
                encodeOptions: {
                    mozjpeg: {
                        // 该设置接近无损,但无法保证
                        // https://github.com/GoogleChromeLabs/squoosh/issues/85
                        quality: 100
                    },
                    webp: {
                        lossless: 1
                    },
                    avif: {
                        // https://github.com/GoogleChromeLabs/squoosh/blob/dev/codecs/avif/enc/README.md
                        cqLevel: 0
                    }
                }
            }
        })
    }
}
```

### 使用sharp进行压缩

安装`sharp`
```bash
npm i -D sharp
```

有损压缩,推荐使用默认配置
```javascript title="webpack.common.js"
// ... 省略
const ImageMinimizerWebpackPlugin = require("image-minimizer-webpack-plugin");
module.exports = {
    // ... 省略
    optimization: {
        // ... 省略
        minimizer: [
            // ... 省略
            new ImageMinimizerWebpackPlugin({
                minimizer: {
                    implementation: ImageMinimizerWebpackPlugin.sharpMinify,
                }
            })
        ]
    }
}
```

关于配置项,具体查看`sharp`的[文档](https://sharp.pixelplumbing.com/api-output#jpeg)

无损压缩,建议使用如下配置项
```javascript title="webpack.common.js"
// ... 省略
const ImageMinimizerWebpackPlugin = require("image-minimizer-webpack-plugin");
module.exports = {
    // ... 省略
    optimization: {
        // ... 省略
        minimizer: [
            // ... 省略
            new ImageMinimizerWebpackPlugin({
                minimizer: {
                    implementation: ImageMinimizerWebpackPlugin.sharpMinify,
                    options: {
                        encodeOptions: {
                            jpeg: {
                                quantity: 100
                            },
                            webp: {
                                lossless: true
                            },
                            avif: {
                                lossless: true
                            },
                            // png的quality默认值为100,即无损
                            png: {},
                            // gif不支持无损压缩
                            gif: {}
                        }
                    }
                }
            })
        ]
    }
}
```

### 单独使用loader(不推荐)
```javascript title="webpack.common.js"
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  module: {
    rules: [
      // You need this, if you are using `import file from "file.ext"`, for `new URL(...)` syntax you don't need it
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
      // We recommend using only for the "production" mode
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            enforce: "pre",
            options: {
              minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                  plugins: [
                    "imagemin-gifsicle",
                    "imagemin-mozjpeg",
                    "imagemin-pngquant",
                    "imagemin-svgo",
                  ],
                },
              },
            },
          },
        ],
      },
    ],
  },
};
```

### 单独使用plugin(不推荐)
```javascript title="webpack.common.js"
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
    module: {
        rules: [
          // You need this, if you are using `import file from "file.ext"`, for `new URL    (...)` syntax you don't need it
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset",
            },
        ],
    },
    optimization: {
        minimizer: [
        // Extend default minimizer, i.e. `terser-webpack-plugin` for JS
            "...",
             // We recommend using only for the "production" mode
            new ImageMinimizerPlugin({
                minimizer: {
                  implementation: ImageMinimizerPlugin.imageminMinify,
                  options: {
                        plugins: [
                            "imagemin-gifsicle",
                            "imagemin-mozjpeg",
                            "imagemin-pngquant",
                            "imagemin-svgo",
                        ],
                    },
                },
                // Disable `loader`
                loader: false,
            }),
        ],
    },
};
```