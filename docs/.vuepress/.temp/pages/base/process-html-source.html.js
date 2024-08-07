import comp from "D:/code/front-end/node/webpack_note/docs/.vuepress/.temp/pages/base/process-html-source.html.vue"
const data = JSON.parse("{\"path\":\"/base/process-html-source.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"下载依赖\",\"slug\":\"下载依赖\",\"link\":\"#下载依赖\",\"children\":[]},{\"level\":3,\"title\":\"配置webpack\",\"slug\":\"配置webpack\",\"link\":\"#配置webpack\",\"children\":[]}],\"git\":{\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"base/process-html-source.md\"}")
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
