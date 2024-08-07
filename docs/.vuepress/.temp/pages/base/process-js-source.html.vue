<template><div><h1>处理js资源</h1>
<p><code v-pre>Webpack</code>对js的处理是有限的,只能编译<code v-pre>js</code>中的<code v-pre>ES模块化</code>语法,不能编译其他语法,可能导致js无法在旧的浏览器中运行,需要进行兼容性处理</p>
<p>其次, 团队开发需要代码规范</p>
<ul>
<li>针对js兼容性处理,可以使用<code v-pre>babel</code>完成</li>
<li>针对代码格式,可以使用Eslint完成</li>
</ul>
<h3 id="eslint" tabindex="-1"><a class="header-anchor" href="#eslint"><span>Eslint</span></a></h3>
<p>可组装的<code v-pre>javascript</code>和<code v-pre>jsx</code>检测工具
可以用来检测js和jsx的语法,可以配置各项功能</p>
<h4 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件"><span>配置文件</span></a></h4>
<p>配置文件有多种写法:</p>
<ul>
<li>可以单独创建一个eslint配置文件</li>
<li>可以在<code v-pre>package.json</code>中的<code v-pre>eslintConfig</code>属性中配置
<code v-pre>Eslint</code>会自动查找和自动读取它们</li>
</ul>
<h4 id="配置-旧版配置" tabindex="-1"><a class="header-anchor" href="#配置-旧版配置"><span>配置(旧版配置)</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="eslint.config.js"><pre v-pre class="language-javascript"><code><span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 解析选项</span></span>
<span class="line">    <span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">ecmaVersion</span><span class="token operator">:</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token comment">// ES语法版本</span></span>
<span class="line">        <span class="token literal-property property">sourceType</span><span class="token operator">:</span> <span class="token string">"module"</span><span class="token punctuation">,</span> <span class="token comment">// ES模块化</span></span>
<span class="line">        <span class="token literal-property property">ecmaFeatures</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// ES 其他特性</span></span>
<span class="line">            <span class="token literal-property property">jsx</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 如果使用react项目,需要开启jsx语法</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// 检测规则</span></span>
<span class="line">    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// 继承规则</span></span>
<span class="line">    <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="新版扁平化配置" tabindex="-1"><a class="header-anchor" href="#新版扁平化配置"><span>新版扁平化配置</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="eslint.config.js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token keyword">import</span> js <span class="token keyword">from</span> <span class="token string">"@eslint/js"</span><span class="token punctuation">;</span></span>
<span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    js<span class="token punctuation">.</span>config<span class="token punctuation">.</span>recommended<span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 解析选项</span></span>
<span class="line">        <span class="token literal-property property">languageOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token literal-property property">ecmaVersion</span><span class="token operator">:</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token comment">// ES语法版本</span></span>
<span class="line">            <span class="token literal-property property">sourceType</span><span class="token operator">:</span> <span class="token string">"module"</span><span class="token punctuation">,</span> <span class="token comment">// ES模块化</span></span>
<span class="line">            <span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token literal-property property">ecmaFeatures</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// ES 其他特性</span></span>
<span class="line">                    <span class="token literal-property property">jsx</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 如果使用react项目,需要开启jsx语法</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token comment">// 检测规则</span></span>
<span class="line">        <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="新旧版本配置文件区别" tabindex="-1"><a class="header-anchor" href="#新旧版本配置文件区别"><span>新旧版本配置文件区别</span></a></h4>
<ul>
<li>
<p>新版:
新版使用扁平风格配置,导出为一个数组;</p>
<p>使用推荐规则,它需要下载<code v-pre>@eslint/js</code>包并且在配置文件中使用<code v-pre>import js from &quot;@eslint/js&quot;</code>,</p>
<p>并且在配置文件中第一个元素使用<code v-pre>js.config.recommended</code>或者<code v-pre>js.config.all</code></p>
<p><code v-pre>js.config.recommended</code>或<code v-pre>js.config.all</code>包含了eslint:recommended,<s>同时包含了其他配置(gpt的回答)</s>,实际查看源码仅仅导出了rules</p>
<p><s>也就是说,数组中可以仅包含<code v-pre>js.config.recommended</code>或<code v-pre>js.config.all</code>即可直接使用</s></p>
<p>同时,使用新的推荐配置,废弃了<code v-pre>extends</code>选项, 想要覆盖推荐配置,在数组的第二个元素中使用一个对象,并在该对象中写入覆盖规则</p>
<p>许多规则的名称和位置也发生了改变</p>
</li>
<li>
<p>旧版:
旧版通常导出为一个对象,使用<code v-pre>eslint:recommended</code>作为属性<code v-pre>extends</code>的值</p>
</li>
</ul>
<h5 id="rules规则" tabindex="-1"><a class="header-anchor" href="#rules规则"><span>rules规则</span></a></h5>
<ul>
<li><code v-pre>off</code>或<code v-pre>0</code> - 关闭规则</li>
<li><code v-pre>warn</code>或<code v-pre>1</code> - 开启规则,使用警告级别的错误: <code v-pre>warn</code>,不会导致程序退出</li>
<li><code v-pre>error</code>或<code v-pre>2</code> - 开启规则,使用错误级别的错误: <code v-pre>error</code>,会导致程序退出</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="eslint.config.js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">semi</span><span class="token operator">:</span> <span class="token string">"error"</span><span class="token punctuation">,</span> <span class="token comment">// 必须使用分号</span></span>
<span class="line">    <span class="token string-property property">"array-callback-return"</span><span class="token operator">:</span> <span class="token string">"warn"</span><span class="token punctuation">,</span> <span class="token comment">// 数组方法的回调函数中必须有return语句</span></span>
<span class="line">    <span class="token string-property property">"default-case"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token string">"warn"</span><span class="token punctuation">,</span> <span class="token comment">// 要求switch语句中有default分支,否则警告</span></span>
<span class="line">        <span class="token punctuation">{</span> <span class="token literal-property property">commentPattern</span><span class="token operator">:</span> <span class="token string">"^no default$"</span> <span class="token punctuation">}</span> <span class="token comment">// 允许在最后注释no default,这样就不会产生警告</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">eqeqeq</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token string">'warn'</span><span class="token punctuation">,</span> <span class="token comment">// 要求使用===和!==,否则警告</span></span>
<span class="line">        <span class="token string">'smart'</span> <span class="token comment">// 在特点情况下不会警告</span></span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="extends继承" tabindex="-1"><a class="header-anchor" href="#extends继承"><span>extends继承</span></a></h5>
<p>一条条写<code v-pre>rules</code>太繁琐,所以可以继承现有规则</p>
<ul>
<li><a href="https://eslint.org/docs/latest/rules/" target="_blank" rel="noopener noreferrer">Eslint官方推荐规则</a>: <code v-pre>Eslint:recommended</code>(旧版) <code v-pre>js.configs.recommended</code>(新版)</li>
<li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-eslint" target="_blank" rel="noopener noreferrer">Vue-cli官方规则</a>: <code v-pre>plugin:vue/essential</code></li>
<li><a href="https://github.com/facebook/create-react-app/tree/main/packages/eslint-config-react-app" target="_blank" rel="noopener noreferrer">React Cli官方规则</a>: <code v-pre>react-app</code></li>
</ul>
<p><code v-pre>react</code>中可以这么写配置</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="eslint.config.js"><pre v-pre class="language-javascript"><code><span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"react-app"</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 覆盖react规则</span></span>
<span class="line">        <span class="token literal-property property">eqeqeq</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"warn"</span><span class="token punctuation">,</span> <span class="token string">"smart"</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="在webpack中使用新版eslint-扁平化" tabindex="-1"><a class="header-anchor" href="#在webpack中使用新版eslint-扁平化"><span>在Webpack中使用新版Eslint(扁平化)</span></a></h4>
<ol>
<li>安装依赖</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line"><span class="token function">npm</span> i <span class="token parameter variable">-D</span> eslint eslint-webpack-plugin @eslint/js globals @eslint/compat</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li><code v-pre>eslint</code>: <code v-pre>eslint</code>核心,必须安装</li>
<li><code v-pre>@eslint/js</code>: 包含了<code v-pre>eslint</code>推荐规则和全部规则,推荐安装</li>
<li><code v-pre>globals</code>: 替代旧版的<code v-pre>env</code>,包含<code v-pre>globals.node</code>和<code v-pre>globals.browser</code>等,推荐安装</li>
<li><code v-pre>@eslint/compat</code>: <code v-pre>compat</code>中的<code v-pre>includeIgnoreFile</code>函数可以使用<code v-pre>.gitignore</code>文件来忽略检查文件,选择性安装</li>
<li><code v-pre>eslint-webpack-plugin</code>: <code v-pre>webpack</code>调用<code v-pre>eslint</code>插件,必须安装</li>
</ul>
<ol start="2">
<li>创建并配置eslint文件</li>
</ol>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="eslint.config.js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token comment">// eslint预设,包含recommended和all,recommended中包含了eslint:recommended,该包需要单独下载</span></span>
<span class="line"><span class="token keyword">const</span> js <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'@eslint/js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> </span>
<span class="line"><span class="token comment">// globals取代了env配置,不使用globals.node,会导致配置文件中由于commonjs而引发eslint警告,该包需要单独下载</span></span>
<span class="line"><span class="token keyword">const</span> globals <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"globals"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// compat中的includeIgnoreFile将.gitignore中的文件忽略校验,需要单独安装</span></span>
<span class="line"><span class="token keyword">const</span> compat <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"@eslint/compat"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> </span>
<span class="line"><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"node:path"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    js<span class="token punctuation">.</span>configs<span class="token punctuation">.</span>recommended<span class="token punctuation">,</span></span>
<span class="line">    compat<span class="token punctuation">.</span><span class="token function">includeIgnoreFile</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">".gitignore"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">languageOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token literal-property property">ecmaVersion</span><span class="token operator">:</span> <span class="token string">"latest"</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">sourceType</span><span class="token operator">:</span> <span class="token string">"module"</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">globals</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token operator">...</span>globals<span class="token punctuation">.</span>node<span class="token punctuation">,</span></span>
<span class="line">                <span class="token operator">...</span>globals<span class="token punctuation">.</span>browser</span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>配置webpack文件</li>
</ol>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="webpack.config.js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"node:path"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> EslintWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"eslint-webpack-plugin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
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
<span class="line">    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line highlighted">        <span class="token keyword">new</span> <span class="token class-name">EslintWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line highlighted">            <span class="token comment">// 默认值为eslintrc,需要修改为flat扁平化配置,否则会报错无法找到配置文件</span></span>
<span class="line highlighted">            <span class="token literal-property property">configType</span><span class="token operator">:</span> <span class="token string">"flat"</span><span class="token punctuation">,</span> </span>
<span class="line highlighted">            <span class="token comment">// 只检查src目录</span></span>
<span class="line highlighted">            <span class="token literal-property property">context</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">"src"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> </span>
<span class="line highlighted">        <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// loader加载器</span></span>
<span class="line">    <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// loader的配置</span></span>
<span class="line">        <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">            <span class="token comment">/// ... 省略</span></span>
<span class="line">        <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// 模式</span></span>
<span class="line">    <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">"development"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="在webpack中使用旧版eslint" tabindex="-1"><a class="header-anchor" href="#在webpack中使用旧版eslint"><span>在Webpack中使用旧版Eslint</span></a></h4>
<ol>
<li>安装依赖</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line"><span class="token function">npm</span> i <span class="token parameter variable">-D</span> eslint eslint-webpack-plugin</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ol start="2">
<li>创建并配置eslint文件</li>
</ol>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="eslint.config.js"><pre v-pre class="language-javascript"><code><span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 继承 Eslint 规则</span></span>
<span class="line">    <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"eslint:recommended"</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">env</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">node</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 启用node中全局变量</span></span>
<span class="line">      <span class="token literal-property property">browser</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 启用浏览器中全局变量</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">ecmaVersion</span><span class="token operator">:</span> <span class="token number">6</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">sourceType</span><span class="token operator">:</span> <span class="token string">"module"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token string-property property">"no-var"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">// 不能使用 var 定义变量</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>配置webpack文件</li>
</ol>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="webpack.config.js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"node:path"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> EslintWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"eslint-webpack-plugin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
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
<span class="line">    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line highlighted">        <span class="token keyword">new</span> <span class="token class-name">EslintWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line highlighted">            <span class="token comment">// 只检查src目录</span></span>
<span class="line highlighted">            <span class="token literal-property property">context</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">"src"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> </span>
<span class="line highlighted">        <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// loader加载器</span></span>
<span class="line">    <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// loader的配置</span></span>
<span class="line">        <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">            <span class="token comment">/// ... 省略</span></span>
<span class="line">        <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// 模式</span></span>
<span class="line">    <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">"development"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="vscode中的eslint插件" tabindex="-1"><a class="header-anchor" href="#vscode中的eslint插件"><span>vscode中的eslint插件</span></a></h4>
<p><code v-pre>vscode</code>扩展中安装<code v-pre>eslint</code>扩展,它能读取项目中的<code v-pre>eslint</code>配置文件,并且能实时的校验代码</p>
<h3 id="babel" tabindex="-1"><a class="header-anchor" href="#babel"><span>Babel</span></a></h3>
<p>用于将<code v-pre>ES2015</code>+的语法转换为向下兼容的语法,以便在多数浏览器重能够运行</p>
<h4 id="配置文件-1" tabindex="-1"><a class="header-anchor" href="#配置文件-1"><span>配置文件</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="babel.config.js"><pre v-pre class="language-javascript"><code><span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">presets</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"@babel/preset-env"</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="在webpack中使用" tabindex="-1"><a class="header-anchor" href="#在webpack中使用"><span>在Webpack中使用</span></a></h4>
<ol>
<li>安装依赖</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line"><span class="token function">npm</span> i <span class="token parameter variable">-D</span> babel-loader @babel/core @babel/preset-env</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li><code v-pre>@babel/core</code>: <code v-pre>babel</code>的核心库</li>
<li><code v-pre>@babel/preset-env</code>: <code v-pre>babel</code>的官方预设</li>
<li><code v-pre>@babel-loader</code>: <code v-pre>Webpack</code>中使用<code v-pre>babel</code>所依赖的<code v-pre>loader</code></li>
</ul>
<ol start="2">
<li>配置webpack文件</li>
</ol>
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
<span class="line">    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token comment">// 省略</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
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
<span class="line">                        <span class="token comment">// 优点: 减少请求数 缺点: 转换为base64URI大小会大于原始文件</span></span>
<span class="line">                      <span class="token literal-property property">maxSize</span><span class="token operator">:</span> <span class="token number">103</span> <span class="token operator">*</span> <span class="token number">1024</span> <span class="token comment">// 103kb</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">                <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">                <span class="token literal-property property">generator</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token comment">// 图片输出名称, hash:哈希值(:数字 可以截取前几位) ext:扩展名 query:查询参数,如果url包含?xxx</span></span>
<span class="line">                    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">"static/images/[hash][ext][query]"</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token comment">/* 单独处理字体文件,输出到指定文件夹 */</span></span>
<span class="line">            <span class="token punctuation">{</span></span>
<span class="line">                <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(ttf|woff2?)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span></span>
<span class="line">                <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"asset/resource"</span><span class="token punctuation">,</span></span>
<span class="line">                <span class="token literal-property property">generator</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">"static/fonts/[hash][ext][query]"</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token comment">/* 其他资源全部输出到assets目录中 */</span></span>
<span class="line">            <span class="token punctuation">{</span></span>
<span class="line">                <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(mp4|avi|flac)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span></span>
<span class="line">                <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"asset/resource"</span><span class="token punctuation">,</span></span>
<span class="line">                <span class="token literal-property property">generator</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">"static/assets/[hash][ext][query]"</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line highlighted">            <span class="token punctuation">{</span></span>
<span class="line highlighted">                <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span></span>
<span class="line highlighted">                <span class="token literal-property property">exclude</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">node_modules</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token comment">// 排除node_modules中的js文件/</span></span>
<span class="line highlighted">                <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line highlighted">                    <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">"babel-loader"</span><span class="token punctuation">,</span></span>
<span class="line highlighted">                    <span class="token comment">// babel的配置项</span></span>
<span class="line highlighted">                    <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line highlighted">                        <span class="token literal-property property">presets</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"@babel/preset-env"</span><span class="token punctuation">]</span></span>
<span class="line highlighted">                    <span class="token punctuation">}</span></span>
<span class="line highlighted">                <span class="token punctuation">}</span></span>
<span class="line highlighted">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// 模式</span></span>
<span class="line">    <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">"development"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于<code v-pre>babel-loader</code>这一rules,也可以写成,省略外层的use</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="webpack.config.js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">exclude</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">node_modules</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token comment">// 排除node_modules中的js文件/</span></span>
<span class="line">    <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">"babel-loader"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">presets</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"@babel/preset-env"</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时,也可以将配置单独写为babel配置文件,webpack会读取配置文件</p>
<h4 id="使用babel配置文件" tabindex="-1"><a class="header-anchor" href="#使用babel配置文件"><span>使用babel配置文件</span></a></h4>
<CodeGroup>
<CodeGroupItem title="babel.config.js">
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="babel.config.js"><pre v-pre class="language-javascript"><code><span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">presets</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"@babel/preset-env"</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
<CodeGroupItem title="webpack.config.js">
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="webpack.config.js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">exclude</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">node_modules</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token comment">// 排除node_modules中的js文件/</span></span>
<span class="line">    <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">"babel-loader"</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
</CodeGroup>
<h3 id="使用browserslist" tabindex="-1"><a class="header-anchor" href="#使用browserslist"><span>使用browserslist</span></a></h3>
<p>按照上面的配置如果直接运行,可能会发现输出的语法没有变化,为了展示效果,可以设置需要兼容的浏览器版本</p>
<p>可以直接在<code v-pre>package.json</code>中添加<code v-pre>browserslist</code>属性</p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="package.json"><pre v-pre class="language-json"><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"webpack_note"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"1.0.0"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"main"</span><span class="token operator">:</span> <span class="token string">"index.js"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 省略</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"keywords"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"author"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"license"</span><span class="token operator">:</span> <span class="token string">"ISC"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"devDependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 省略</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line highlighted">    <span class="token property">"browserslist"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line highlighted">        <span class="token string">">1%"</span><span class="token punctuation">,</span></span>
<span class="line highlighted">        <span class="token string">"not dead"</span><span class="token punctuation">,</span></span>
<span class="line highlighted">        <span class="token string">"ie>=8"</span></span>
<span class="line highlighted">    <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以创建单独的<code v-pre>browserslist</code>或<code v-pre>.browserslistrc</code>配置文件,webpack会读取配置文件</p>
<div class="language-plaintext line-numbers-mode" data-highlighter="prismjs" data-ext="plaintext" data-title="browserslist"><pre v-pre class="language-plaintext"><code><span class="line">> 1%</span>
<span class="line">not dead</span>
<span class="line">ie >=8</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


