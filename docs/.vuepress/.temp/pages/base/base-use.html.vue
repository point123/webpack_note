<template><div><h1>基本使用</h1>
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
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
<CodeGroupItem title="sum.js">
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="sum.js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> args<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> a <span class="token operator">+</span> b<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
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
</div></template>


