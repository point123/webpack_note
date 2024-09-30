// 站点配置
import { webpackBundler } from "@vuepress/bundler-webpack";
import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

import { searchPlugin } from "@vuepress/plugin-search";
import sidebar from "./sidebar";
import navbar from "./navbar";

export default defineUserConfig({
    /* 如果使用webpack作为构建工具,还需要安装sass-loader和sass依赖 */
    bundler: webpackBundler(),
    // bundler: viteBundler(),
    theme: defaultTheme({
        navbar: navbar,
        sidebar: sidebar,
        sidebarDepth: 4
    }),

    lang:"zh-CN", // html标签的lang属性
    title: "webpack5", // 左上角站点标题
    description: "webpack5 学习文档", // header中meta标签的描述

    plugins: [
        searchPlugin({
            getExtraFields: page => {
                return page.frontmatter.tags ?? []
            }
        }),
        mdEnhancePlugin({
            sub: true,
            sup: true,
            mark: true,
            include: true,
            demo: true
        })
    ],
});
// @vuepress/bundler-vite@2.0.0-rc.14
// @vuepress/bundler-webpack@2.0.0-rc.14
// sass-loader@14.2.1
// sass@1.77.6

// package-lock.json中锁定了依赖的具体版本号,
// 当执行npm i时,是按照package-lock.json中的版本与package.json中的版本对比
// 如果package-lock.json中的版本符合package.json中的版本,安装的则是package-lock.json中指定的版本
// 如果package-lock.json中的版本不符合package.json中的版本,则按照package.json中的规则安装最新版本,并将package-lock.json中的版本更新为实际安装的版本
// 使用npm install xxx或npm install xxx@x.x.x 时,也会更新依赖并且package-lock.json中的版本也会更新
// 依赖分身