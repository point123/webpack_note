import comp from "D:/code/front-end/node/webpack_note/docs/.vuepress/.temp/pages/base/base-use.html.vue"
const data = JSON.parse("{\"path\":\"/base/base-use.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"功能介绍\",\"slug\":\"功能介绍\",\"link\":\"#功能介绍\",\"children\":[]},{\"level\":3,\"title\":\"开始使用\",\"slug\":\"开始使用\",\"link\":\"#开始使用\",\"children\":[]},{\"level\":3,\"title\":\"小结\",\"slug\":\"小结\",\"link\":\"#小结\",\"children\":[]}],\"git\":{\"updatedTime\":1722272246000,\"contributors\":[{\"name\":\"wzw\",\"email\":\"Wang.zhiwn@outlook.com\",\"commits\":1}]},\"filePathRelative\":\"base/base-use.md\"}")
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
