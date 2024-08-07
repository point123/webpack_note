<template><div><h1>自动化与开发服务器</h1>
<h3 id="监听文件变化" tabindex="-1"><a class="header-anchor" href="#监听文件变化"><span>监听文件变化</span></a></h3>
<p>监听文件变化,当文件发生改变时,可以自动重新打包编译,不需要重新执行命令</p>
<h4 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h4>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">npx webpack <span class="token parameter variable">--watch</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>或者在配置文件中新增<code v-pre>watch</code>配置</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="webpack.config.js"><pre v-pre class="language-javascript"><code><span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// ...</span></span>
<span class="line highlighted">    <span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line highlighted">    <span class="token comment">// 可选的定制watch配置的选项</span></span>
<span class="line highlighted">    <span class="token literal-property property">watchOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line highlighted">        <span class="token comment">// 当第一个文件发生更改时,在重构前增加延迟时间,这段时间内的所有更改聚合到一次重构</span></span>
<span class="line highlighted">        <span class="token literal-property property">aggregateTimeout</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token comment">// ms</span></span>
<span class="line highlighted">        <span class="token comment">// 忽略监听文件</span></span>
<span class="line highlighted">        <span class="token literal-property property">ignored</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">node_modules</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span></span>
<span class="line highlighted">        <span class="token comment">// ignored: ["**/node_modules", "**/files/**/*.js"],</span></span>
<span class="line highlighted">        <span class="token comment">// 间隔监听时间,每隔1s检测一次变更</span></span>
<span class="line highlighted">        <span class="token literal-property property">poll</span><span class="token operator">:</span> <span class="token number">1000</span> <span class="token comment">// ms</span></span>
<span class="line highlighted">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="开发服务器" tabindex="-1"><a class="header-anchor" href="#开发服务器"><span>开发服务器</span></a></h3>
<h4 id="安装依赖" tabindex="-1"><a class="header-anchor" href="#安装依赖"><span>安装依赖</span></a></h4>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line"><span class="token function">npm</span> i <span class="token parameter variable">-D</span> webpack-dev-server</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件"><span>配置文件</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="webpack.config.js"><pre v-pre class="language-javascript"><code><span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// ...</span></span>
<span class="line">    <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 静态文件目录,默认为public文件夹,服务器能访问该目录中的文件,设置false禁用</span></span>
<span class="line">        <span class="token keyword">static</span><span class="token operator">:</span> <span class="token string">'./dist'</span><span class="token punctuation">,</span> </span>
<span class="line">        <span class="token comment">// 启动后自动打开浏览器,也可以在启动命令中添加--open</span></span>
<span class="line">        <span class="token literal-property property">open</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// 命令行用多个--open 如npx webpack serve --open /page --open /page1</span></span>
<span class="line">        <span class="token comment">// open: ['/page','/page1'] // 打开指定页面</span></span>
<span class="line">        </span>
<span class="line">        <span class="token comment">// open: {</span></span>
<span class="line">        <span class="token comment">//     app: {</span></span>
<span class="line">        <span class="token comment">//         // 命令行中使用 --open-app-name xxx</span></span>
<span class="line">        <span class="token comment">//         // 指定使用哪个浏览器打开</span></span>
<span class="line">        <span class="token comment">//         name: "chrome", // 不同平台的名称不同,windows中名为chrome</span></span>
<span class="line">        <span class="token comment">//         arguments: ['--incognito', '--new-window'] // 打开浏览器的参数</span></span>
<span class="line">        <span class="token comment">//     },</span></span>
<span class="line">        <span class="token comment">//     target: ['/page', 'page1']</span></span>
<span class="line">        <span class="token comment">// }</span></span>
<span class="line">        </span>
<span class="line">        <span class="token comment">// 命令行使用 npx webpack serve --host 0.0.0.0</span></span>
<span class="line">        <span class="token comment">// npx webpack serve --host local-ip 使用本地ipv4地址作为host,如果ipv4不可用,则使用ipv6</span></span>
<span class="line">        <span class="token comment">// 指定使用的host</span></span>
<span class="line">        <span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">"0.0.0.0"</span><span class="token punctuation">,</span> <span class="token comment">// 让服务器可以被外部访问: 0.0.0.0</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// 命令行使用 npx webpack serve --port 8080</span></span>
<span class="line">        <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">8080</span><span class="token punctuation">,</span> <span class="token comment">// 指定监听请求的端口,自动使用可以填写auto</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// 配置代理</span></span>
<span class="line">        <span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token comment">// 对/api/user的请求会代理到http://localhost:3000/api/user</span></span>
<span class="line">            <span class="token string-property property">'/api'</span><span class="token operator">:</span> <span class="token string">'http://localhost:3000'</span></span>
<span class="line">            <span class="token comment">// 配置多个代理并重写路径</span></span>
<span class="line">            <span class="token comment">// 对/dev/user的请求会代理到http://localhost:3001/user</span></span>
<span class="line">            <span class="token string-property property">'/dev'</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'http://localhost:3001'</span><span class="token punctuation">,</span></span>
<span class="line">                <span class="token literal-property property">pathRewrite</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token string-property property">'^/dev'</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 不传递/dev</span></span>
<span class="line">                <span class="token literal-property property">secure</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 如果https没有证书,则需要设置为false</span></span>
<span class="line">                <span class="token comment">// 自定义代理内容</span></span>
<span class="line">                <span class="token comment">// 对于浏览器请求提供html,对于api请求,代理它</span></span>
<span class="line">                <span class="token function-variable function">bypass</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> proxyOptions</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token keyword">if</span> <span class="token punctuation">(</span>req<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>accept<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'html'</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Skipping proxy for browser request.'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                        <span class="token keyword">return</span> <span class="token string">'/index.html'</span><span class="token punctuation">;</span> <span class="token comment">// 返回页面</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">                    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// 返回null或undefined,使用代理处理请求</span></span>
<span class="line">                    <span class="token comment">// 返回false,为请求返回404</span></span>
<span class="line">                <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="运行" tabindex="-1"><a class="header-anchor" href="#运行"><span>运行</span></a></h4>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">npx webpacl serve</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>可以在<code v-pre>package.json</code>中添加<code v-pre>scripts</code>配置</p>
<p>使用开发服务器,将不会产生输出,代码在内存中打包编译</p>
</div></template>


