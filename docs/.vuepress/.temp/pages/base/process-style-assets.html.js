import comp from "D:/code/front-end/node/webpack_note/docs/.vuepress/.temp/pages/base/process-style-assets.html.vue"
const data = JSON.parse("{\"path\":\"/base/process-style-assets.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"介绍\",\"slug\":\"介绍\",\"link\":\"#介绍\",\"children\":[]},{\"level\":3,\"title\":\"处理CSS资源\",\"slug\":\"处理css资源\",\"link\":\"#处理css资源\",\"children\":[]},{\"level\":3,\"title\":\"处理Less资源\",\"slug\":\"处理less资源\",\"link\":\"#处理less资源\",\"children\":[]},{\"level\":3,\"title\":\"处理Sass和Scss资源\",\"slug\":\"处理sass和scss资源\",\"link\":\"#处理sass和scss资源\",\"children\":[]},{\"level\":3,\"title\":\"处理stylus资源\",\"slug\":\"处理stylus资源\",\"link\":\"#处理stylus资源\",\"children\":[]}],\"git\":{\"updatedTime\":1722272246000,\"contributors\":[{\"name\":\"wzw\",\"email\":\"Wang.zhiwn@outlook.com\",\"commits\":1}]},\"filePathRelative\":\"base/process-style-assets.md\"}")
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
