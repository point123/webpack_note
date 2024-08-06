import comp from "D:/studySpace/front-end/node/webpack/webpack_note/docs/.vuepress/.temp/pages/base/process-js-source.html.vue"
const data = JSON.parse("{\"path\":\"/base/process-js-source.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"Eslint\",\"slug\":\"eslint\",\"link\":\"#eslint\",\"children\":[]},{\"level\":3,\"title\":\"Babel\",\"slug\":\"babel\",\"link\":\"#babel\",\"children\":[]}],\"git\":{\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"base/process-js-source.md\"}")
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
