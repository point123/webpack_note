import base from "./base";
import senior from "./senior";

export default [
    ...base,
    ...senior,
    {
        text: "官方网站",
        link: "https://webpack.js.org/"
    },
    {
        text: "中文网站",
        link: "https://webpack.docschina.org/"
    },
    {
        text: "配置默认值",
        link: "https://github.com/webpack/webpack/blob/main/lib/config/defaults.js"
    }
]