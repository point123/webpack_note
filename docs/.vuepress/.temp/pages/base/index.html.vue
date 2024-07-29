<template><div><h1 id="基础配置" tabindex="-1"><a class="header-anchor" href="#基础配置"><span>基础配置</span></a></h1>
<h2 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用"><span>基本使用</span></a></h2>
<p><code v-pre>Webpack</code>是一个静态资源打包工具。</p>
<p>它会以一个或多个文件作为打包的入口,将整个项目所有文件组合成一个或者多个文件输出。</p>
<p><code v-pre>Webpack</code>输出的文件称为 <code v-pre>bundle</code></p>
<h3 id="功能介绍" tabindex="-1"><a class="header-anchor" href="#功能介绍"><span>功能介绍</span></a></h3>
<p><code v-pre>Webpack</code>本身功能是有限的:</p>
<ul>
<li>开发模式: 仅能编译JS中的 <code v-pre>ES Module</code>语法</li>
<li>生产模式: 能编辑JS中的 <code v-pre>ES Module</code>语法, 还能压缩JS代码</li>
</ul>
<h3 id="开始使用" tabindex="-1"><a class="header-anchor" href="#开始使用"><span>开始使用</span></a></h3>
<h4 id="_1-资源目录" tabindex="-1"><a class="header-anchor" href="#_1-资源目录"><span>1.资源目录</span></a></h4>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre class="language-text"><code><span class="line">webpack_code # 项目根目录(所有指令在整个目录运行)</span>
<span class="line">├── src # 项目源码目录</span>
<span class="line">├── js # js文件目录</span>
<span class="line">├   ├── count.js</span>
<span class="line">├   └── sum.js</span>
<span class="line">└── main.js # 项目主文件</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-创建文件" tabindex="-1"><a class="header-anchor" href="#_2-创建文件"><span>2.创建文件</span></a></h4>
<CodeGroup>
<CodeGroupItem title="count.js">
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="count.js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> x <span class="token operator">-</span> y<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
<CodeGroupItem title="sum.js">
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="sum.js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> args<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> a <span class="token operator">+</span> b<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
<CodeGroupItem title="main.js">
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="main.js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token keyword">import</span> count <span class="token keyword">from</span> <span class="token string">'./js/count.js'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> sum <span class="token keyword">from</span> <span class="token string">"./js/sum.js"</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
</CodeGroup>
<h4 id="_3-下载依赖" tabindex="-1"><a class="header-anchor" href="#_3-下载依赖"><span>3.下载依赖</span></a></h4>
<p>打开终端,来到项目根目录,运行以下命令:</p>
<ul>
<li>初始化<code v-pre>package.json</code></li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line"><span class="token function">npm</span> init <span class="token parameter variable">-y</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>此时会生成一个基础的<code v-pre>package.json</code>文件</p>
<div class="custom-container warning"><p class="custom-container-title">警告</p>
<p>package.json文件中name字段名称不能为webpack,否则下一步会报错</p>
</div>
<ul>
<li>下载依赖</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> webpack webpack-cli</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="_4-启用webpack" tabindex="-1"><a class="header-anchor" href="#_4-启用webpack"><span>4.启用Webpack</span></a></h4>
<ul>
<li>开发模式</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">npx webpack ./src/main.js <span class="token parameter variable">--mode</span><span class="token operator">=</span>development</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>生产模式</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">npx webpack ./src/main.js <span class="token parameter variable">--mode</span><span class="token operator">=</span>production</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><code v-pre>npx webpack</code>: 用来运行本地安装的<code v-pre>Webpack</code>的。</p>
<p><code v-pre>./src/main.js</code>: 指定<code v-pre>Webpack</code>从<code v-pre>main.js</code>文件开始打包,不但会打包<code v-pre>main.js</code>,还会将其依赖也一并打包。</p>
<p><code v-pre>--mode=xxx</code>: 指定模式(环境)。</p>
<h4 id="_5-观察输出文件" tabindex="-1"><a class="header-anchor" href="#_5-观察输出文件"><span>5.观察输出文件</span></a></h4>
<p>默认<code v-pre>Webpack</code>会将文件打包输出到<code v-pre>dist</code>目录下。</p>
<h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h3>
<p><code v-pre>Webpack</code>本身功能较少,只能处理<code v-pre>js</code>资源,一旦遇到<code v-pre>css</code>等其他资源就会报错。</p>
<h2 id="基本配置" tabindex="-1"><a class="header-anchor" href="#基本配置"><span>基本配置</span></a></h2>
<p>在使用<code v-pre>Webpack</code>前,需要对<code v-pre>Webpack</code>的配置有一定的认识</p>
<h3 id="_5大核心概念" tabindex="-1"><a class="header-anchor" href="#_5大核心概念"><span>5大核心概念</span></a></h3>
<h4 id="_1-entry-入口" tabindex="-1"><a class="header-anchor" href="#_1-entry-入口"><span>1.entry(入口)</span></a></h4>
<p>指示<code v-pre>Webpack</code>从哪个文件开始打包</p>
<h4 id="_2-output-输出" tabindex="-1"><a class="header-anchor" href="#_2-output-输出"><span>2.output(输出)</span></a></h4>
<p>指示<code v-pre>Webpack</code>打包完的文件输出到哪里,如何命名等</p>
<h4 id="_3-loader-加载器" tabindex="-1"><a class="header-anchor" href="#_3-loader-加载器"><span>3.loader(加载器)</span></a></h4>
<p><code v-pre>Webpack</code>本身只能处理<code v-pre>js</code>,<code v-pre>json</code>等资源,其他资源需要借助<code v-pre>loader</code>,<code v-pre>Webpack</code>才能够解析</p>
<h4 id="_4-plugin-插件" tabindex="-1"><a class="header-anchor" href="#_4-plugin-插件"><span>4.plugin(插件)</span></a></h4>
<p>扩展<code v-pre>Webpack</code>的功能</p>
<h4 id="_5-mode-模式" tabindex="-1"><a class="header-anchor" href="#_5-mode-模式"><span>5.mode(模式)</span></a></h4>
<p>主要有两种模式:</p>
<ul>
<li>开发模式: <code v-pre>development</code></li>
<li>生产模式: <code v-pre>production</code></li>
</ul>
<h3 id="准备webpack配置文件" tabindex="-1"><a class="header-anchor" href="#准备webpack配置文件"><span>准备Webpack配置文件</span></a></h3>
<p>在项目根目录下新建文件:<code v-pre>webpack.config.js</code></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="webpack.config.js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"node:path"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// 入口</span></span>
<span class="line">  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">"./src/main.js"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token comment">// 输出</span></span>
<span class="line">  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 输出路径</span></span>
<span class="line">    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">"dist"</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// 输出名称</span></span>
<span class="line">    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">"main.js"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token comment">// 加载器</span></span>
<span class="line">  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token comment">// 插件</span></span>
<span class="line">  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token comment">// 模式</span></span>
<span class="line">  <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">"devlopment"</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="开发模式介绍" tabindex="-1"><a class="header-anchor" href="#开发模式介绍"><span>开发模式介绍</span></a></h2>
<p>开发模式指开发项目时使用的模式
整个模式下主要做两件事:
1.编译代码,使浏览器能识别运行
开发时有样式资源,字体图标,图片资源,html资源等,webpack默认情况下都不能处理这些资源,所以我们要加载配置来编译这些资源。
2.代码质量检查,树立代码规范
提前检查代码的一些隐患,让代码运行时更加健壮
提前检查代码规范和格式,统一团队编码风格,让代码更优雅美观</p>
<h2 id="处理样式资源" tabindex="-1"><a class="header-anchor" href="#处理样式资源"><span>处理样式资源</span></a></h2>
<p>本章节学习使用Webpack处理css,Less,Sass,Scss,Stylus样式资源</p>
<h3 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍"><span>介绍</span></a></h3>
<p>Webpack本身是不能识别样式资源的,所以需要借助Loader来帮助Webpack解析样式资源</p>
<h3 id="处理css资源" tabindex="-1"><a class="header-anchor" href="#处理css资源"><span>处理CSS资源</span></a></h3>
<h4 id="_1-下载依赖" tabindex="-1"><a class="header-anchor" href="#_1-下载依赖"><span>1.下载依赖</span></a></h4>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> css-loader style-loader</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="_2-功能介绍" tabindex="-1"><a class="header-anchor" href="#_2-功能介绍"><span>2.功能介绍</span></a></h4>
<ul>
<li>css-loader: 负责将css文件编译为Webpack能识别的模块</li>
<li>style-loader: 动态创建一个style标签,标签内为Webpack中css模块内容</li>
</ul>
<h3 id="处理less资源" tabindex="-1"><a class="header-anchor" href="#处理less资源"><span>处理Less资源</span></a></h3>
<h3 id="处理sass和scss资源" tabindex="-1"><a class="header-anchor" href="#处理sass和scss资源"><span>处理Sass和Scss资源</span></a></h3>
<h3 id="处理stylus资源" tabindex="-1"><a class="header-anchor" href="#处理stylus资源"><span>处理stylus资源</span></a></h3>
</div></template>


