import comp from "D:/code/front-end/node/webpack_note/docs/.vuepress/.temp/pages/base/process-image-source.html.vue"
const data = JSON.parse("{\"path\":\"/base/process-image-source.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"1.配置\",\"slug\":\"_1-配置\",\"link\":\"#_1-配置\",\"children\":[]},{\"level\":3,\"title\":\"2.使用图片资源\",\"slug\":\"_2-使用图片资源\",\"link\":\"#_2-使用图片资源\",\"children\":[]},{\"level\":3,\"title\":\"3.输出资源\",\"slug\":\"_3-输出资源\",\"link\":\"#_3-输出资源\",\"children\":[]},{\"level\":3,\"title\":\"4.对资源进行优化\",\"slug\":\"_4-对资源进行优化\",\"link\":\"#_4-对资源进行优化\",\"children\":[]}],\"git\":{\"updatedTime\":1722964860000,\"contributors\":[{\"name\":\"wzw\",\"email\":\"Wang.zhiwn@outlook.com\",\"commits\":2}]},\"filePathRelative\":\"base/process-image-source.md\"}")
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
