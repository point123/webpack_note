<h1>构建多页应用</h1>

在不使用`vue`,`react`等库或框架的情况下,仅使用`html`构建多页应用

### 项目结构
```
webpack_mpa
├─ 📁public
│  ├─ 📁pages
│  │  └─ 📄pageTwo.html
│  └─ 📄index.html
├─ 📁src
│  ├─ 📁js
│  │  ├─ 📁index
│  │  │  └─ 📄index.js
│  │  └─ 📁pageTwo
│  │     └─ 📄index.js
│  └─ 📁styles
│     ├─ 📁common
│     │  └─ 📄common.css
│     ├─ 📁index
│     │  └─ 📄index.less
│     └─ 📁pageTwo
│        └─ 📄pageTwo.less
├─ 📄.gitignore
├─ 📄package-lock.json
├─ 📄package.json
└─ 📄webpack.config.js
```

在示例项目中,将页面模板放在`public`目录下,其他页面模板则放在`public/pages`目录下

`src`目录中,存放`js`和`css`等资源

其中,首页入口文件`index.js`在`src/js/index`目录中,其他页面入口文件在相应的目录中

样式文件在`src/styles`中,`common`中存放公共样式,其他页面的样式放在对应页面的目录中

### 业务代码
* `public/index.html`
```html title="public/index.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div class="wrapper">
        <div class="navbar">
            <span>This is NavBar</span>
        </div>
        <div class="main">
            <div class="sidebar">
                <ul>
                    <li class="active"><a>Page One</a></li>
                    <li><a href="./pageTwo.html">Page Two</a></li>
                    <li><a>Page Three</a></li>
                </ul>
            </div>
            <div class="content">
                <div class="article">
                    This is Page ONE
                </div>
            </div>
        </div>
        <div class="footer">
            <span>This is Footer</span>
        </div>
    </div>
</body>
</html>
```
* `public/pages/pageTwo.html`
```html title="public/pages/pageTwo.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div class="wrapper">
        <div class="navbar">
            <span>This is NavBar</span>
        </div>
        <div class="main">
            <div class="sidebar">
                <ul>
                    <li><a href="./index.html">Page One</a></li>
                    <li class="active"><a>Page Two</a></li>
                    <li><a>Page Three</a></li>
                </ul>
            </div>
            <div class="content">
                <div class="article">
                    This is Page TWO
                </div>
            </div>
        </div>
        <div class="footer">
            <span>This is Footer</span>
        </div>
    </div>
</body>
</html>
```
* `src/js/index/index.js`

在以上两个`html`中通过`a`标签相互跳转时,路径不要按照`public`中的位置来写

最终生成的运行时页面通过`webpack`配置中的`html-webpack-plugin`生成

通过它们直接生成的页面路径关系来写

```javascript title="src/js/index/index.js"
import "@/styles/common/common.css";
import "@/styles/index/index.less";

const article = document.querySelector(".article");

article.addEventListener("click", () => {
    console.log("page one click!");
})
```
* `src/js/pageTwo/index.js`
```javascript title="src/js/pageTwo/index.js"
import "@/styles/common/common.css";
import "@/styles/pageTwo/pageTwo.less";

const article = document.querySelector(".article");

article.addEventListener("click", () => {
    console.log("page two click!");
})
```
* `src/styles/common/common.css`

相应的页面入口引入相应的页面样式

```css title="src/styles/common/common.css"
* {
    margin: 0;
    padding: 0;
}

html, body {
    height: 100%;
}


```
* `src/styles/index/index.less`
```less title="src/styles/index/index.less"
.wrapper {
    height: 100%;
    color: #fff;
    .navbar {
        height: 100px;
        background-color: #000000;
        text-align: center;
        line-height: 100px;
        a {
            font-size: 52px;
            text-decoration: none;
            outline: none;
            color: #fff;
        }
    }
    .main {
        height: calc(100% - 150px);
        display: flex;
        .sidebar {
            width: 200px;
            background-color: #2E2E2E;
            ul,li {
                list-style: none;
                color: #fff;
            }
            li {
                padding: 20px 0;
                padding-left: 50px;
                cursor: pointer;
                a {
                    text-decoration: none;
                    outline: none;
                    color: #fff;
                    font-size: 22px;
                    &:active {
                        color: #fff;
                    }
                }
                &.active {
                    background-color: #723680;
                }
            }
        }
        .content {
            flex: 1;
            display: flex;
            height: 100%;
            justify-content: center;
            align-items: center;
            background-color: #290038;
            .article {
                font-size: 100px;
            }
        }
    }
    .footer {
        height: 50px;
        background-color: #000000;
        line-height: 50px;
        text-align: center;
        span {
            font-size: 32px;
        };
    }
}
```
* `src/styles/pageTwo/pageTwo.less`
```less title="src/styles/pageTwo/pageTwo.less"
.wrapper {
    height: 100%;
    color: #fff;
    .navbar {
        height: 100px;
        background-color: #000000;
        text-align: center;
        line-height: 100px;
        span {
            font-size: 52px;
        }
    }
    .main {
        height: calc(100% - 150px);
        display: flex;
        .sidebar {
            width: 200px;
            background-color: #2E2E2E;
            ul,li {
                list-style: none;
                color: #fff;
            }
            li {
                padding: 20px 0;
                padding-left: 50px;
                cursor: pointer;
                a {
                    font-size: 22px;
                    text-decoration: none;
                    outline: none;
                    color: #fff;
                    &:active {
                        color: #fff;
                    }
                }
                &.active {
                    background-color: #723680;
                }
            }
        }
        .content {
            flex: 1;
            display: flex;
            height: 100%;
            justify-content: center;
            align-items: center;
            background-color: #290038;
            .article {
                font-size: 100px;
            }
        }
    }
    .footer {
        height: 50px;
        background-color: #000000;
        line-height: 50px;
        text-align: center;
        span {
            font-size: 32px;
        };
    }
}
```