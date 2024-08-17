import base from "./base";
import senior from "./senior";

export default [
    ...base,
    ...senior,
    {
        text: "更多",
        children: [
            {
                text: "webpack官方网站",
                link: "https://webpack.js.org/"
            },
            {
                text: "webpack中文网站",
                link: "https://webpack.docschina.org/"
            },
            {
                text: "webpack配置默认值",
                link: "https://github.com/webpack/webpack/blob/main/lib/config/defaults.js"
            },
            {
                text: "terser文档",
                link: "https://github.com/terser/terser"
            }
        ]
    }

]