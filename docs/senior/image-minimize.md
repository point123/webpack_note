<h1>image minimize</h1>

当项目本地中引入了大量的图片,会使体积增大,影响请求速度

可以对图片进行压缩,减小图片体积

可以使用`image-minimizer-webpack-plugin`插件对图片进行压缩

这个插件支持使用两种工具来压缩图片

* `imagemin`: 默认情况下优化图片,稳定且支持所有类型的图片
* `squoosh`: 实验模式下支持`.jpg`,`.jpeg`,`.png`,`.webp`,`.avif`类型的图片

`imagemin`依赖扩展插件压缩图片
* `imagemin-pngquant`
* `imagemin-optipng`
* `imagemin-jpegtran`
* `imagemin-mozjpeg`
* `imagemin-gifsicle`
* `iamgemin-svgo`
安装插件
```bash
npm i -D image-minimizer-webpack-plugin
```