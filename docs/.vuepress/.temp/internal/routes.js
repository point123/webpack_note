export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/studySpace/front-end/node/webpack/webpack_note/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"标题"} }],
  ["/base/base-config.html", { loader: () => import(/* webpackChunkName: "base_base-config.html" */"D:/studySpace/front-end/node/webpack/webpack_note/docs/.vuepress/.temp/pages/base/base-config.html.js"), meta: {"title":""} }],
  ["/base/base-use.html", { loader: () => import(/* webpackChunkName: "base_base-use.html" */"D:/studySpace/front-end/node/webpack/webpack_note/docs/.vuepress/.temp/pages/base/base-use.html.js"), meta: {"title":""} }],
  ["/base/dev-mode.html", { loader: () => import(/* webpackChunkName: "base_dev-mode.html" */"D:/studySpace/front-end/node/webpack/webpack_note/docs/.vuepress/.temp/pages/base/dev-mode.html.js"), meta: {"title":""} }],
  ["/base/process-image-source.html", { loader: () => import(/* webpackChunkName: "base_process-image-source.html" */"D:/studySpace/front-end/node/webpack/webpack_note/docs/.vuepress/.temp/pages/base/process-image-source.html.js"), meta: {"title":""} }],
  ["/base/process-style-assets.html", { loader: () => import(/* webpackChunkName: "base_process-style-assets.html" */"D:/studySpace/front-end/node/webpack/webpack_note/docs/.vuepress/.temp/pages/base/process-style-assets.html.js"), meta: {"title":""} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"D:/studySpace/front-end/node/webpack/webpack_note/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
