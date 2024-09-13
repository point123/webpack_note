<h1>其他配置</h1>

关于`vue`的其他插件配置,能够在[Awesome Vue](https://github.com/vuejs/awesome-vue)中找到

也可以在[Awesome js](https://awesomejs.dev/for/vue/)中搜索与`vue`相关的包

### eslint.config.js
在通过`vue cli`创建的项目中,与`eslint`相关的包主要有
* `@babel/eslint-parser`

    `eslint`默认解析器和核心规则仅支持ES标准,不能支持`babel`提供的实现特性(新语法)和非标准语法(ts,flow)

    这个解析器能运行`eslint`在由`babel`转换的源码上运行

    当`babel`解析器将代码转换为`ast`时,`@babel/eslint-parser`能将`ast`转换为`eslint`能够理解的`estree`

* `@vue/cli-plugin-eslint`

    该插件主要负责两件事

    1. 添加`vue-cli-service lint`命令,能够检查项目代码

    2. 添加`lintOnSave`功能,实现保存时进行`lint`

* `eslint-plugin-vue`

    `vue`的官方规则,能够对`.vue`文件进行检测

#### vue2
```javascript title="eslint.config.js"
const globals = require('globals');
const js = require('@eslint/js');
const eslintPluginVue = require('eslint-plugin-vue');
const babelParser = require("@babel/eslint-parser");

module.exports = [
    ...eslintPluginVue.configs["flat/vue2-recommended"],
    {
      ...js.configs.recommended,
      files: ["src/**/*.{vue,js}"],
      languageOptions: {
          sourceType: "module",
          globals: {
              ...globals.node,
              ...globals.browser
          },
          parserOptions: {
            parser: babelParser
          }
      }
    },
    {
      ignores: ["config/*","eslint.config.js","babel.config.js","postcss.config.js"]
    },
]
```

#### vue3
```javascript{7} title="eslint.config.js"
const globals = require('globals');
const js = require('@eslint/js');
const eslintPluginVue = require('eslint-plugin-vue');
const babelParser = require("@babel/eslint-parser");

module.exports = [
    ...eslintPluginVue.configs["flat/vue3-recommended"],
    {
      ...js.configs.recommended,
      files: ["src/**/*.{vue,js}"],
      languageOptions: {
          sourceType: "module",
          globals: {
              ...globals.node,
              ...globals.browser
          },
          parserOptions: {
            parser: babelParser
          }
      }
    },
    {
      ignores: ["config/*","eslint.config.js","babel.config.js","postcss.config.js"]
    },
]
```
### eslint-plugin-vue
对于`eslint-plugin-vue`的使用,详见[文档](https://eslint.vuejs.ac.cn/user-guide/),[中文文档](https://eslint.vuejs.ac.cn/user-guide/),推荐查看英文文档,里面有最新的`eslint`扁平化配置

`eslint-plugin-vue`的规则内容

:::: code-group
::: code-group-item flat/vue2-recommended.js
```javascript
const config = require('./vue2-strongly-recommended.js')

module.exports = [
  ...config,
  {
    name: 'vue/vue2-recommended/rules',
    rules: {
      'vue/attributes-order': 'warn',
      'vue/component-tags-order': 'warn',
      'vue/no-lone-template': 'warn',
      'vue/no-multiple-slot-args': 'warn',
      'vue/no-v-html': 'warn',
      'vue/order-in-components': 'warn',
      'vue/this-in-template': 'warn'
    }
  }
]
```
:::
::: code-group-item flat/vue2-strongly-recommended.js
```javascript
const config = require('./vue2-essential.js')

module.exports = [
  ...config,
  {
    name: 'vue/vue2-strongly-recommended/rules',
    rules: {
      'vue/attribute-hyphenation': 'warn',
      // ...rules规则
    }
  }
]
```
:::
::: code-group-item flat/vue2-essential.js
```javascript
const config = require('./base.js')

module.exports = [
  ...config,
  {
    name: 'vue/vue2-essential/rules',
    rules: {
      'vue/multi-word-component-names': 'error',
      // ...rules规则
    }
  }
]
```
:::
::: code-group-item base.js
```javascript 
const globals = require('globals')
module.exports = [
  {
    name: 'vue/base/setup',
    plugins: {
      get vue() {
        return require('../../index')
      }
    },
    languageOptions: {
      sourceType: 'module',
      globals: globals.browser
    }
  },
  {
    name: 'vue/base/setup-for-vue',
    files: ['*.vue', '**/*.vue'],
    plugins: {
      get vue() {
        return require('../../index')
      }
    },
    languageOptions: {
      parser: require('vue-eslint-parser'),
      sourceType: 'module',
      globals: globals.browser
    },
    rules: {
      'vue/comment-directive': 'error',
      'vue/jsx-uses-vars': 'error'
    },
    processor: 'vue/vue'
  }
]
```
:::
::::

### babel.config.js
```javascript title="babel.config.js"
module.exports = {
    presets: ["@vue/cli-plugin-babel/preset"]
    // presets: ["@vue/babel-preset-app"]
}
```
`@vue/cli-plugin-babel`是`vue cli`的插件,默认情况下使用`babel7` + `babel-loader` + `@vue/babel-preset-app`,也可以通过`babel.config.js`配置

`@vue/babel-preset-app`是所有`vue cli`创建的项目默认使用的`babel`预设

```javascript title="@vue/cli-plugin-babel/preset.js"
module.exports = require('@vue/babel-preset-app')
```

也就是说,如果安装了`@vue/cli-plugin-babel`,那么`presets`配置为`@vue/cli-plugin-babel/preset`或`@vue/babel-preset-app`都可以,如果安装的是`@vue/babel-preset-app`,那么只能配置为`@vue/babel-preset-app`

### postcss.config.js
```javascript title="postcss.config.js"
module.exports = {
    plugins: ["postcss-preset-env"]
}
```
### package.json
```json title="package.json"
{
  "name": "webpack_vue_cli",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack server --config ./config/webpack.dev.js",
    "build": "cross-env NODE_ENV=production webpack --config ./config/webpack.prod.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "@babel/eslint-parser": "^7.25.1",
    "@vue/cli-plugin-babel": "^5.0.8", // 或者用@vue/babel-preset-app
    "babel-loader": "^9.1.3",
    "copy-webpack-plugin": "^12.0.2",
    "cross-env": "^7.0.3",
    "css-loader": "^7.1.2",
    "css-minimizer-webpack-plugin": "^7.0.0",
    "eslint": "^9.10.0",
    "eslint-plugin-vue": "^9.28.0",
    "eslint-webpack-plugin": "^4.2.0",
    "globals": "^15.9.0",
    "html-webpack-plugin": "^5.6.0",
    "image-minimizer-webpack-plugin": "^4.1.0",
    "imagemin": "^9.0.0",
    "imagemin-gifsicle": "^7.0.0",
    "imagemin-jpegtran": "^7.0.0",
    "imagemin-optipng": "^8.0.0",
    "imagemin-svgo": "^11.0.1",
    "less-loader": "^12.2.0",
    "mini-css-extract-plugin": "^2.9.1",
    "postcss-loader": "^8.1.1",
    "postcss-preset-env": "^10.0.3",
    "sass": "^1.78.0",
    "sass-loader": "^16.0.1",
    "stylus-loader": "^8.1.0",
    "vue-loader": "^15.11.1",
    "vue-style-loader": "^4.1.3",
    "vue-template-compiler": "^2.7.16",
    "webpack": "^5.94.0",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^5.1.0"
  },
  "dependencies": {
    "vue": "^2.7.16",
    "vue-router": "^3.6.5"
  }
}

```
