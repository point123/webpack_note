export const themeData = JSON.parse("{\"navbar\":[{\"text\":\"基础\",\"prefix\":\"/base/\",\"children\":[{\"text\":\"基本使用\",\"link\":\"base-use\"},{\"text\":\"基本配置\",\"link\":\"base-config\"},{\"text\":\"开发模式\",\"link\":\"dev-mode\"},{\"text\":\"处理样式资源\",\"link\":\"process-style-assets\"},{\"text\":\"处理图片资源\",\"link\":\"process-image-source\"},{\"text\":\"修改输出资源的名称和路径\",\"link\":\"change-output\"},{\"text\":\"自动清空上次打包资源\",\"link\":\"auto-clean\"},{\"text\":\"处理字体图标资源\",\"link\":\"process-font-source\"},{\"text\":\"处理其他资源\",\"link\":\"process-other-source\"},{\"text\":\"处理js资源\",\"link\":\"process-js-source\"}]},{\"text\":\"官方网站\",\"link\":\"https://webpack.js.org/\"},{\"text\":\"中文网站\",\"link\":\"https://webpack.docschina.org/\"}],\"sidebar\":{\"/\":[{\"text\":\"基础配置\",\"prefix\":\"/base/\",\"children\":[{\"text\":\"基本使用\",\"link\":\"base-use.md\",\"collapsible\":true},{\"text\":\"基本配置\",\"link\":\"base-config.md\",\"collapsible\":true},{\"text\":\"开发模式\",\"link\":\"dev-mode.md\",\"collapsible\":true},{\"text\":\"处理样式资源\",\"link\":\"process-style-assets.md\",\"collapsible\":true},{\"text\":\"处理图片资源\",\"link\":\"process-image-source.md\",\"collapsible\":true},{\"text\":\"修改输出资源的名称和路径\",\"link\":\"change-output\",\"collapsible\":true},{\"text\":\"自动清空上次打包资源\",\"link\":\"auto-clean\",\"collapsible\":true},{\"text\":\"处理字体图标资源\",\"link\":\"process-font-source\",\"collapsible\":true},{\"text\":\"处理其他资源\",\"link\":\"process-other-source\",\"collapsible\":true},{\"text\":\"处理js资源\",\"link\":\"process-js-source\",\"collapsible\":true}]}]},\"sidebarDepth\":4,\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"logo\":null,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
