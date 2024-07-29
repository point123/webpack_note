<h1>基本使用</h1>

`Webpack`是一个静态资源打包工具。

它会以一个或多个文件作为打包的入口,将整个项目所有文件组合成一个或者多个文件输出。

`Webpack`输出的文件称为 `bundle`

### 功能介绍

`Webpack`本身功能是有限的:

* 开发模式: 仅能编译JS中的 `ES Module`语法
* 生产模式: 能编辑JS中的 `ES Module`语法, 还能压缩JS代码

### 开始使用

#### 1.资源目录

```
webpack_code # 项目根目录(所有指令在整个目录运行)
├── src # 项目源码目录
├── js # js文件目录
├   ├── count.js
├   └── sum.js
└── main.js # 项目主文件
```

#### 2.创建文件
:::: code-group
::: code-group-item count.js
```javascript title="count.js"
export default function count(x, y) {
  return x - y;
}


```
:::
::: code-group-item sum.js
```javascript title="sum.js"
export default function sum(...args) {
  return args.reduce((a, b) => a + b, 0);
}


```
:::
::: code-group-item main.js
```javascript title="main.js"
import count from './js/count.js';
import sum from "./js/sum.js";

console.log(count(1, 2));
console.log(sum(1, 2, 3, 4));
```
:::
::::
#### 3.下载依赖
打开终端,来到项目根目录,运行以下命令:
* 初始化`package.json`
```bash
npm init -y
```
此时会生成一个基础的`package.json`文件
::: warning 警告
package.json文件中name字段名称不能为webpack,否则下一步会报错
:::
* 下载依赖
```bash
npm install -D webpack webpack-cli
```
#### 4.启用Webpack
* 开发模式
```bash
npx webpack ./src/main.js --mode=development
```
* 生产模式
```bash
npx webpack ./src/main.js --mode=production
```
`npx webpack`: 用来运行本地安装的`Webpack`的。

`./src/main.js`: 指定`Webpack`从`main.js`文件开始打包,不但会打包`main.js`,还会将其依赖也一并打包。

`--mode=xxx`: 指定模式(环境)。
#### 5.观察输出文件
默认`Webpack`会将文件打包输出到`dist`目录下。
### 小结
`Webpack`本身功能较少,只能处理`js`资源,一旦遇到`css`等其他资源就会报错。

