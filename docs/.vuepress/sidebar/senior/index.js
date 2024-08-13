export default {
    "/senior": [
        {
            text: "高级",
            prefix: "/senior/",
            children: [
                {
                    text: "提升开发体验",
                    link: "develop-experience",
                    collapsible: true
                },
                {
                    text: "提升打包构建速度",
                    link: "hmr",
                    collapsible: true,
                    children: [
                        {
                            text: "HotModuleReplacement",
                            link: "hmr",
                            collapsible: true
                        },
                        {
                            text: "OneOf",
                            link: "oneof",
                            collapsible: true
                        },
                        {
                            text: "include/exclude",
                            link: "includeAndExclude",
                            collapsible: true
                        },
                        {
                            text: "cache",
                            link: "cache",
                            collapsible: true
                        },
                        {
                            text: "thread",
                            link: "thread",
                            collapsible: true
                        }
                    ]
                },
                {
                    text: "减少代码体积",
                    link: "tree-shaking",
                    collapsible: true,
                    children: [
                        {
                            text: "tree-shaking",
                            link: "tree-shaking"
                        }
                    ]
                }
            ]
        }
    ]
}