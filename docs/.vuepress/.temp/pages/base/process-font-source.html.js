import comp from "D:/studySpace/front-end/node/webpack/webpack_note/docs/.vuepress/.temp/pages/base/process-font-source.html.vue"
const data = JSON.parse("{\"path\":\"/base/process-font-source.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"引入字体图标\",\"slug\":\"引入字体图标\",\"link\":\"#引入字体图标\",\"children\":[]},{\"level\":3,\"title\":\"配置\",\"slug\":\"配置\",\"link\":\"#配置\",\"children\":[]}],\"git\":{\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"base/process-font-source.md\"}")
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
