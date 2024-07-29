import comp from "D:/studySpace/front-end/node/webpack/webpack_note/docs/.vuepress/.temp/pages/base/index.html.vue"
const data = JSON.parse("{\"path\":\"/base/\",\"title\":\"基础配置\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"基本使用\",\"slug\":\"基本使用\",\"link\":\"#基本使用\",\"children\":[{\"level\":3,\"title\":\"功能介绍\",\"slug\":\"功能介绍\",\"link\":\"#功能介绍\",\"children\":[]},{\"level\":3,\"title\":\"开始使用\",\"slug\":\"开始使用\",\"link\":\"#开始使用\",\"children\":[]},{\"level\":3,\"title\":\"小结\",\"slug\":\"小结\",\"link\":\"#小结\",\"children\":[]}]},{\"level\":2,\"title\":\"基本配置\",\"slug\":\"基本配置\",\"link\":\"#基本配置\",\"children\":[{\"level\":3,\"title\":\"5大核心概念\",\"slug\":\"_5大核心概念\",\"link\":\"#_5大核心概念\",\"children\":[]},{\"level\":3,\"title\":\"准备Webpack配置文件\",\"slug\":\"准备webpack配置文件\",\"link\":\"#准备webpack配置文件\",\"children\":[]}]},{\"level\":2,\"title\":\"开发模式介绍\",\"slug\":\"开发模式介绍\",\"link\":\"#开发模式介绍\",\"children\":[]},{\"level\":2,\"title\":\"处理样式资源\",\"slug\":\"处理样式资源\",\"link\":\"#处理样式资源\",\"children\":[{\"level\":3,\"title\":\"介绍\",\"slug\":\"介绍\",\"link\":\"#介绍\",\"children\":[]},{\"level\":3,\"title\":\"处理CSS资源\",\"slug\":\"处理css资源\",\"link\":\"#处理css资源\",\"children\":[]},{\"level\":3,\"title\":\"处理Less资源\",\"slug\":\"处理less资源\",\"link\":\"#处理less资源\",\"children\":[]},{\"level\":3,\"title\":\"处理Sass和Scss资源\",\"slug\":\"处理sass和scss资源\",\"link\":\"#处理sass和scss资源\",\"children\":[]},{\"level\":3,\"title\":\"处理stylus资源\",\"slug\":\"处理stylus资源\",\"link\":\"#处理stylus资源\",\"children\":[]}]}],\"git\":{},\"filePathRelative\":\"base/readme.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
