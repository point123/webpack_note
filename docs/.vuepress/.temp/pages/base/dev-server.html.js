import comp from "D:/code/front-end/node/webpack_note/docs/.vuepress/.temp/pages/base/dev-server.html.vue"
const data = JSON.parse("{\"path\":\"/base/dev-server.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"监听文件变化\",\"slug\":\"监听文件变化\",\"link\":\"#监听文件变化\",\"children\":[]},{\"level\":3,\"title\":\"开发服务器\",\"slug\":\"开发服务器\",\"link\":\"#开发服务器\",\"children\":[]}],\"git\":{\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"base/dev-server.md\"}")
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
