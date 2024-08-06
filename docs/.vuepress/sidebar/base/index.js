export default {
    "/": [
        {
            text: "基础配置",
            prefix: "/base/",
            children: [
                {
                    text: "基本使用",
                    link: "base-use.md",
                    collapsible: true,
                },
                {
                    text: "基本配置",
                    link: "base-config.md",
                    collapsible: true,
                },
                {
                    text: "开发模式",
                    link: "dev-mode.md",
                    collapsible: true,
                },
                {
                    text: "处理样式资源",
                    link: "process-style-assets.md",
                    collapsible: true,
                },
                {
                    text: "处理图片资源",
                    link: "process-image-source.md",
                    collapsible: true
                },
                {
                    text: "修改输出资源的名称和路径",
                    link: "change-output",
                    collapsible: true
                },
                {
                    text: "自动清空上次打包资源",
                    link: "auto-clean",
                    collapsible: true
                },
                {
                    text: "处理字体图标资源",
                    link: "process-font-source",
                    collapsible: true
                },
                {
                    text: "处理其他资源",
                    link: "process-other-source",
                    collapsible: true
                },
                {
                    text: "处理js资源",
                    link: "process-js-source",
                    collapsible: true
                }
            ],
        }
    ]
}