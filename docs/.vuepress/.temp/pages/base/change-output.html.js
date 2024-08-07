import comp from "D:/code/front-end/node/webpack_note/docs/.vuepress/.temp/pages/base/change-output.html.vue"
const data = JSON.parse("{\"path\":\"/base/change-output.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"配置\",\"slug\":\"配置\",\"link\":\"#配置\",\"children\":[]}],\"git\":{\"updatedTime\":1722964860000,\"contributors\":[{\"name\":\"wzw\",\"email\":\"Wang.zhiwn@outlook.com\",\"commits\":1}]},\"filePathRelative\":\"base/change-output.md\"}")
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
