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
                        }
                    ]
                }
            ]
        }
    ]
}