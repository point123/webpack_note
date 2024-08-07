import comp from "D:/code/front-end/node/webpack_note/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"标题\",\"lang\":\"zh-CN\",\"frontmatter\":{\"lang\":\"zh-CN\",\"title\":\"标题\",\"description\":\"描述\",\"home\":true,\"heroImage\":\"/icon-webpack.svg\",\"actions\":[{\"text\":\"快速上手\",\"link\":\"/base/base-use\",\"type\":\"primary\"}]},\"headers\":[],\"git\":{\"updatedTime\":1722272246000,\"contributors\":[{\"name\":\"wzw\",\"email\":\"Wang.zhiwn@outlook.com\",\"commits\":1}]},\"filePathRelative\":\"readme.md\"}")
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
