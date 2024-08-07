import comp from "D:/code/front-end/node/webpack_note/docs/.vuepress/.temp/pages/base/process-js-source.html.vue"
const data = JSON.parse("{\"path\":\"/base/process-js-source.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"Eslint\",\"slug\":\"eslint\",\"link\":\"#eslint\",\"children\":[]},{\"level\":3,\"title\":\"Babel\",\"slug\":\"babel\",\"link\":\"#babel\",\"children\":[]},{\"level\":3,\"title\":\"使用browserslist\",\"slug\":\"使用browserslist\",\"link\":\"#使用browserslist\",\"children\":[]}],\"git\":{\"updatedTime\":1722964860000,\"contributors\":[{\"name\":\"wzw\",\"email\":\"Wang.zhiwn@outlook.com\",\"commits\":1}]},\"filePathRelative\":\"base/process-js-source.md\"}")
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
