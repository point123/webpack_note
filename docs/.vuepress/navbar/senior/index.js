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
                    },
                    {
                        text: "cache",
                        link: "cache"
                    },
                    {
                        text: "thread",
                        link: "thread"
                    }
                ]
            },
            {
                text: "减少代码体积",
                children: [
                    {
                        text: "tree-shaking",
                        link: "tree-shaking"
                    },
                    {
                        text: "babel",
                        link: "babel"
                    },
                    {
                        text: "image minimize",
                        link: "image-minimize"
                    }
                ]
            },
            {
                text: "优化运行性能",
                children: [
                    {
                        text: "code-split",
                        link: "code-split"
                    },
                    {
                        text: "Preload/Prefetch",
                        link: "preload-prefetch"
                    },
                    {
                        text: "network cache",
                        link: "network-cache"
                    },
                    {
                        text: "core-js",
                        link: "core-js"
                    },
                    {
                        text: "PWA",
                        link: "pwa"
                    }
                ]
            }
        ],
    }
]