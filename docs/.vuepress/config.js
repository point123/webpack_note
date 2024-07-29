// 站点配置
import { webpackBundler } from "@vuepress/bundler-webpack";
import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";

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
    ],
});