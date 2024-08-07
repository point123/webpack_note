import comp from "D:/code/front-end/node/webpack_note/docs/.vuepress/.temp/pages/base/base-config.html.vue"
const data = JSON.parse("{\"path\":\"/base/base-config.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"5大核心概念\",\"slug\":\"_5大核心概念\",\"link\":\"#_5大核心概念\",\"children\":[]},{\"level\":3,\"title\":\"准备Webpack配置文件\",\"slug\":\"准备webpack配置文件\",\"link\":\"#准备webpack配置文件\",\"children\":[]},{\"level\":3,\"title\":\"修改配置文件\",\"slug\":\"修改配置文件\",\"link\":\"#修改配置文件\",\"children\":[]},{\"level\":3,\"title\":\"小结\",\"slug\":\"小结\",\"link\":\"#小结\",\"children\":[]}],\"git\":{\"updatedTime\":1722272246000,\"contributors\":[{\"name\":\"wzw\",\"email\":\"Wang.zhiwn@outlook.com\",\"commits\":1}]},\"filePathRelative\":\"base/base-config.md\"}")
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
