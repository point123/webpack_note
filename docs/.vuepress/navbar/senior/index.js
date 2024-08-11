export default [
    {
        text: "高级",
        prefix: "/senior/",
        children: [
            {
                text: "提升开发体验",
                link: "develop-experience"
            },
            {
                text: "提升打包构建速度",
                children: [
                    {
                        text: "HotModuleReplacement",
                        link: "hmr"
                    },
                    {
                        text: "OneOf",
                        link: "oneof"
                    },
                    {
                        text: "include/exclude",
                        link: "includeAndExclude"
                    }
                ]
            }
        ],
    }
]