<template><div><h1>处理字体图标资源</h1>
<h3 id="引入字体图标" tabindex="-1"><a class="header-anchor" href="#引入字体图标"><span>引入字体图标</span></a></h3>
<ul>
<li>引入css和字体文件至项目目录中</li>
<li>如果将css和字体文件放在不同目录中,则需要修改css中引用字体文件的路径</li>
<li>在main.js中导入css</li>
<li>在html中使用 <code v-pre>&lt;span class=&quot;icon icon-xxx&quot;&gt;&lt;/span&gt;</code></li>
</ul>
<h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h3>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="webpack.config.js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"node:path"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 入口</span></span>
<span class="line">    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">"./src/main.js"</span><span class="token punctuation">,</span> <span class="token comment">// 相对路径</span></span>
<span class="line">    <span class="token comment">// 输出</span></span>
<span class="line">    <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 输出路径,所有文件的输出目录</span></span>
<span class="line">        <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">"dist"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 绝对路径</span></span>
<span class="line">        <span class="token comment">// js打包输出文件名</span></span>
<span class="line">        <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">"static/js/bundle.js"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token comment">// 自定清空上次打包的内容,在打包前将path整个目录清空再进行打包</span></span>
<span class="line">        <span class="token literal-property property">clean</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// 插件</span></span>
<span class="line">    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// loader加载器</span></span>
<span class="line">    <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// loader的配置</span></span>
<span class="line">        <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">            <span class="token punctuation">{</span></span>
<span class="line">                <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.css$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span> <span class="token comment">// 匹配.css文件</span></span>
<span class="line">                <span class="token comment">// 执行顺序,从后向前</span></span>
<span class="line">                <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                    <span class="token string">"style-loader"</span><span class="token punctuation">,</span> <span class="token comment">// 将js中的css通过创建style标签添加到html中</span></span>
<span class="line">                    <span class="token string">"css-loader"</span> <span class="token comment">// 将css资源编译为commonjs的模块到js中</span></span>
<span class="line">                <span class="token punctuation">]</span> </span>
<span class="line">            <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token punctuation">{</span></span>
<span class="line">                <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.less$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span></span>
<span class="line">                <span class="token comment">// loader: "", loader只能指定一个loader,而use能使用多个</span></span>
<span class="line">                <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                    <span class="token string">"style-loader"</span><span class="token punctuation">,</span> </span>
<span class="line">                    <span class="token string">"css-loader"</span><span class="token punctuation">,</span> </span>
<span class="line">                    <span class="token string">"less-loader"</span> <span class="token comment">// 将less编译为css文件</span></span>
<span class="line">                <span class="token punctuation">]</span></span>
<span class="line">            <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token punctuation">{</span></span>
<span class="line">                <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.s[ac]ss$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span></span>
<span class="line">                <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                    <span class="token string">"style-loader"</span><span class="token punctuation">,</span> </span>
<span class="line">                    <span class="token string">"css-loader"</span><span class="token punctuation">,</span> </span>
<span class="line">                    <span class="token string">"sass-loader"</span> <span class="token comment">// 将scss编译为css文件</span></span>
<span class="line">                <span class="token punctuation">]</span></span>
<span class="line">            <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token punctuation">{</span></span>
<span class="line">                <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.styl$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span></span>
<span class="line">                <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                    <span class="token string">"style-loader"</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token string">"css-loader"</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token string">"stylus-loader"</span></span>
<span class="line">                <span class="token punctuation">]</span></span>
<span class="line">            <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token punctuation">{</span></span>
<span class="line">                <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(jpe?g|png|gif|avif|svg|webp)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span></span>
<span class="line">                <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"asset"</span><span class="token punctuation">,</span></span>
<span class="line">                <span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token literal-property property">dataUrlCondition</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                        <span class="token comment">// 将小于103kb的资源转换为base64</span></span>
<span class="line">                        <span class="token comment">// 优点: 减少请求数 缺点: 转换为base64后,dataURI大小会大于原始文件</span></span>
<span class="line">                      <span class="token literal-property property">maxSize</span><span class="token operator">:</span> <span class="token number">103</span> <span class="token operator">*</span> <span class="token number">1024</span> <span class="token comment">// 103kb</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">                <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">                <span class="token literal-property property">generator</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token comment">// 图片输出名称, hash:哈希值(:数字 可以截取前几位) ext:扩展名 query:查询参数,如果url包含?xxx</span></span>
<span class="line">                    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">"static/images/[hash][ext][query]"</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line highlighted">            <span class="token punctuation">{</span></span>
<span class="line highlighted">                <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(ttf|woff2?)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span></span>
<span class="line highlighted">                <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"asset/resource"</span><span class="token punctuation">,</span></span>
<span class="line highlighted">                <span class="token literal-property property">generator</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line highlighted">                    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">"static/fonts/[hash][ext][query]"</span></span>
<span class="line highlighted">                <span class="token punctuation">}</span></span>
<span class="line highlighted">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// 模式</span></span>
<span class="line">    <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">"development"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>type: &quot;asset</code> 和 <code v-pre>type: &quot;asset/resource&quot;</code>的区别</p>
<ul>
<li><code v-pre>type: &quot;asset/resource&quot;</code>: 类似<code v-pre>webpack4</code>中的<code v-pre>file-loader</code>,将文件转换为<code v-pre>Webpack</code>能识别的资源,不做其他处理</li>
<li><code v-pre>type: &quot;asset</code>: 类似<code v-pre>webpack4</code>中的<code v-pre>url-loader</code>,将文件转换为<code v-pre>Webpack</code>能识别的资源,同时对小于某个大小的资源处理成data URI形式</li>
</ul>
</div></template>


